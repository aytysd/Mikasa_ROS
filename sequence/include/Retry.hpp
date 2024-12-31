#pragma once

#include <ros/ros.h>
#include <std_msgs/Empty.h>
#include <tf2/LinearMath/Quaternion.h>
#include <std_msgs/Bool.h>

#include "TypeDef.hpp"

namespace NITNC
{

class Retry
{

private: 
    ros::NodeHandle* m_p_nh;
    ros::NodeHandle* m_p_np;

    ros::Publisher m_AMCLResetPublisher;
    ros::Subscriber m_RetrySubscriber;
    ros::Publisher m_OdometryResetPublisher;
    ros::Publisher m_CancelShootAndPurePursuitPublisher;
    ros::Publisher m_DrivePowerOnPublisher;
    ros::Publisher m_MechStandByModeRequestPublisher;

    void Execute( const std_msgs::Empty& e );

    void AMCL( void );
    void Odometry( void );
    void AutoControl( void );
    void ManualControl( void );

    Pose m_InitialPose;

public:

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
};
};