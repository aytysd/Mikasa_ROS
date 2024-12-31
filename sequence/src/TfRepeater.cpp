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
#include <tf2_ros/transform_listener.h>



#include "TfRepeater.hpp"


namespace NITNC
{
void TfRepeater::Repeat( const ros::TimerEvent& )
{
    geometry_msgs::TransformStamped temp_map2odom;
    bool failed_flag = LookUpTransform( "map", "odom", temp_map2odom );

    if( !failed_flag )
    {
        m_map2odom = temp_map2odom;        
    }

    m_map2odom.header.stamp = ros::Time::now();
    m_pTfBroadcaster -> sendTransform( m_map2odom );

    geometry_msgs::TransformStamped temp_odom2base_link;
    failed_flag = LookUpTransform( "odom", "base_link", temp_odom2base_link );
    
    if( !failed_flag )
    {
        m_odom2base_link = temp_odom2base_link;
    }

    m_odom2base_link.header.stamp = ros::Time::now();
    m_pTfBroadcaster -> sendTransform( m_odom2base_link );




}




void TfRepeater::Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster, tf2_ros::StaticTransformBroadcaster& StaticTfBroadcaster )
{

    MyTF::Init
    (
        nh,
        np,
        TfBroadcaster,
        StaticTfBroadcaster
    );

    double initial_pose_x = 0;
    double initial_pose_y = 0;
    double initial_pose_a = 0;

    np.getParam( "initial_pose_x", initial_pose_x );
    np.getParam( "initial_pose_y", initial_pose_y );
    np.getParam( "initial_pose_a", initial_pose_a );

    BroadcastStaticTF
    (
        "base_link",
        "left_lidar_link",
        {-0.275, -0.289, 0.07},
        M_PI,
        M_PI * 7 / 4  - M_PI / 2 - M_PI / 4 // base_linkとlidar_linkの位置関係を決めてstatic_tfとして発行。以降位置関係は変わらないので、一度だけでOK。
    );

    BroadcastStaticTF
    (
        "base_link",
        "right_lidar_link",
        {0.275, -0.289, 0.07},
        M_PI,
        M_PI * 5 / 4 + M_PI / 2 + M_PI / 4// base_linkとlidar_linkの位置関係を決めてstatic_tfとして発行。以降位置関係は変わらないので、一度だけでOK。
    );

    BroadcastStaticTF
    (
        "map",
        "Sa1",
        {2.7, 4.5, 0.8},
        0,
        0
    );


    BroadcastStaticTF
    (
        "map",
        "Sa2",
        {5.2, 4.5, 0.8},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "Sa3",
        {7.7, 4.5, 0.8},
        0,
        0
    );


    BroadcastStaticTF
    (
        "map",
        "Sb2",
        {6.7, 6.5, 1},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "Sb1",
        {3.7, 6.5, 1},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "S_K1",
        {2.7, 9.5, 0.7},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "S_K2",
        {7.7, 9.5, 0.7},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "Bb",
        {5.2, 10.6, 1.7},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "Ba_right",
        {4.8, 7.5, 1.5},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "Ba_left",
        {5.6, 7.5, 1.5},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "M0",
        {-0.185, 0.276, 0.155},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "M1",
        {0, 0.005, 0.547},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "M2",
        {0.185, 0.276, 0.155},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "M3",
        {-0.252, 0.279, 0.906},
        0,
        0
    );


    BroadcastStaticTF
    (
        "base_link",
        "M4",
        {0.252, 0.279, 0.906},
        0,
        0
    );



    BroadcastStaticTF
    (
        "base_link",
        "V1",
        {0.203, -0.353, 0},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "V2",
        {0.287, 0.289, 0},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "V3",
        {-0.287, 0.289, 0},
        0,
        0
    );

    BroadcastStaticTF
    (
        "base_link",
        "V4",
        {-0.203, -0.353, 0},
        0,
        0
    );


    Pose S1;
    Pose S2;
    Pose S3;
    Pose S4;
    Pose S5;

    BroadcastStaticTF
    (
        "map",
        "S1",
        {1.765, 1.85, 0},
        0,
        5.75959
    );

    BroadcastStaticTF
    (
        "map",
        "S2",
        {3.01, 1.57, 0},
        0,
        5.94
    );

    BroadcastStaticTF
    (
        "map",
        "S3",
        {5.2, 1.57, 0},
        0,
        0
    );

    BroadcastStaticTF
    (
        "map",
        "S4",
        {7.39, 1.57, 0},
        0,
        0.34
    );

    BroadcastStaticTF
    (
        "map",
        "S5",
        {8.635, 1.85, 0},
        0,
        0.523599
    );

        m_map2odom = BroadcastTF( "map", "odom", 0, 0, 0 );
        m_odom2base_link = BroadcastTF( "odom", "base_link", initial_pose_x, initial_pose_y, initial_pose_a );


    // for( int i = 0; i < 1000; i++ )
    // {
    //     // m_map2odom = BroadcastTF( "map", "odom", 0, 0, 0 );
    //     // m_odom2base_link = BroadcastTF( "odom", "base_link", initial_pose_x, initial_pose_y, initial_pose_a );

    //     ros::TimerEvent e;
    //     Repeat( e );

    //     ros::Duration s( 0.01 );
    //     s.sleep();
    // }




    ros::TimerEvent e;
    Repeat( e );

    m_timer = nh.createTimer( ros::Duration( 0.01 ), &TfRepeater::Repeat, this );


}


}
