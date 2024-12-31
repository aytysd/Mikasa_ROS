
#include "../Definition/Vector2_t.hpp"
#include "MarkerPublisher.hpp"

namespace NITNC
{


void MarkerPublisher::PublishSteeringOutput( visualization_msgs::MarkerArray& marker_array, Vector2_t vector, uint8_t num )
{

    geometry_msgs::Point start;
    geometry_msgs::Point end;

    end.x = vector.Vx * ( -1 );
    end.y = vector.Vy * ( -1 );

    visualization_msgs::Marker marker;
    marker.header.frame_id = "V" + std::to_string( num );
    marker.header.stamp = ros::Time();
    marker.id = num;
    marker.type = visualization_msgs::Marker::ARROW;
    marker.points.push_back( start );
    marker.points.push_back( end );
    marker.scale.x = 0.05;
    marker.scale.y = 0.05;
    marker.scale.z = 0.05;
    marker.color.a = 1.0; // Don't forget to set the alpha!
    marker.color.r = 0;
    marker.color.g = 1;
    marker.color.b = 1;
    //only if using a MESH_RESOURCE marker type:

    marker_array.markers.push_back( marker );
}

void MarkerPublisher::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_IdealPathPublisher = nh.advertise<nav_msgs::Path>( "/IdealPurePursuitPath", 10 );
    m_RealPathPublisher = nh.advertise<nav_msgs::Path>( "/RealPurePursuitPath", 10 );

    m_TargetPointPublisher = nh.advertise<geometry_msgs::PointStamped>( "/TargetPoint", 100 );
    m_CirclePublisher = nh.advertise<visualization_msgs::Marker>( "/RobotCircle", 10 );
    m_FieldPublisher = nh.advertise<geometry_msgs::PolygonStamped>( "/Field", 10 );
    m_RobotPublisher = nh.advertise<geometry_msgs::PolygonStamped>( "/Robot", 10 );
    m_SpeedPublisher = nh.advertise<std_msgs::Float32>( "/Speed", 10 );
    m_TargetSpeedPublisher = nh.advertise<std_msgs::Float32>( "/TargetSpeed", 10 );
    m_SteeringOutputPublisher = nh.advertise<visualization_msgs::MarkerArray>( "/SteeringOutput", 10 );
}

void MarkerPublisher::PublishIdealPath( const nav_msgs::Path& path )
{
    m_IdealPath.header.frame_id = "map";
    m_IdealPathPublisher.publish( path );
}

void MarkerPublisher::StoreTrajectoryPath( const Pose SelfPos )
{
    geometry_msgs::PoseStamped pose;

    pose.header.frame_id = "map";

    tf2::Quaternion quat;
    quat.setEuler( 0, 0, 0 );

    pose.pose.position.x = SelfPos.x;
    pose.pose.position.y = SelfPos.y;
    pose.pose.orientation.x = quat.x();
    pose.pose.orientation.y = quat.y();
    pose.pose.orientation.z = quat.z();
    pose.pose.orientation.w = quat.w();

    m_RealPath.header.frame_id = "map"; 

    m_RealPath.poses.push_back( pose );

}

void MarkerPublisher::PublishTrajectoryPath( void )
{
    m_RealPathPublisher.publish( m_RealPath );
}

void MarkerPublisher::PublishTargetPoint( const Pose point )
{
    static int SequenceNumber = 0;

    geometry_msgs::PointStamped point_stamped;
    point_stamped.header.frame_id = "map";
    point_stamped.header.stamp = ros::Time::now();
    point_stamped.header.seq = SequenceNumber;

    point_stamped.point.x = point.x;
    point_stamped.point.y = point.y;
    point_stamped.point.z = 0.1;

    m_TargetPointPublisher.publish( point_stamped );

    SequenceNumber++;
}

void MarkerPublisher::PublishRobot( const Pose SelfPos )
{
    geometry_msgs::PolygonStamped Robot;

    Robot.header.frame_id = "map";
    Robot.header.stamp = ros::Time::now();

    geometry_msgs::Point32 point;
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.504, M_PI / 4 + SelfPos.theta ) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.504, M_PI * 3 / 4 + SelfPos.theta ) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.504, M_PI * 5 / 4 + SelfPos.theta ) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.368, M_PI * 3 / 2 + SelfPos.theta - 0.14 ) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.465, M_PI * 3 / 2 + SelfPos.theta ) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.368, M_PI * 3 / 2 + SelfPos.theta + 0.14) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.504, M_PI * 7 / 4 + SelfPos.theta ) );
    Robot.polygon.points.push_back( Polar2Rectangular( SelfPos, 0.504, M_PI / 4 + SelfPos.theta ) );

    m_RobotPublisher.publish( Robot );

}

void MarkerPublisher::PublishSteeringOutputs
(
    Vector2_t V1,
    Vector2_t V2,
    Vector2_t V3,
    Vector2_t V4
)
{
    visualization_msgs::MarkerArray marker_array;

    PublishSteeringOutput( marker_array, V1, 1 );
    PublishSteeringOutput( marker_array, V2, 2 );
    PublishSteeringOutput( marker_array, V3, 3 );
    PublishSteeringOutput( marker_array, V4, 4 );

    m_SteeringOutputPublisher.publish( marker_array );

}




void MarkerPublisher::PublishSpeed( const double speed )
{
    std_msgs::Float32 SpeedMsg;
    SpeedMsg.data = speed;

    m_SpeedPublisher.publish( SpeedMsg );
}

void MarkerPublisher::PublishField( void )
{
    geometry_msgs::PolygonStamped FieldLine;

    // visualization_msgs::Marker FieldLine;
    FieldLine.header.frame_id = "map";
    FieldLine.header.stamp = ros::Time::now();

    geometry_msgs::Point32 point;
    point.x = 0;
    point.y = 0;
    FieldLine.polygon.points.push_back( point );
    point.x = 0;
    point.y = 1.2;
    FieldLine.polygon.points.push_back( point );
    point.x = 1.2;
    point.y = 1.2;
    FieldLine.polygon.points.push_back( point );
    point.x = 1.2;
    point.y = 2.5;
    FieldLine.polygon.points.push_back( point );
    point.x = 9.2;
    point.y = 2.5;
    FieldLine.polygon.points.push_back( point );
    point.x = 9.2;
    point.y = 1.2;
    FieldLine.polygon.points.push_back( point );
    point.x = 10.4;
    point.y = 1.2;
    FieldLine.polygon.points.push_back( point );
    point.x = 10.4;
    point.y = 0;
    FieldLine.polygon.points.push_back( point );
    point.x = 0;
    point.y = 0;
    FieldLine.polygon.points.push_back( point );

    //only if using a MESH_RESOURCE marker type:
    m_FieldPublisher.publish( FieldLine );

}

void MarkerPublisher::PublishL( const Pose SelfPos, const double radius )
{
    visualization_msgs::Marker marker;
    marker.header.frame_id = "map";
    marker.header.stamp = ros::Time::now();
    marker.id = 0;
    marker.type = visualization_msgs::Marker::CYLINDER;
    marker.action = visualization_msgs::Marker::ADD;
    marker.pose.position.x = SelfPos.x;
    marker.pose.position.y = SelfPos.y;
    marker.pose.position.z = 0;
    marker.pose.orientation.x = 0.0;
    marker.pose.orientation.y = 0.0;
    marker.pose.orientation.z = 0.0;
    marker.pose.orientation.w = 1.0;
    marker.scale.x = radius * 2;
    marker.scale.y = radius * 2;
    marker.scale.z = 0.1;
    marker.color.a = 1.0; // Don't forget to set the alpha!
    marker.color.r = 0.0;
    marker.color.g = 1.0;
    marker.color.b = 0.0;
    //only if using a MESH_RESOURCE marker type:
    m_CirclePublisher.publish( marker );

}

}

