#pragma once

#include <ros/ros.h>
#include <pure_pursuit/OutputCmd.h>
#include <std_msgs/Float32MultiArray.h>

#include "Conversion.hpp"

namespace NITNC
{
class OmniWheelEquation
{
private:
    ros::Subscriber sub_Cmd_;
    ros::Subscriber Sub_MotorTest_;
    

    void SingleWheelOutput( const std_msgs::Float32MultiArray& msg );
public:
    void WheelOutput( const pure_pursuit::OutputCmd& msg );
    virtual void init( ros::NodeHandle& nh );
    virtual void drive( double velocity, uint8_t CANID );

    
};

};

