#pragma once

#include <ros/ros.h>
#include <std_msgs/String.h>
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

#include <fstream>
#include <string>
#include <sstream>
#include <vector>
#include <map>

#include <pure_pursuit/OutputCmd.h>

#include "PID.hpp"
#include "MarkerPublisher.hpp"
#include "MyTF.hpp"
#include "Conversion.hpp"
#include "PositionalRelation.hpp"
#include "CSV.hpp"
#include "PurePursuitDef.hpp"
#include "MathEquation.hpp"
#include "TypeDef.hpp"
#include "Control.hpp"
#include "PurePursuitCallback.hpp"
#include "CallbackBase.hpp"
#include "AttitudeAnglePID.hpp"

namespace NITNC
{

class PurePursuit : public MarkerPublisher, public AttitudeAnglePID, public MyTF, public CSV, public MathEquation, public PurePursuitCallback
{
private:

    ros::NodeHandle* m_p_nh;

    ros::Timer m_timer;

    ros::Publisher PubCmd_;    

    ros::Subscriber m_TempDisableSubscriber;
    ros::Subscriber m_EnableSubscriber;

    void run( ConfigParams_t& ConfigParams, const Pose& msg, PointsInfo_t& PointsInfo );

    void ReconfigureCallback( PurePursuitConfig& config, uint32_t level );
    void TimerCallback( const ros::TimerEvent& e );


    int SearchNearestPoint( const PointsInfo_t& PointsInfo, const Pose SelfPos );
    int SearchTargetPoint( const PointsInfo_t& PointsInfo, const Pose SelfPos, int NearestPointIndex, double L );

    OutputCmd m_OutMsg;

    void CreateInstanceOfOutputCmd( OutputCmd& instance, PointsInfo_t& Points, Pose SelfPos, int NearestPointIndex, int TargetPointIndex, int LastPointIndex, const ConfigParams_t& ConfigParams, bool PathThrough );
    Pose GetTargetPointBasedOnNearestPoint
    (
        const PointsInfo_t& Points,
        int TargetPointIndex,
        Pose NearestPoint,
        Pose LastPoint,
        double L
    );

    Pose GetTargetPointBasedOnSelfPos
    (
        const PointsInfo_t& Points,
        int TargetPointIndex,
        Pose SelfPos,
        Pose LastPoint,
        double L
    );

    void SetL( ConfigParams_t& ConfigParams, double CurrentVelocity )
    {
        double L = ConfigParams.K * CurrentVelocity;
        ConfigParams.L = L;
    };

    Status_t m_status;
    ConfigParams_t m_ConfigParams;
    PointsInfo_t CandidatePath_;


    Pose LineFollow( Pose a, Pose b, Pose SelfPos );



public:

    ConfigParams_t& GetConfigParams( void ){ return m_ConfigParams; };
    PointsInfo_t& GetCandidatePath( void ){ return CandidatePath_; };

    PurePursuit()
    {};

    void init
    (
        ros::NodeHandle& nh, 
        ros::NodeHandle& np, 
        dynamic_reconfigure::Server<PurePursuitConfig>& config, 
        dynamic_reconfigure::Server<PurePursuitConfig>::CallbackType& f
    );

    void Disable( void );
    void Enable( void );

    void Stop( void );

    void ReadCSV( PointsInfo_t& PointsInfo, std::string FileName );

    void SetCandidatePointsInfo( PointsInfo_t& PointsInfo, bool PathThrough );

    void Reset( void );

};

};


extern NITNC::PurePursuit purepursuit;