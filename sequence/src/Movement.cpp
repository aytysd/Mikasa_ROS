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

#include "Movement.hpp"



namespace NITNC
{
void Movement::SetPurePursuitGoal( std::string FollowingPath, const sequence::MovementCommand& msg )
{
    pure_pursuit::PurePursuitGoal goal;

    goal.FileName = FollowingPath;

    std_msgs::Float32 ApproachTolerance;
    ApproachTolerance.data = 0.1;
    goal.ApproachTolerances.push_back( ApproachTolerance );

    std_msgs::Float32 AttitudeAngleTolerance;
    AttitudeAngleTolerance.data = 0.1; 
    goal.AttitudeAngleTolerances.push_back( AttitudeAngleTolerance );

    goal.FeedbackPointAtGoal = true;
    goal.FeedbackPointAtGoalDistance.data = 0.5;

    goal.SpeedMultiplier = msg.speed_multiplier;
    goal.k = msg.k;

    m_p_PurePursuitClient -> sendGoal
    (
        goal,
        boost::bind( &Movement::PurePursuitDoneCallback, this, _1, _2 ),
        boost::bind( &Movement::PurePursuitActiveCallback, this ),
        boost::bind( &Movement::PurePursuitFeedbackCallback, this, _1 )
    );


}


void Movement::PurePursuitDoneCallback( const actionlib::SimpleClientGoalState& state, const pure_pursuit::PurePursuitResultConstPtr& result )
{
    

    if( state.toString() == "SUCCEEDED" )
    {
        if
        ( 
            m_CurrentFollowingPath.find( "goto" ) != std::string::npos ||
            m_CurrentFollowingPath.find( "temp.csv" ) != std::string::npos 
        )
        {
            m_p_nh -> setParam( "/ManualControl/Enabled", true );
            // m_p_nh -> setParam( "/PurePursuit/Enabled", false );

            m_DestinationArrivalPublisher.publish( *( new std_msgs::Empty() ) );
        }
    }


}

void Movement::PurePursuitActiveCallback( void ){}
void Movement::PurePursuitFeedbackCallback( const pure_pursuit::PurePursuitFeedbackConstPtr& feedback )
{
    ROS_INFO( "feedback received!" );

    size_t test = m_CurrentFollowingPath.find( "return" );

    if( m_CurrentFollowingPath.find( "return" ) != std::string::npos )
    {
    }
    else
    {
        sequence::ShootSpotGoal goal;
        goal.SelfPos = feedback -> SelfPos;
        goal.AutoAiming = true;

        goal.ShootSpot = m_ShootSpotNum;
        m_p_nh -> setParam( "/CurrentShootSpot", m_ShootSpotNum );

        m_p_ShootSpotClient -> sendGoal( goal );
    }

}

void Movement::CancelEverythingCallback( const std_msgs::Empty& )
{
    m_p_ShootSpotClient -> cancelAllGoals();
    m_p_PurePursuitClient -> cancelAllGoals();

    m_f_IsInShootSpot = false;
    m_f_IsInStartZone = true;
    m_f_IsInLandingZone = false;

}

void Movement::MovementCommandCallback( const sequence::MovementCommand& msg )
{
    if( msg.red_zone ) 
    { 
        m_CurrentFollowingPath = "RedZone/";
    }
    else
    { 
        m_CurrentFollowingPath = "BlueZone/";
    }

    m_CurrentFollowingPath += "ShootSpot";
    m_CurrentFollowingPath += std::to_string( msg.where );
    m_CurrentFollowingPath += ( msg.ToShootSpot ) ? "/goto/" : "/return/";


    uint8_t PrevShootSpotNum = m_ShootSpotNum;
    m_ShootSpotNum = msg.where;

    switch( msg.route )
    {
    case FASTEST:
        m_CurrentFollowingPath += "fastest";
        break;
    case UPPER:
        m_CurrentFollowingPath += "upper";
        break;
    case LOWER:
        m_CurrentFollowingPath += "lower";
        break;
    default:
        break;
    }

    m_CurrentFollowingPath += ".csv";


    if( m_f_IsInLandingZone && msg.ToShootSpot )
    {
        simple_route_planner::RouteGenGoal goal;

        goal.FilePath = "/home/ayato/catkin_ws/src/2022/pure_pursuit/csv/temp.csv";

        Pose SelfPos;
        LookUpSelfPos( SelfPos );
        
        goal.start = SelfPos;
        goal.end = ShootSpots[ m_ShootSpotNum - 1 ];
        goal.point_num = 40;

        switch( msg.route )
        {
        case UPPER:
            goal.upper = 0;
            break;
        case FASTEST:
            goal.upper = 1;
            break;
        case LOWER:
            goal.upper = 2;
            break;
        }
        
        m_pRouteGenClient -> sendGoal( goal );
        m_pRouteGenClient -> waitForResult();

        m_CurrentFollowingPath = "temp.csv";

    }

    SetPurePursuitGoal( m_CurrentFollowingPath, msg );

    m_p_ShootSpotClient -> cancelAllGoals();

}

void Movement::TimerCallback( const ros::TimerEvent& )
{
    CheckWhereTheMachineIs();
}

void Movement::Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster )
{

    m_p_nh = &nh;

    bool RedZone = false;
    m_p_nh -> getParam( "red_zone", RedZone );
    if( RedZone )
    {
        m_p_nh -> setParam( "/CurrentShootSpot", 1 );
    }
    else
    {
        m_p_nh -> setParam( "/CurrentShootSpot", 5 );
    }

    m_Timer = m_p_nh -> createTimer( ros::Duration( 0.01 ), &Movement::TimerCallback, this );

    m_MovementCommandSubscriber = nh.subscribe( "/movement_command", 10, &Movement::MovementCommandCallback, this );
    m_CancelShootAndPurePursuitSubscriber = nh.subscribe( "/CancelEverything", 10, &Movement::CancelEverythingCallback, this );

    m_MechStandByModeRequestPublisher = nh.advertise<std_msgs::Empty>( "/shoot_spot_node/StandByRequest", 10 );

    m_DestinationArrivalPublisher = nh.advertise<std_msgs::Empty>( "/DestinationArrival", 10 );


    m_pRouteGenClient = new RouteGenClient( "simple_route_planner", true );
    m_p_PurePursuitClient = new PurePursuitClient( "PurePursuit", true );
    m_p_ShootSpotClient = new ShootSpotClient( "ShootSpot", true );

    MyTF::Init( nh, np, TfBroadcaster );


    ROS_INFO("Waiting for pure_pursuit server to start.");
    m_p_PurePursuitClient -> waitForServer();
    ROS_INFO("pure_pursuit server started, sending goal.");

    ROS_INFO("Waiting for ShootSpot server to start.");
    m_p_ShootSpotClient -> waitForServer();
    ROS_INFO("ShootSpot server started.");

    ROS_INFO("Waiting for simple_route_planner server to start.");
    m_pRouteGenClient -> waitForServer();
    ROS_INFO("simple_route_planner server started.");

    Pose S1;
    Pose S2;
    Pose S3;
    Pose S4;
    Pose S5;

    S1.x = 1.765;
    S1.y = 1.85;
    S1.theta = 5.75959;

    S2.x = 3.01;
    S2.y = 1.57;
    S2.theta = 5.94;

    S3.x = 5.2;
    S3.y = 1.57;
    S3.theta = 0;

    S4.x = 7.39;
    S4.y = 1.57;
    S4.theta = 0.34;

    S5.x = 8.635;
    S5.y = 1.85;
    S5.theta = 0.523599;

    ShootSpots[ 0 ] = S1;
    ShootSpots[ 1 ] = S2;
    ShootSpots[ 2 ] = S3;
    ShootSpots[ 3 ] = S4;
    ShootSpots[ 4 ] = S5;




}

void Movement::CheckWhereTheMachineIs( void )
{

    static bool f_MechInitialized = false;

    Pose SelfPos;
    LookUpSelfPos( SelfPos );

    if
    ( 
        SelfPos.x < 1.2 || 
        SelfPos.x > 9.2 
    )
    {
        m_f_IsInStartZone = true;
        m_f_IsInLandingZone = false;
        m_f_IsInShootSpot = false;

        if( f_MechInitialized )
        {

        }
        else
        {
            m_MechStandByModeRequestPublisher.publish( *( new std_msgs::Empty() ) );
            f_MechInitialized = true;
        }
        
    }
    else
    {
        f_MechInitialized = false;

        m_f_IsInLandingZone = true;
        m_f_IsInStartZone = false;

        double DisstanceBetwS1_SelfPos = PositionalRelation::GetDistance( ShootSpots[ 0 ], SelfPos );
        double DisstanceBetwS2_SelfPos = PositionalRelation::GetDistance( ShootSpots[ 1 ], SelfPos );
        double DisstanceBetwS3_SelfPos = PositionalRelation::GetDistance( ShootSpots[ 2 ], SelfPos );
        double DisstanceBetwS4_SelfPos = PositionalRelation::GetDistance( ShootSpots[ 3 ], SelfPos );
        double DisstanceBetwS5_SelfPos = PositionalRelation::GetDistance( ShootSpots[ 4 ], SelfPos );

        if
        (
            DisstanceBetwS1_SelfPos < 0.5 ||
            DisstanceBetwS2_SelfPos < 0.5 ||
            DisstanceBetwS3_SelfPos < 0.5 ||
            DisstanceBetwS4_SelfPos < 0.5 ||
            DisstanceBetwS5_SelfPos < 0.5
        )
        {
            m_f_IsInShootSpot = true;
        }
        else
        {
            m_f_IsInShootSpot = false;
        }
    }
}



}
