#pragma once

#include <ros/ros.h>
#include <geometry_msgs/Pose2D.h>
#include <actionlib/client/simple_action_client.h>
#include <std_msgs/Empty.h>
#include <std_msgs/String.h>
#include <pure_pursuit/PurePursuitGoal.h>
#include <tf2_ros/transform_broadcaster.h>
#include <tf2_ros/static_transform_broadcaster.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2/LinearMath/Quaternion.h>

#include "MyTF.hpp"

namespace NITNC
{
class TfRepeater : public MyTF
{
private:

    geometry_msgs::TransformStamped m_map2odom;
    geometry_msgs::TransformStamped m_odom2base_link;


    ros::Timer m_timer;

    void Repeat( const ros::TimerEvent& e );


public:

    TfRepeater(){};

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster, tf2_ros::StaticTransformBroadcaster& StaticTfBroadcaster );
};

};

