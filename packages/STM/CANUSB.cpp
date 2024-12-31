#include "ros/ros.h"
#include "std_msgs/String.h"

#include <string>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <thread>
#include <chrono>

#include "CANUSB.hpp"
#include "MainCircuit.hpp"
#include "CANID.hpp"

namespace NITNC
{

using namespace std::this_thread;
using namespace std::chrono;

/**
 * @brief タイマーのコールバック．デフォルトで0.01秒間隔．何回もReadしている．
 * コールバックもここで呼ばれる
 * 
 */
void CANUSB::TimerCallback( const ros::TimerEvent& )
{

    char buff[ 256 ] = { 0 };

    int read_result = read( serial_config_.fd, buff, sizeof( buff ) );

    if( read_result >= 1 )
    // if( true )
    {
        std::string RxDataInString = buff;

        // Rx_data = "t701605F005F0001E";

        ROS_INFO( "%s", RxDataInString.c_str() );

        static uint8_t okcount = 0;
        okcount++;
        ROS_INFO( "count:%d", okcount );

        if( RxDataInString.find( "\a" ) != std::string::npos )
        {
            DiagnosticCounter += 2;
        }
        else
        {
            DiagnosticCounter--;
        }


        while( RxDataInString.find( "t" ) != std::string::npos && RxDataInString.size() >= 5 )
        {
            for( int i = 0; i < RxDataInString.size(); i++ )
            {
                if( RxDataInString[ 0 ] != 't' )
                    RxDataInString.erase( 0, 1 );
                else 
                    break;
            }

            uint16_t CANID = ExtractCANID( RxDataInString );
            std::vector<uint8_t> CANData;
            uint8_t DataLength = ExtractData( RxDataInString, CANData );

            ActivateCallback( CANID, CANData, DataLength );


            RxDataInString.erase( 0, 1 );


        }

    }
    else if( read_result == -1 )
    {
        switch ( errno )
        {
        case EBADF:
        case EINTR:
            CloseSerialStream();
            OpenSerialStream();
            break;
        default:
            break;
        }
    }

    m_p_updater -> update();

}

/**
 * @brief CANの標準フレームで送信する関数
 * 
 * @param DestinationID ID
 * @param DataSize データサイズ（バイト数 )
 * @param Data データ（配列)
 */
void CANUSB::Transmit( CAN1 DestinationID, uint8_t DataSize, uint8_t* pData )
{
    std::string data;

    uint16_t CANID = ( static_cast<uint8_t>( DestinationID ) << 5 );
    CANID |= ( static_cast<uint8_t>( CAN1::MY_ID ) );

    data += static_cast<uint8_t>( AsciiCommands::t );
    data += Dec2HexString( CANID, 3 );
    data += Dec2HexString( DataSize, 1 );

    for( int i = 0; i < DataSize; i++ )
    {
        data += Dec2HexString( pData[ i ], 2 );
    }
    data += static_cast<uint8_t>( AsciiCommands::CR );

    write( serial_config_.fd, data.c_str(), data.size() );
}


/**
 * @brief CANの標準フレームで送信する関数
 * 
 * @param DestinationID ID
 * @param DataSize データサイズ（バイト数 )
 * @param Data データ（配列)
 */
void CANUSB::Transmit( uint8_t DestinationID, uint8_t DataSize, uint8_t* pData )
{
    std::string data;

    uint16_t CANID = ( DestinationID ) << 5;
    CANID |= ( 31 );

    data += static_cast<uint8_t>( AsciiCommands::t );
    data += Dec2HexString( CANID, 3 );
    data += Dec2HexString( DataSize, 1 );

    for( int i = 0; i < DataSize; i++ )
    {
        data += Dec2HexString( pData[ i ], 2 );
    }
    data += static_cast<uint8_t>( AsciiCommands::CR );

    write( serial_config_.fd, data.c_str(), data.size() );
}

/**
 * @brief CANの標準フレームで送信する関数
 * 
 * @param DestinationID ID
 * @param DataSize データサイズ（バイト数 )
 * @param Data データ（配列)
 */
void CANUSB::Transmit( CAN2 DestinationID, uint8_t DataSize, uint8_t* pData )
{
    std::string data;

    uint16_t CANID = ( static_cast<uint8_t>( DestinationID ) << 5 );
    CANID |= ( static_cast<uint8_t>( CAN2::MY_ID ) );

    data += static_cast<uint8_t>( AsciiCommands::t );
    data += Dec2HexString( CANID, 3 );
    data += Dec2HexString( DataSize, 1 );

    for( int i = 0; i < DataSize; i++ )
    {
        data += Dec2HexString( pData[ i ], 2 );
    }
    data += static_cast<uint8_t>( AsciiCommands::CR );

    write( serial_config_.fd, data.c_str(), data.size() );
}


void CANUSB::CANUSBDiagnostic( diagnostic_updater::DiagnosticStatusWrapper& stat )
{
    std::string NodeName = ros::this_node::getName();

    if ( serial_config_.fd == -1 )
    {
        std::string msg = "ROS doesn't recognize" + NodeName;
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::ERROR, msg.c_str() );
    }
    else if ( DiagnosticCounter >= 20 )
    {
        std::string msg = NodeName + " cannot send more than " + std::to_string( DiagnosticCounter ) + " msgs";
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::ERROR, msg.c_str() );
    }
    else 
    {
        std::string msg = "ROS is active on " + NodeName;
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::OK, msg.c_str() );
    }
    

}

/**
 * @brief 初期化．ROSParaｍよむ．CANUSBの設定する．コールバック関数を登録する．
 * 
 * @param nh ノードハンドル
 * @param np プライベートノードハンドル
 */
void CANUSB::Init( ros::NodeHandle& nh, ros::NodeHandle& np, diagnostic_updater::Updater& updater )
{

    uint32_t DefaultACR = static_cast<uint8_t>( CAN1::MY_ID ) << 12;
    uint32_t DefaultAMR = 0b111111110000;

    std::string DefaultACRInString = Dec2HexString( DefaultACR, 8 );
    std::string DefaultAMRInString = Dec2HexString( DefaultAMR, 8 );

    np.param( "baud_rate", serial_config_.baud_rate, B115200 );
    np.param( "DeviceName", serial_config_.DeviceName, ( std::string )"/dev/ttyUSB0" );
    np.param( "PollingRate", serial_config_.PollingRate, 0.001 );
    np.param( "BitRate", can_config_.BitRate, ( std::string )"8" );
    np.param( "ACR", can_config_.ACR, ( std::string )DefaultACRInString );
    np.param( "AMR", can_config_.AMR, ( std::string )DefaultAMRInString );

    timer_ = nh.createTimer( ros::Duration( serial_config_.PollingRate ), &CANUSB::TimerCallback, this );

    m_p_updater = &updater;

    m_p_updater -> setHardwareID( ros::this_node::getName() );
    m_p_updater -> add( ros::this_node::getName(), boost::bind( &CANUSB::CANUSBDiagnostic, this, _1 ) );

    OpenSerialStream();

}

void CANUSB::CloseSerialStream( void )
{
    close( serial_config_.fd );
}

void CANUSB::OpenSerialStream( void )
{
    serial_config_.fd = open( serial_config_.DeviceName.c_str(), O_RDWR | O_NOCTTY | O_NONBLOCK );

    fcntl( serial_config_.fd, F_SETFL, 0 );

    tcgetattr( serial_config_.fd, &serial_config_.conf_tio );
    //set baudrate

    cfsetispeed( &serial_config_.conf_tio, serial_config_.baud_rate );
    cfsetospeed( &serial_config_.conf_tio, serial_config_.baud_rate );
    //non canonical, non echo back
    serial_config_.conf_tio.c_lflag &= ~( ECHO | ICANON );
    //non blocking
    serial_config_.conf_tio.c_cc[ VMIN ] = 0;
    serial_config_.conf_tio.c_cc[ VTIME ] = 0;
    //store configuration
    tcsetattr( serial_config_.fd , TCSANOW, &serial_config_.conf_tio );

    Start();
    Close();

    SetBitRate();
    SetBTR();

    SetAMR();
    SetACR();

    ToggleTimeStamp( false );
    
    Open();
    AutoPoll();

    fds_.fd = serial_config_.fd;
    fds_.events = POLLIN;



    Version();


}

/**
 * @brief startする．
 * 
 */
void CANUSB::Start()
{
    std::string data;

    data += static_cast<uint8_t>( AsciiCommands::CR );

    for( int i = 0; i < 2; i++ )
    {
        write( serial_config_.fd, data.c_str(), data.size() );
        sleep_for( seconds( 1 ) );
    }
        
}

/**
 * @brief Versionが帰ってくる ( transmitCallbackにて確認する )
 * 
 */
void CANUSB::Version()
{
    std::string data;

    data += static_cast<uint8_t>( AsciiCommands::V );
    data += static_cast<uint8_t>( AsciiCommands::CR );

    write( serial_config_.fd, data.c_str(), data.size() );

}

/**
 * @brief CANUSBのCANチャネルを開く
 * 
 */
void CANUSB::Open()
{
    if( can_config_.IsOpen == false )
    {
        std::string data( "" );

        data += static_cast<uint8_t>( AsciiCommands::O );
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );

        can_config_.IsOpen = true;

    }

}

/**
 * @brief CANチャネルを閉じる
 * 
 */
void CANUSB::Close()
{
    std::string data( "" );

    data += static_cast<uint8_t>( AsciiCommands::C );
    data += static_cast<uint8_t>( AsciiCommands::CR );

    write( serial_config_.fd, data.c_str(), data.size() );

    can_config_.IsOpen = false;

}

/**
 * @brief CANのビットレートを設定する
 * 
 */
void CANUSB::SetBitRate()
{
    if( can_config_.IsOpen == false )
    {
        std::string data( "" );

        data += static_cast<uint8_t>( AsciiCommands::S );
        data += can_config_.BitRate;
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );
    }

}

/**
 * @brief 自動的にポーリングするか．trueでおｋ
 * 
 * @param enable 
 */
void CANUSB::AutoPoll( bool enable )
{
    if( can_config_.IsOpen == true )
    {
        std::string data;

        data += static_cast<uint8_t>( AsciiCommands::X );
        data += ( enable == true )? "1" : "0";
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );
    }

}

/**
 * @brief CANUSBのBTRを指定する．
 * 
 */
void CANUSB::SetBTR( void )
{
    if( can_config_.IsOpen == false )
    {
        std::string data;

        data += static_cast<uint8_t>( AsciiCommands::s );
        data += "00";//00
        data += "05";//05
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );
    }

}

/**
 * @brief CANUSBのフラグを読む
 * 
 */
void CANUSB::Flag( void )
{
    if( can_config_.IsOpen == true )
    {
        std::string data;

        data += static_cast<uint8_t>( AsciiCommands::F );
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );
    }

}


/**
 * @brief Acceptance Mask Registerを登録する
 * 
 */
void CANUSB::SetAMR( void )
{
    if( can_config_.IsOpen == false )
    {
        std::string data;

        data += static_cast<uint8_t>( AsciiCommands::m );
        data += can_config_.AMR;
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );

    }

}

/**
 * @brief Acceptance Code Registerを登録する
 * 
 */
void CANUSB::SetACR( void )
{
    if( can_config_.IsOpen == false )
    {
        std::string data;

        data += static_cast<uint8_t>( AsciiCommands::M );
        data += can_config_.ACR;
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );
    }
}

void CANUSB::ToggleTimeStamp( bool enable )
{
    if( can_config_.IsOpen == false )
    {
        std::string data;

        data += static_cast<uint8_t>( AsciiCommands::Z );
        data += ( enable ) ? "1" : "0";
        data += static_cast<uint8_t>( AsciiCommands::CR );

        write( serial_config_.fd, data.c_str(), data.size() );
    }
}


}

