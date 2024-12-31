#pragma once

#include <ros/ros.h>
#include <geometry_msgs/Pose2D.h>
#include <std_msgs/String.h>
#include <std_msgs/Empty.h>
#include <tf2_ros/transform_broadcaster.h>
#include <tf2_ros/static_transform_broadcaster.h>
#include <sequence/MovementCommand.h>
#include <actionlib/client/simple_action_client.h>
#include <pure_pursuit/PurePursuitAction.h>
#include <simple_route_planner/RouteGenAction.h>
#include <sequence/ShootSpotAction.h>
#include <std_msgs/Bool.h>

#include "TypeDef.hpp"
#include "ShootSpot.hpp"
#include "CharacterManipulation.hpp"
#include "MyTF.hpp"
#include "PositionalRelation.hpp"

namespace NITNC
{

typedef actionlib::SimpleActionClient<pure_pursuit::PurePursuitAction> PurePursuitClient;
typedef actionlib::SimpleActionClient<simple_route_planner::RouteGenAction> RouteGenClient;
typedef actionlib::SimpleActionClient<sequence::ShootSpotAction> ShootSpotClient;

#define DT 0.1
#define KOD 0.2

#define UPPER 0
#define FASTEST 1
#define LOWER 2

class Movement : public CharacterManipulation, public MyTF
{
private:

    ros::NodeHandle* m_p_nh;

    ros::Timer m_Timer;
    void TimerCallback( const ros::TimerEvent& e );

    PurePursuitClient* m_p_PurePursuitClient;
    RouteGenClient* m_pRouteGenClient;
    ShootSpotClient* m_p_ShootSpotClient;

    ros::Subscriber m_MovementCommandSubscriber;
    ros::Subscriber m_CancelShootAndPurePursuitSubscriber;

    ros::Publisher m_MechStandByModeRequestPublisher;

    ros::Publisher m_DestinationArrivalPublisher;

    void CancelEverythingCallback( const std_msgs::Empty& msg );

    void MovementCommandCallback( const sequence::MovementCommand& msg );

    bool m_f_IsInShootSpot = false;
    bool m_f_IsInStartZone = true;
    bool m_f_IsInLandingZone = false;

    std::array<Pose, 5> ShootSpots;

    std::string m_CurrentFollowingPath = "";
    uint8_t m_ShootSpotNum = 0;

    void CheckWhereTheMachineIs( void );

    void SetPurePursuitGoal( std::string FollowingPath, const sequence::MovementCommand& msg );

    void PurePursuitDoneCallback( const actionlib::SimpleClientGoalState& state, const pure_pursuit::PurePursuitResultConstPtr& result );
    void PurePursuitActiveCallback( void );
    void PurePursuitFeedbackCallback( const pure_pursuit::PurePursuitFeedbackConstPtr& feedback );
    
public:



    void Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster );

};

};