#pragma once

#include <ros/ros.h>

#include <stm32interface/MD.h>

#include "CANUSB.hpp"

namespace NITNC
{
class MechanismMD
{
private:

    ros::Subscriber CommandSubscriber;


public:
    virtual void ForwardCallback( const stm32interface::MD& msg );

    virtual void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
};


};