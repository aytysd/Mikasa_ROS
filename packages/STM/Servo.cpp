#include <ros/ros.h>
#include <std_msgs/Float32.h>
#include <std_msgs/Float32MultiArray.h>
#include <stm32interface/Servo.h>

#include "Servo.hpp"
#include "CANUSB.hpp"
#include "Instances.hpp"
#include "CANID.hpp"

namespace NITNC
{
void Servo::ForwardCallback( const stm32interface::Servo& msg )
{
    uint8_t Data[ 6 ];

    assert( msg.value.size() <= 6 );

    for( int i = 0; i < msg.value.size(); i++ )
    {
        Data[ i ] = msg.value[ i ];
    }

    canusb.Transmit( msg.canid, 6, Data );


}

void Servo::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    Sub_DirectionOrder_ = nh.subscribe( "/ServoCommand", 10, &Servo::ForwardCallback, this );
}
}


