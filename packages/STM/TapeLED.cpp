#include <ros/ros.h>
#include <std_msgs/UInt8MultiArray.h>

#include "CANUSB.hpp"
#include "TapeLED.hpp"
#include "Instances.hpp"
#include "CANID.hpp"

namespace NITNC
{
    
void TapeLEDCircuit::TapeLEDTimerCallback( const ros::TimerEvent& )
{
    using namespace Colours;

    for( size_t i = 0; i < 4; i++ )
    {
        TxData[ i ] = 0;
    }

    TxData[ 0 ] = 26;

    if( DrivePower() )
    {
        if( ManualControl() )
        {
            SetRGB( TxData, Blue );
        }
        else
        {
            SetRGB( TxData, Purple );
        }
    }
    else
    {
        SetRGB( TxData, Red );
    } 


    canusb.Transmit( 15, 4, TxData );


}

void TapeLEDCircuit::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    using namespace Colours;

    m_p_nh = &nh;
    m_p_np = &np;

    // CreateBlinkLamda( TxData, Green, None );

    m_Timer = m_p_nh -> createTimer( ros::Duration( 0.1 ), &TapeLEDCircuit::TapeLEDTimerCallback, this );
}


bool TapeLEDCircuit::DrivePower( void )
{

    bool DrivePowerOn = false;
    m_p_nh -> getParamCached( "/DrivePoweredOn", DrivePowerOn );

    return DrivePowerOn;
}

bool TapeLEDCircuit::ManualControl( void )
{

    bool ManualControlEnabled = false;
    m_p_nh -> getParamCached( "/ManualControl/ActivateManualShootSpotServer", ManualControlEnabled );

    return ManualControlEnabled;
}

bool TapeLEDCircuit::AutoControl( void )
{

    using namespace Colours;

    bool PurePursuitEnabled = false;
    m_p_nh -> getParamCached( "/PurePursuit/Following", PurePursuitEnabled );

    return PurePursuitEnabled;

}

bool TapeLEDCircuit::AutoControlIsApproaching( void )
{
    bool PurePursuitApproaching = false;
    m_p_nh -> getParam( "/PurePursuit/Approaching", PurePursuitApproaching );

    return PurePursuitApproaching;
}

void TapeLEDCircuit::SetRed( uint8_t& data, uint8_t r )
{
    data = r;
}

void TapeLEDCircuit::SetBlue( uint8_t& data, uint8_t b )
{
    data = b;
}

void TapeLEDCircuit::SetGreen( uint8_t& data, uint8_t g )
{
    data = g;
}

void TapeLEDCircuit::SetRGB( uint8_t* data, const Colour_t& colour )
{

    SetRed( data[ 1 ], colour.r );
    SetGreen( data[ 2 ], colour.g );
    SetBlue( data[ 3 ], colour.b );

}

void TapeLEDCircuit::CreateBlinkLamda( uint8_t* data, const Colour_t& colour1, const Colour_t& colour2 )
{
    // std::function<void( const ros::TimerEvent& )> func = 
    // [
    //     this,
    //     &data,
    //     &colour1,
    //     &colour2,
    // ]
    // ( const ros::TimerEvent& e ) -> void
    // {
    //     using namespace Colours;

        

    //     ROS_INFO( "in timer:"  );

    // };

    // m_p_BlinkTimers[ TapeLEDIndex ] = 
    //     m_p_nh -> createTimer
    //     ( 
    //         ros::Duration( 1 ),
    //         func,
    //         false,
    //         false
    //     );
    
}

}
