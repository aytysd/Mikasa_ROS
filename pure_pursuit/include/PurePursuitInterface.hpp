#pragma once


#include <ros/ros.h>
#include "PurePursuit.hpp"
#include <pure_pursuit/OutputCmd.h>
#include <std_msgs/Float32MultiArray.h>
#include <actionlib/server/simple_action_server.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>
#include <pure_pursuit/PurePursuitActionGoal.h>
#include <actionlib/server/simple_action_server.h>
#include <pure_pursuit/PurePursuitAction.h>

#include "CallbackBase.hpp"



namespace NITNC
{

typedef actionlib::SimpleActionServer<pure_pursuit::PurePursuitAction> Server;

class PurePursuitInterface : public PositionalRelation
{
private:

    ros::NodeHandle* m_p_nh;
    ros::NodeHandle* m_p_np;

    Server* server_;

    pure_pursuit::PurePursuitFeedback Feedback_;
    pure_pursuit::PurePursuitResult Result_;

    bool IsFinished_ = false;

    void ExecuteCallback( const pure_pursuit::PurePursuitGoalConstPtr& goal );
    void FeedbackCallback( geometry_msgs::Pose2D SelfPos, uint8_t CallbackID );


public:

    void init( ros::NodeHandle& nh, ros::NodeHandle& np );
    void Control( void );

    void FeedbackAtGoalCallback( geometry_msgs::Pose2D SelfPos, uint8_t CallbackID );
    void LastPointCallback( geometry_msgs::Pose2D SelfPos, uint8_t CallbackID );

};

}

extern NITNC::PurePursuitInterface pure_pursuit_interface;