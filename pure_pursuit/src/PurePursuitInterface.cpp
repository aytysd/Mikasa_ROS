#include <ros/ros.h>
#include <geometry_msgs/Pose2D.h>
#include <std_msgs/String.h>
#include <std_msgs/Float32MultiArray.h>
#include <std_msgs/Empty.h>
#include <pure_pursuit/PurePursuitGoal.h>
#include <actionlib/server/simple_action_server.h>

#include "PurePursuitDef.hpp"
#include "PurePursuit.hpp"
#include "PurePursuitInterface.hpp"
#include "CallbackBase.hpp"
NITNC::PurePursuitInterface pure_pursuit_interface;

namespace NITNC
{
    
void PurePursuitInterface::ExecuteCallback( const pure_pursuit::PurePursuitGoalConstPtr& goal )
{

    purepursuit.Reset();

    // purepursuit.GetConfigParams().SetK( goal -> k );
    // purepursuit.GetConfigParams().SetSpeedMultiplier( goal -> SpeedMultiplier );


    purepursuit.ReadCSV
    (
        purepursuit.GetCandidatePath(),
        goal -> FileName
    );

    for( size_t i = 0; i < goal -> FeedbackCallbackPoints.size(); i++ )
    {
        PurePursuitActivator activator;
        
        PurePursuitCallback::MakeActivatorLamda
        (
            activator,
            goal -> FeedbackCallbackPoints[ i ],
            goal -> ApproachTolerances[ i ].data,
            goal -> AttitudeAngleTolerances[ i ].data
        );

        purepursuit.SetCallback
        (
            activator,
            std::bind( &PurePursuitInterface::FeedbackCallback, this, std::placeholders::_1, std::placeholders::_2 )
        );
    }

    std::vector<PointInfo_t>::reverse_iterator rit = purepursuit.GetCandidatePath().rbegin();
    PointInfo_t pt = *rit;
    geometry_msgs::Pose2D LastPoint = pt.Point;


    if( goal -> FeedbackPointAtGoal )
    {
        PurePursuitActivator activator;
    
        PurePursuitCallback::MakeActivatorLamda
        (
            activator,
            LastPoint,
            goal -> FeedbackPointAtGoalDistance.data,
            M_PI
        );

        purepursuit.SetCallback
        (
            activator,
            std::bind( &PurePursuitInterface::FeedbackAtGoalCallback, this, std::placeholders::_1, std::placeholders::_2 )
        );
    }


    PurePursuitActivator activator;

    PurePursuitCallback::MakeActivatorLamda
    (
        activator,
        LastPoint,
        0.025,
        0.017444,
        true
    );


    purepursuit.SetCallback
    (
        activator,
        std::bind( &PurePursuitInterface::LastPointCallback, this, std::placeholders::_1, std::placeholders::_2 )
    );


    ros::Rate loop_rate( 5 );

    ros::Duration delay( 0.2 );
    delay.sleep();
    purepursuit.Enable();

    m_p_nh -> setParam( "/PurePursuit/Following", true );

    while( ros::ok() )
    {
        bool GUIEnabled = false;
        m_p_nh -> getParamCached( "/PurePursuit/Enabled", GUIEnabled );

        if( server_ -> isPreemptRequested() || ( !GUIEnabled ) )
        {
            purepursuit.Disable();
            purepursuit.Reset();

            m_p_nh -> setParam( "/PurePursuit/Approaching", false );
            m_p_nh -> setParam( "/PurePursuit/Following", false );


            server_ -> setPreempted();
            return;
        }

        if( IsFinished_ )
        {
            purepursuit.Disable();
            purepursuit.Reset();

            IsFinished_ = false;

            m_p_nh -> setParam( "/PurePursuit/Approaching", false );
            m_p_nh -> setParam( "/PurePursuit/Following", false );

            server_ -> setSucceeded();
            return;
        }

        loop_rate.sleep();
        ros::spinOnce();
    }

}


void PurePursuitInterface::init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_p_nh = &nh;
    m_p_np = &np;

    m_p_nh -> setParam( "/PurePursuit/Following", false );

    server_ = new Server( nh, "PurePursuit", boost::bind( &PurePursuitInterface::ExecuteCallback, this, _1 ), false );
    server_ -> start();

}

void PurePursuitInterface::LastPointCallback( geometry_msgs::Pose2D SelfPos, uint8_t CallbackID )
{
    purepursuit.Disable();

    IsFinished_ = true;

    purepursuit.Reset();
    
    purepursuit.Stop();

    purepursuit.PublishTrajectoryPath();


}

void PurePursuitInterface::FeedbackAtGoalCallback( geometry_msgs::Pose2D SelfPos, uint8_t CallbackID )
{
    Feedback_.SelfPos = SelfPos;
    server_ -> publishFeedback( Feedback_ );

    m_p_nh -> setParam( "/PurePursuit/Approaching", true );
}


void PurePursuitInterface::FeedbackCallback( geometry_msgs::Pose2D SelfPos, uint8_t CallbackID )
{
    Feedback_.SelfPos = SelfPos;
    server_ -> publishFeedback( Feedback_ );

}
}

