#pragma once

#include <ros/ros.h>
#include <sensor_msgs/Joy.h>
#include <geometry_msgs/Pose2D.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>
#include <geometry_msgs/PoseStamped.h>

#include <pure_pursuit/OutputCmd.h>
#include <stm32interface/ManualControl.h>
#include <std_msgs/Bool.h>
#include <actionlib/client/simple_action_client.h>
#include <std_msgs/UInt8.h>

#include "SwerveSteering.hpp"
#include "AttitudeAnglePID.hpp"
#include "PositionalRelation.hpp"
#include <sequence/ShootSpotAction.h>

namespace NITNC
{

typedef actionlib::SimpleActionClient<sequence::ShootSpotAction> ShootSpotClient;

class Controller : public SwerveSteering, public MyTF
{
private:

    ros::NodeHandle* m_p_nh;
    ros::NodeHandle* m_p_np;

    ShootSpotClient* m_p_ShootSpotClient;

    ros::Subscriber m_JoySubscriber;
    ros::Subscriber m_ShootSpotServerActivateSubscriber;
    

    void JoyCallback( const stm32interface::ManualControl& msg );
    void CommandCallback( const pure_pursuit::OutputCmd& msg ) override;

    void ShootSpotActivationCallback( const std_msgs::UInt8& msg );

    double speed_limit = 0;

public: 

    void Init
    ( 
        ros::NodeHandle& nh, 
        ros::NodeHandle& np,  
        tf2_ros::TransformBroadcaster& TfBroadcaster,
        tf2_ros::StaticTransformBroadcaster& StaticTfBroadcaster 
    );
};

};

