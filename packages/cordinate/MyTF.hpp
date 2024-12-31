#pragma once

#include <ros/ros.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>
#include <geometry_msgs/Pose2D.h>
#include <tf2/LinearMath/Quaternion.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_ros/transform_broadcaster.h>
#include <tf2_ros/static_transform_broadcaster.h>

#include "TypeDef.hpp"
#include "PositionalRelation.hpp"

namespace NITNC
{
class MyTF
{

private:

    tf2_ros::Buffer m_TfBuffer;
    tf2_ros::TransformListener* m_pTfListener;

    tf2_ros::StaticTransformBroadcaster* m_pStaticTfBroadcaster;
public:

    tf2_ros::TransformBroadcaster* m_pTfBroadcaster;


    void Init
    ( 
        ros::NodeHandle& nh, 
        ros::NodeHandle& np,
        tf2_ros::TransformBroadcaster& TfBroadcaster,
        tf2_ros::StaticTransformBroadcaster& StaticTfBroadcaster
    );

    void Init
    ( 
        ros::NodeHandle& nh, 
        ros::NodeHandle& np,
        tf2_ros::TransformBroadcaster& TfBroadcaster
    );

    void BroadcastStaticTF
    (
        std::string frame_id,
        std::string child_frame_id,
        std::array<double, 3> translation,
        double roll,
        double yaw
    );

    void LookUpSelfPos( geometry_msgs::Pose2D& SelfPos );

    bool LookUpTransform( std::string frame, std::string child_frame, geometry_msgs::TransformStamped& tf );

    double GetTargetAngle( std::string base, std::string target );
    double GetTargetElevationAngle( std::string base, std::string target );

    void BroadcastSelfPos( const Pose SelfPos );
    void BroadcastSelfPos( const double x, const double y, const double theta );

    geometry_msgs::TransformStamped BroadcastTF( std::string base, std::string target, double x, double y, double theta );
};
};
