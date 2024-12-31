#include <ros/ros.h>

#include <std_msgs/Empty.h>
#include <geometry_msgs/PoseWithCovarianceStamped.h>


#include "Retry.hpp"

namespace NITNC
{

void Retry::Execute( const std_msgs::Empty& )
{
    Odometry();

    ros::Duration delay( 0.5 );
    delay.sleep();

    AMCL();

    AutoControl();
    ManualControl();

    std_msgs::Bool DrivePower;
    DrivePower.data = true;
    m_DrivePowerOnPublisher.publish( DrivePower );

    m_MechStandByModeRequestPublisher.publish( *( new std_msgs::Empty() ) );

}

void Retry::AMCL( void )
{
    geometry_msgs::PoseWithCovarianceStamped p;
    p.header.frame_id = "map";
    p.header.stamp = ros::Time::now();
    p.pose.pose.position.x = m_InitialPose.x;
    p.pose.pose.position.y = m_InitialPose.y;
    p.pose.pose.position.z = 0;

    tf2::Quaternion quat;
    quat.setEuler( 0, 0, 0 );

    p.pose.pose.orientation.x = quat.x();
    p.pose.pose.orientation.y = quat.y();
    p.pose.pose.orientation.z = quat.z();
    p.pose.pose.orientation.w = quat.w();

    m_AMCLResetPublisher.publish( p );

}

void Retry::AutoControl( void )
{
    m_CancelShootAndPurePursuitPublisher.publish( *( new std_msgs::Empty() ) );
}

void Retry::ManualControl( void )
{
    m_p_nh -> setParam( "/ManualControl/Enabled", false );
}

void Retry::Odometry( void )
{
    m_OdometryResetPublisher.publish( m_InitialPose );
}

void Retry::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_p_nh = &nh;
    m_p_np = &np;

    
    np.getParam( "initial_pose_x", m_InitialPose.x );
    np.getParam( "initial_pose_y", m_InitialPose.y );
    np.getParam( "initial_pose_a", m_InitialPose.theta );

    m_MechStandByModeRequestPublisher = nh.advertise<std_msgs::Empty>( "/shoot_spot_node/StandByRequest", 10 );
    m_CancelShootAndPurePursuitPublisher = nh.advertise<std_msgs::Empty>( "/CancelEverything", 10 );
    m_AMCLResetPublisher = nh.advertise<geometry_msgs::PoseWithCovarianceStamped>( "/initialpose", 10 );
    m_RetrySubscriber = nh.subscribe( "/Retry", 10, &Retry::Execute, this );
    m_OdometryResetPublisher = nh.advertise<Pose>( "/OdomReset", 10 );
    m_DrivePowerOnPublisher = nh.advertise<std_msgs::Bool>( "/EmergencyStop", 10 );
}
}