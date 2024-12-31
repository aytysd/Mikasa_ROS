#include <ros/ros.h>
#include <geometry_msgs/Pose2D.h>
#include <tf2_ros/transform_broadcaster.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2/LinearMath/Quaternion.h>
#include <tf2_ros/static_transform_broadcaster.h>
#include <diagnostic_updater/diagnostic_updater.h>
#include <geometry_msgs/Pose2D.h>

#include <string>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <thread>
#include <chrono>

#include "Serial.hpp"


namespace NITNC
{
void Serial::SimSelfPosCallback( const geometry_msgs::Pose2D& msg )
{
    BroadcastSelfPos( msg );
}

void Serial::TimerCallback( const ros::TimerEvent& )
{
    char buff[ 256 ] = { 0 };
    if( read( serial_config_.fd, buff, sizeof( buff ) ) >= 1 )
    {
        RxChunkData_ += buff;

        while( ( RxChunkData_.find( '\n' ) != std::string::npos ) || ( RxChunkData_.find( '\r' ) != std::string::npos )  )
        {
            std::string OneChunkData = RxChunkData_.substr( 0, 18 );

            if( OneChunkData.size() == 18 && OneChunkData.find( '\n' ) == std::string::npos )
            {
                std::vector<uint8_t> data;
                std::vector<uint8_t> data2;
                std::string dataInString = OneChunkData.substr( 0, 8 );
                std::string data2InString = OneChunkData.substr( 8, 17 );

                HexString2Dec( dataInString, data );
                HexString2Dec( data2InString, data2 );

                data.insert( data.end(), data2.begin(), data2.end() );

                int16_t SelfPosX = data[ 0 ] << 8;
                SelfPosX |= data[ 1 ];

                double SelfPosXInDouble = ( double )SelfPosX / ( double )1000.0;

                int16_t SelfPosY = data[ 2 ] << 8;
                SelfPosY |= data[ 3 ];

                double SelfPosYInDouble = ( double )SelfPosY / ( double )1000.0;

                uint32_t AttitudeAngleDataInIEEE = 0;
                AttitudeAngleDataInIEEE |= ( data[ 4 ] << 24 );
                AttitudeAngleDataInIEEE |= ( data[ 5 ] << 16 );
                AttitudeAngleDataInIEEE |= ( data[ 6 ] << 8 );
                AttitudeAngleDataInIEEE |= ( data[ 7 ] << 0 );

                double ThetaInDouble = Conversion::IEEE2Float( AttitudeAngleDataInIEEE );

                BroadcastSelfPos( SelfPosXInDouble, SelfPosYInDouble, ThetaInDouble );

                Pose SelfPos;
                // SelfPos.x = SelfPosXInDouble;
                // SelfPos.y = SelfPosYInDouble;
                // SelfPos.theta = ThetaInDouble;
                LookUpSelfPos( SelfPos );
                m_SelfPosPublisher.publish( SelfPos );

                if( ( data[ 8 ] & 0b10000000 ) != 0 )
                {
                    m_p_nh -> setParam( "/DrivePoweredOn", true );
                }
                else
                {
                    m_p_nh -> setParam( "/DrivePoweredOn", false );
                }

                if( ( data[ 8 ] & 0b01 ) == 1 )
                {
                    m_p_nh -> setParam( "/DrivePoweredOnByGPIO", true );
                }
                else
                {
                    m_p_nh -> setParam( "/DrivePoweredOnByGPIO", false );
                }

                RxChunkData_.erase( 0, 19 );

            }
            else
            {
                RxChunkData_.erase( 0, 1 );
            }

            


        }

        DiagnosticCounter = 0;

    }
    else
    {
        DiagnosticCounter++;
    }

    m_p_updater -> update();

}

void Serial::SerialDiagnostic( diagnostic_updater::DiagnosticStatusWrapper& stat )
{
    if ( serial_config_.fd == -1 )
    {
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::ERROR, "ROS doesn't recognize st-link!" );
    }
    else if ( DiagnosticCounter >= 2000 )
    {
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::WARN, "ROS doesn't receive SelfPos from st-link for 2 seconds!" );
    }
    else if( DiagnosticCounter >= 5000 )
    {
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::ERROR, "ROS doesn't receive SelfPos from st-link for 5 seconds! Maybe Gyro hasn't been Initialized." );
    }
    else
    {
        stat.summaryf( diagnostic_msgs::DiagnosticStatus::OK, "ROS receives SelfPos" );
    }
    
}



void Serial::Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster, diagnostic_updater::Updater& updater )
{
    m_p_nh = &nh;

    np.param( "baud_rate", serial_config_.baud_rate, B115200 );
    np.param( "DeviceName", serial_config_.DeviceName, ( std::string )"/dev/Serial" );
    np.param( "PollingRate", serial_config_.PollingRate, 0.001 );
    np.param( "error_limit", error_limit, 50 );
    np.param( "warn_limit", warn_limit, 30 );
    np.param( "dev_tolerance", dev_tolerance, 0.5 );

    MyTF::Init
    (
        nh,
        np,
        TfBroadcaster
    );

    timer_ = nh.createTimer( ros::Duration( serial_config_.PollingRate ), &Serial::TimerCallback, this );

    bool sim = false;
    np.param( "sim", sim, false );

    if( sim )
    {
        m_SimSelfPosSubscriber = nh.subscribe( "/SelfPos", 10, &Serial::SimSelfPosCallback, this );
    }
    else
    {
        m_SelfPosPublisher = nh.advertise<Pose>( "/SelfPos", 10 );
    }


    serial_config_.fd = open( serial_config_.DeviceName.c_str(), O_RDWR | O_NOCTTY | O_NONBLOCK );

    // if( serial_config_.fd == -1 )
    // {
    //     for( int i = 0; i < 20; i++ )
    //     {
    //         serial_config_.fd = open( serial_config_.DeviceName.c_str(), O_RDWR | O_NOCTTY | O_NONBLOCK );

    //         if( serial_config_.fd != -1 )
    //         {
    //             break;
    //         }

    //         ros::Duration wait( 0.1 );
    //         wait.sleep();

    //         if( i > 18 )
    //         {
    //             ros::shutdown();
    //         }
    //     }
    // }

    FILE* fr = fopen( serial_config_.DeviceName.c_str(), "r" );

    int test = fflush( fr );

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

    fds_.fd = serial_config_.fd;
    fds_.events = POLLIN;

    m_p_updater = &updater;

    m_p_updater -> setHardwareID( "Serial" );
    m_p_updater -> add( "Serial", boost::bind( &Serial::SerialDiagnostic, this, _1 ) );


}

}

