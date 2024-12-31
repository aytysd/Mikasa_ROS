#pragma once

#include <ros/ros.h>
#include <geometry_msgs/PoseStamped.h>
#include <geometry_msgs/Pose2D.h>
#include <std_msgs/Float32MultiArray.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>
#include <geometry_msgs/PoseStamped.h>
#include <nav_msgs/Path.h>
#include <geometry_msgs/Point32.h>
#include <dynamic_reconfigure/server.h>
#include <pure_pursuit/PurePursuitConfig.h>
#include <geometry_msgs/Pose2D.h>
#include <geometry_msgs/PolygonStamped.h>
#include <visualization_msgs/Marker.h>
#include <std_msgs/Float32.h>
#include <visualization_msgs/MarkerArray.h>

#include "Vector2_t.hpp"
#include "Conversion.hpp"
#include "TypeDef.hpp"
namespace NITNC
{

class MarkerPublisher : public Conversion
{
    using PointStamped = geometry_msgs::PointStamped;

private:

    ros::Publisher m_IdealPathPublisher;
    ros::Publisher m_RealPathPublisher;
    ros::Publisher m_CirclePublisher;
    ros::Publisher m_FieldPublisher;
    ros::Publisher m_TargetPointPublisher;
    ros::Publisher m_RobotPublisher;
    ros::Publisher m_SpeedPublisher;
    ros::Publisher m_TargetSpeedPublisher;
    ros::Publisher m_SteeringOutputPublisher;

    nav_msgs::Path m_RealPath;
    nav_msgs::Path m_IdealPath;

    nav_msgs::Path m_Path;

    void PublishSteeringOutput( visualization_msgs::MarkerArray& marker_array, Vector2_t vector, uint8_t num );

public:
    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
    void PublishIdealPath( const nav_msgs::Path& path );

    void StoreTrajectoryPath( const Pose SelfPos );
    void PublishTrajectoryPath( void );
    
    void PublishTargetPoint( const Pose point );

    void PublishSteeringOutput( Vector2_t vector, uint8_t SwerveNum );

    void PublishRobot( const Pose SelfPos );
    void PublishSteeringOutputs
    (
        Vector2_t V1,
        Vector2_t V2,
        Vector2_t V3,
        Vector2_t V4
    );



    void PublishSpeed( const double speed );

    virtual void PublishField( void );

    void PublishL( const Pose SelfPos, const double radius );
};

}

