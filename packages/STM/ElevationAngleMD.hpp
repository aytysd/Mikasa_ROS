#pragma once

#include <ros/ros.h>

#include <stm32interface/ElevationAngleMD.h>

#include "CANUSB.hpp"

#include <math.h>

namespace NITNC
{

class ElevationAngleMD
{
private:

    ros::NodeHandle* m_p_nh;

    ros::Subscriber m_ElevationAngleSubscriber;
    void ForwardCallback( const stm32interface::ElevationAngleMD& msg );

public:

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );

};

};