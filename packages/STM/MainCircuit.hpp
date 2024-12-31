#pragma once

#include <ros/ros.h>
#include <std_msgs/String.h>
#include <std_msgs/Empty.h>
#include <std_msgs/Bool.h>
#include <geometry_msgs/Pose2D.h>

#include "TypeDef.hpp"

namespace NITNC
{
class MainCircuit
{
private:

    ros::NodeHandle* m_p_nh;

    ros::Subscriber m_EmergencyStopSubscriber;
    ros::Subscriber Sub_OdomReset_;

    ros::Publisher m_SignalSendingPublisher;

    void EmergencyCallback( const std_msgs::Bool& msg );
    void OdomResetCallback( const geometry_msgs::Pose2D& msg );

    Pose m_InitialPose;

public:

    MainCircuit()
    {};

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );

};

};

