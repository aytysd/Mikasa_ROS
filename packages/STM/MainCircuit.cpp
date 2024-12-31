#include <ros/ros.h>
#include <std_msgs/String.h>
#include <std_msgs/Empty.h>
#include <std_msgs/UInt8.h>
#include <geometry_msgs/Pose2D.h>

#include "CANUSB.hpp"
#include "MainCircuit.hpp"
#include "CANID.hpp"
#include "Instances.hpp"

namespace NITNC
{

void MainCircuit::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_p_nh = &nh;

    m_EmergencyStopSubscriber = nh.subscribe( "/EmergencyStop", 10, &MainCircuit::EmergencyCallback, this );
    Sub_OdomReset_ = nh.subscribe( "/OdomReset", 10, &MainCircuit::OdomResetCallback, this );

    m_SignalSendingPublisher = nh.advertise<std_msgs::Empty>( "/EmergencySignalSending", 10 );

    np.param( "initial_pose_x", m_InitialPose.x, ( double )0 );
    np.param( "initial_pose_y", m_InitialPose.y, ( double )0 );

    CANUSBActivator activator;
    CANUSBCallback::MakeActivatorLamda( activator, static_cast<uint16_t>( CAN1::MainCircuit ), static_cast<uint16_t>( CAN1::MY_ID ) );
    // canusb.SetCallback( activator,  )

    OdomResetCallback( m_InitialPose );
}

void MainCircuit::EmergencyCallback( const std_msgs::Bool& msg )
{
    if( msg.data )
    {

        for( int i = 0; i < 10; i++ )
        {
            m_SignalSendingPublisher.publish( *( new std_msgs::Empty() ) );

            uint8_t d[ 8 ] = { 255, 0, 0, 0, 0, 0, 0, 127 };
            canusb.Transmit( 1, 8, d );
            
            ros::Duration delay( 0.01 );
            delay.sleep();
        }

    }
    else
    {
        for( int i = 0; i < 10; i++ )
        {
            m_SignalSendingPublisher.publish( *( new std_msgs::Empty() ) );

            uint8_t d[ 8 ] = { 0, 0, 0, 0, 0, 0, 0, 127 };
            canusb.Transmit( 1, 8, d );
            
            ros::Duration delay( 0.01 );
            delay.sleep();
        }


    }
}

void MainCircuit::OdomResetCallback( const geometry_msgs::Pose2D& msg )
{
    uint8_t data[ 4 ] = { 0 };

    data[ 0 ] = ( static_cast<int16_t>( msg.x * 1000.0 ) & 0xFF00 ) >> 8;
    data[ 1 ] = ( static_cast<int16_t>( msg.x * 1000.0 ) & 0x00FF );
    data[ 2 ] = ( static_cast<int16_t>( msg.y * 1000.0 ) & 0xFF00 ) >> 8;
    data[ 3 ] = ( static_cast<int16_t>( msg.y * 1000.0 ) & 0x00FF );
    
    canusb.Transmit( CAN1::MainCircuit, 4, data );
};
}; // namespace NINTC

