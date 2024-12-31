#pragma once

#include <ros/ros.h>
#include <std_msgs/Float32.h>
#include <std_msgs/Float32MultiArray.h>
#include <stm32interface/Servo.h>

#include "Serial.hpp"
#include "Servo.hpp"

namespace NITNC
{



class Servo
{
private:

    ros::Subscriber Sub_DirectionOrder_;


public:
    virtual void ForwardCallback( const stm32interface::Servo& msg );

    virtual void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
};

};

