#include <ros/ros.h>
#include <std_msgs/String.h>
#include <geometry_msgs/TransformStamped.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>
#include "tf/transform_datatypes.h"
#include <tf2_ros/transform_listener.h>
#include <nav_msgs/Path.h>
#include <visualization_msgs/Marker.h>
#include <geometry_msgs/PolygonStamped.h>
#include <geometry_msgs/Point32.h>
#include <dynamic_reconfigure/server.h>
#include <pure_pursuit/PurePursuitConfig.h>

#include "math.h"
#include <string>
#include <vector>
#include <algorithm>


#include "PurePursuit.hpp"
#include "PID.hpp"
#include "PurePursuitInterface.hpp"
#include "CallbackBase.hpp"

#include <pure_pursuit/OutputCmd.h>

NITNC::PurePursuit purepursuit;

namespace NITNC
{
void PurePursuit::ReconfigureCallback( pure_pursuit::PurePursuitConfig& config, uint32_t )
{
    m_ConfigParams.SpeedMultiplier = config.speed_multiplier;
    m_ConfigParams.K = config.max_l / config.speed_multiplier;

    SetPIDGain( config.rotate_p, config.rotate_i, 0 );
}

void PurePursuit::TimerCallback( const ros::TimerEvent& e )
{   

    static uint64_t StopSignalCount = 0;

    LookUpSelfPos( m_status.SelfPos );

    // PublishRobot( m_status.SelfPos );

    bool GUIEnabled = false;
    m_p_nh -> getParamCached( "/PurePursuit/Enabled", GUIEnabled );
    
    if( m_status.IsEnabled && GUIEnabled )
    {       
        StopSignalCount = 0;
        run( m_ConfigParams, m_status.SelfPos, CandidatePath_ );
    }
    else
    {
        StopSignalCount++;
        if( StopSignalCount < 3 )
        {
            PubCmd_.publish( *( new OutputCmd() ) );
            m_OutMsg = *( new OutputCmd() );
        }
    }
}


/**
* @brief Purepursuitを推論するメイン関数
* 
* @param ConfigParams 調整変数
* @param msg 自己位置コールバック関数のgeometry_msgs::Poseのやつ
* @param PointsInfo CSVファイルで読み取ったポイントの情報
*/
void PurePursuit::run( ConfigParams_t& ConfigParams, const Pose& msg, PointsInfo_t& PointsInfo )
{
   
    Pose SelfPos = m_status.SelfPos;
    
    SetL( ConfigParams, abs( m_status.CurrentSpeed ) );

    int NearestPointIndex = SearchNearestPoint( PointsInfo, SelfPos );
    int TargetPointIndex = SearchTargetPoint( PointsInfo, SelfPos, NearestPointIndex, ConfigParams.L );

    Pose TargetPoint =  PointsInfo[ TargetPointIndex ].Point;
    Pose NearestPoint = PointsInfo[ NearestPointIndex ].Point;

    CreateInstanceOfOutputCmd
    ( 
        m_OutMsg, 
        PointsInfo, 
        SelfPos, 
        NearestPointIndex, 
        TargetPointIndex, 
        PointsInfo.size() - 1, 
        ConfigParams, 
        false 
    );


    ActivateCallback( SelfPos, TargetPoint );

    StoreTrajectoryPath( SelfPos );

    static int count = 0;
    count++;
    if( count >= 9 )
    {
        PublishSpeed( m_status.CurrentSpeed );
        count = 0;
    }


    if( m_status.IsEnabled )
    {
        PubCmd_.publish( m_OutMsg );
    }
    else
    {
        PubCmd_.publish( *( new OutputCmd() ) );
    }


}


/**
* @brief 初期化関数．CSVファイルの読み取り．Paramの読み取り, 自作コールバック関数の登録などを行う
* 
* @param PointsInfo 
* @param ConfigParams 
*/
void PurePursuit::init( ros::NodeHandle& nh, ros::NodeHandle& np, dynamic_reconfigure::Server<pure_pursuit::PurePursuitConfig>& server, dynamic_reconfigure::Server<pure_pursuit::PurePursuitConfig>::CallbackType& f )
{
    m_p_nh = &nh;

    PubCmd_ = nh.advertise<OutputCmd>( "/OutputCmd", 10 );

    m_timer = nh.createTimer( ros::Duration( 1.0 / FPS ), &PurePursuit::TimerCallback, this );

    tf2_ros::TransformBroadcaster TfBroadcaster;
    tf2_ros::StaticTransformBroadcaster StaticTfBroadcaster;


    MarkerPublisher::Init( nh, np );
    MyTF::Init( nh, np, TfBroadcaster, StaticTfBroadcaster );

    f = boost::bind( &PurePursuit::ReconfigureCallback, this, _1, _2 );
    server.setCallback( f );

    PublishField();

    m_p_nh -> setParam( "/PurePursuit/Enabled", true );

    // np.param( "K", m_ConfigParams.K, 1.0 ); 
    np.param( "RotateP", m_ConfigParams.RotateP, 3.0 );
    np.param( "RotateI", m_ConfigParams.RotateI, 0.3 );
    np.param( "RotateD", m_ConfigParams.RotateD, 0.0 );
    np.param( "ApproachBeginningDistance", m_ConfigParams.ApproachBeginningDistance, 0.1 );


    AttitudeAnglePID::Init
    (
        m_ConfigParams.RotateP,
        m_ConfigParams.RotateI,
        m_ConfigParams.RotateD,
        1.57,
        1.57,
        0,
        0.0
    );



}


/**
* @brief 第一引数のPointsInfo_tで与えられた点群の中で自己位置と最短距離にあるインデックスを返す
* 
* @param PointsInfo 
* @param SelfPos 
* @return int 
*/
int PurePursuit::SearchNearestPoint( const PointsInfo_t& PointsInfo, const Pose SelfPos )
{
    std::vector<double> Distances;

    for( int i = 0; i < PointsInfo.size(); i++ )
    {
        Distances.push_back( PositionalRelation::GetDistance( SelfPos, PointsInfo[ i ].Point ) );
    }

    std::vector<double>::iterator iter = std::min_element( Distances.begin(), Distances.end() );
    size_t NearestPoint = std::distance( Distances.begin(), iter );


    return NearestPoint;

}

/**
* @brief 自己位置からLだけ離れた距離にある最も近い点のインデックスを返す
* 
* @param PointsInfo 
* @param SelfPos 
* @param NearestIndex 
* @param L 
* @return int 
*/
int PurePursuit::SearchTargetPoint( const PointsInfo_t& PointsInfo, const Pose SelfPos, int NearestPointIndex, double L )
{

    std::vector<int> Index;
    std::vector<double> DevDistancesL;

    for( int i = NearestPointIndex + 1; i < PointsInfo.size(); i++ )
    {
        if( ( PositionalRelation::GetDistance( SelfPos, PointsInfo[ i ].Point ) - L  ) > 0 )
        {
            DevDistancesL.push_back( PositionalRelation::GetDistance( SelfPos, PointsInfo[ i ].Point ) - L );
            Index.push_back( i );
        }
    }

    if( DevDistancesL.size() == 0 )
    {
        for( int i = NearestPointIndex + 1; i < PointsInfo.size(); i++ )
        {
            DevDistancesL.push_back( abs( PositionalRelation::GetDistance( SelfPos, PointsInfo[ i ].Point ) - L ) );
            Index.push_back( i );
        }
    }

    if( DevDistancesL.size() == 0 )
        return NearestPointIndex;


    std::vector<double>::iterator min = std::min_element( DevDistancesL.begin(), DevDistancesL.end() );
    size_t TargetPointIndexBuff = std::distance( DevDistancesL.begin(), min );

    size_t TargetPointIndex = Index[ TargetPointIndexBuff ];

    return TargetPointIndex;
}


/**
* @brief 指定のCSVファイルを読むやつ．NumReadで読み出す行数を指定する．
* 
* @param PointsInfo 
* @param NumRead 
*/

void PurePursuit::ReadCSV( PointsInfo_t& PointsInfo, std::string FileName )
{
    std::string FilePath = "/home/ayato/catkin_ws/src/2022/pure_pursuit/csv/";
    FilePath += FileName;

    std::ifstream ifs( FilePath );

    std::string line;
    getline( ifs, line );

    nav_msgs::Path IdealPath;
    IdealPath.header.frame_id = "map";
    IdealPath.header.stamp = ros::Time::now();

    while ( getline( ifs, line ) )
    {
        PointInfo_t PointInfo;

        std::vector<std::string> strvec = split(line, ',');
        
        try
        {
            geometry_msgs::PoseStamped PoseStamped;
            Pose point;

            PoseStamped.pose.position.x = point.x = stof( strvec[ 0 ] );
            PoseStamped.pose.position.y = point.y = stof( strvec[ 1 ] );
            point.theta = stof( strvec[ 2 ] );

            

            if( point.theta < 0 )
                point.theta += 2 * M_PI;


            PointInfo.Point = point;
            PointInfo.Speed = stof( strvec[ 3 ] ) * m_ConfigParams.SpeedMultiplier;


            PointsInfo.push_back( PointInfo );
            IdealPath.poses.push_back( PoseStamped );



        }
        catch(const std::invalid_argument& e)
        {

        }
        
        PublishIdealPath( IdealPath );

    }

}

/**
* @brief 下記の情報を受け，Instanceに実際にROS_msgとして出力するための実態を代入する
* 
* @param instance 
* @param SelfPos 
* @param NearestPoint 
* @param TargetPoint 
* @param speed 
* @param ConfigParams 
*/
void PurePursuit::CreateInstanceOfOutputCmd( OutputCmd& instance, PointsInfo_t& Points, Pose SelfPos, int NearestPointIndex, int TargetPointIndex, int LastPointIndex, const ConfigParams_t& ConfigParams, bool PathThrough )
{


    Pose TargetPoint = GetTargetPointBasedOnSelfPos
    (
        Points,
        TargetPointIndex,
        SelfPos,
        Points[ LastPointIndex ].Point,
        ConfigParams.L
    );

    // if
    // ( 
    //     TargetPoint.x == SelfPos.x &&
    //     TargetPoint.y == SelfPos.y
    // )
    // {
    //     TargetPoint = GetTargetPointBasedOnNearestPoint
    //     (
    //         Points,
    //         TargetPointIndex,
    //         Points[ NearestPointIndex ].Point,
    //         Points[ LastPointIndex ].Point,
    //         ConfigParams.L
    //     );
    // }


    double TargetDegree;
    double speed = Points[ NearestPointIndex ].Speed;
    TargetDegree = PositionalRelation::GetDirectionFromPoints( SelfPos, TargetPoint );


    PublishTargetPoint( TargetPoint );
    PublishL( SelfPos, ConfigParams.L );

    double AngularVelocity = PositionalRelation::GetNarrowestRad( SelfPos.theta, Points[ NearestPointIndex ].Point.theta );
    AngularVelocity = compute( 0, AngularVelocity, speed );


    if( PathThrough == false )
    {
        if
        ( 
            ConfigParams.ApproachBeginningDistance > PositionalRelation::GetDistance( SelfPos, Points[ LastPointIndex ].Point ) ||
            m_status.IsApproaching == true
        )
        {
            TargetDegree = PositionalRelation::GetDirectionFromPoints( SelfPos, Points[ LastPointIndex ].Point );
            m_status.IsApproaching = true;


            if( PurePursuitCallback::GetAttitudeAngleTolerance() > abs( PositionalRelation::GetNarrowestRad( SelfPos.theta, Points[ LastPointIndex ].Point.theta ) ) )
            {
                AngularVelocity = 0;
            }

        }
    }

    if( PurePursuitCallback::GetApproachTolerance() > PositionalRelation::GetDistance( SelfPos, Points[ LastPointIndex ].Point ) )
    {
        speed = 0;
    }



    instance.DirectionOfTravel.data = TargetDegree;
    m_status.CurrentSpeed = instance.Speed.data = speed;
    instance.AngularVelocity.data = AngularVelocity;
    instance.AttitudeAngle.data = SelfPos.theta;

    
}

Pose PurePursuit::GetTargetPointBasedOnNearestPoint( const PointsInfo_t& Points, int TargetPointIndex, Pose NearestPoint, Pose LastPoint, double L )
{
    std::vector<double> x_candidates;

    double x_t = Points[ TargetPointIndex ].Point.x - NearestPoint.x;
    double y_t = Points[ TargetPointIndex ].Point.y - NearestPoint.y;

    Pose t;
    t.x = x_t;
    t.y = y_t;

    double x_p = Points[ TargetPointIndex - 1 ].Point.x - NearestPoint.x;
    double y_p = Points[ TargetPointIndex - 1 ].Point.y - NearestPoint.y;

    Pose p;
    p.x = x_p;
    p.y = y_p;

    double alpha_upper = y_t - y_p;
    double alpha_lower = x_t - x_p;

    if( alpha_lower == 0 )
    {
        return Points[ TargetPointIndex ].Point;
    }

    double alpha = alpha_upper / alpha_lower;

    CalcQuadraticEquation
    (
        x_candidates,
        1 + pow( alpha, 2 ),
        -2 * pow( alpha, 2 ) * x_t + 2 * y_t * alpha,
        pow( alpha, 2 ) * pow( x_t, 2 ) - 2 * y_t * alpha * x_t + pow( y_t, 2 ) - pow( L, 2 )
    );


    Pose TargetPoint;

    if( x_candidates.size() == 1 )
    {
        TargetPoint.x =  x_candidates[ 0 ];
        TargetPoint.y = alpha * ( TargetPoint.x - x_t ) + y_t;

    }
    else if( x_candidates.size() == 2 )
    {
        Pose Candidate1;
        Pose Candidate2;

        Candidate1.x = x_candidates[ 0 ];
        Candidate1.y = alpha * ( Candidate1.x - x_t ) + y_t;

        Candidate2.x = x_candidates[ 1 ];
        Candidate2.y = alpha * ( Candidate2.x - x_t ) + y_t;

        Pose TargetSubNearest;
        TargetSubNearest.x = Points[ TargetPointIndex ].Point.x - NearestPoint.x;
        TargetSubNearest.y = Points[ TargetPointIndex ].Point.y - NearestPoint.y;

        if
        (
            PositionalRelation::GetDistance( Candidate1, TargetSubNearest ) <
            PositionalRelation::GetDistance( Candidate2, TargetSubNearest )
        )
        {
            TargetPoint = Candidate1;
        }
        else
        {
            TargetPoint = Candidate2;
        }

    }
    else
    {   
        return Points[ TargetPointIndex ].Point;
    }

    TargetPoint.x += NearestPoint.x;
    TargetPoint.y += NearestPoint.y;

    return TargetPoint;

}

Pose PurePursuit::GetTargetPointBasedOnSelfPos( const PointsInfo_t& Points, int TargetPointIndex, Pose SelfPos, Pose LastPoint, double L )
{
    std::vector<double> x_candidates;

    double x_t = Points[ TargetPointIndex ].Point.x - SelfPos.x;
    double y_t = Points[ TargetPointIndex ].Point.y - SelfPos.y;

    Pose t;
    t.x = x_t;
    t.y = y_t;

    double x_p = Points[ TargetPointIndex - 1 ].Point.x - SelfPos.x;
    double y_p = Points[ TargetPointIndex - 1 ].Point.y - SelfPos.y;

    Pose p;
    p.x = x_p;
    p.y = y_p;

    double alpha_upper = y_t - y_p;
    double alpha_lower = x_t - x_p;

    Pose TargetPoint;

    if( alpha_lower == 0 )
    {
        return Points[ TargetPointIndex ].Point;
    }

    double alpha = alpha_upper / alpha_lower;

    CalcQuadraticEquation
    (
        x_candidates,
        1 + pow( alpha, 2 ),
        -2 * pow( alpha, 2 ) * x_t + 2 * y_t * alpha,
        pow( alpha, 2 ) * pow( x_t, 2 ) - 2 * y_t * alpha * x_t + pow( y_t, 2 ) - pow( L, 2 )
    );



    if( x_candidates.size() == 1 )
    {
        TargetPoint.x =  x_candidates[ 0 ];
        TargetPoint.y = alpha * ( TargetPoint.x - x_t ) + y_t;

    }
    else if( x_candidates.size() == 2 )
    {
        Pose Candidate1;
        Pose Candidate2;

        Candidate1.x = x_candidates[ 0 ];
        Candidate1.y = alpha * ( Candidate1.x - x_t ) + y_t;

        Candidate2.x = x_candidates[ 1 ];
        Candidate2.y = alpha * ( Candidate2.x - x_t ) + y_t;

        Pose TargetSubSelf;
        TargetSubSelf.x = Points[ TargetPointIndex ].Point.x - SelfPos.x;
        TargetSubSelf.y = Points[ TargetPointIndex ].Point.y - SelfPos.y;

        if
        (
            PositionalRelation::GetDistance( Candidate1, TargetSubSelf ) <
            PositionalRelation::GetDistance( Candidate2, TargetSubSelf )
        )
        {
            TargetPoint = Candidate1;
        }
        else
        {
            TargetPoint = Candidate2;
        }

    }
    else
    {
        
        TargetPoint.x = Points[ TargetPointIndex ].Point.x - SelfPos.x;
        TargetPoint.y = Points[ TargetPointIndex ].Point.y - SelfPos.y;

    }

    TargetPoint.x += SelfPos.x;
    TargetPoint.y += SelfPos.y;

    return TargetPoint;

}


Pose PurePursuit::LineFollow( Pose a, Pose b, Pose SelfPos )
{
    double x_a = a.x - SelfPos.x;
    double y_a = a.y - SelfPos.y;

    double x_b = b.x - SelfPos.x;
    double y_b = b.y - SelfPos.y;

    double alpha_upper = y_b - y_a;
    double alpha_lower = x_b - x_a;

    if( alpha_lower == 0 )
    {
        alpha_lower = 0.000000000001;
    }

    double alpha = alpha_upper / alpha_lower;

    double x_lower = alpha + 1 / alpha;
    double x_upper = alpha * x_a - y_a;

    double x_c = x_upper / x_lower;
    double y_c = alpha * ( x_c - x_a ) + y_a;

    double x_d = x_c + x_b;
    double y_d = y_c + y_b;

    Pose TargetPoint;
    TargetPoint.x = x_d;
    TargetPoint.y = y_d;

    return TargetPoint;
}


void PurePursuit::Enable( void )
{
    m_status.IsEnabled = true;
    m_timer.start();
}

void PurePursuit::Disable( void )
{
    m_status.IsEnabled = false;
    m_timer.stop();
    Stop();

}

void PurePursuit::Stop( void )
{
    for( int i = 0; i < 10; i++ )
    {
        PubCmd_.publish( *( new pure_pursuit::OutputCmd() ) );
    }

}


void PurePursuit::Reset( void )
{
    CandidatePath_.clear();
    ResetCallbacks();

    m_status.CurrentSpeed = 0;

    m_timer.stop();

    m_status.IsApproaching = false;

    ResetIntegral();

}

}

