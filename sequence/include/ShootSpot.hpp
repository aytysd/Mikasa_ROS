
#pragma once

#include <ros/ros.h>
#include <geometry_msgs/Pose2D.h>
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
#include <actionlib/server/simple_action_server.h>
#include <sequence/ShootSpotGoal.h>
#include <geometry_msgs/Vector3.h>
// #include <sequence/ShootSpot
#include <stm32interface/MD.h>
#include <stm32interface/Servo.h>
#include <std_msgs/Empty.h>
#include <sequence/ShootSpotConfig.h>
#include <sequence/ShootCommand.h>
#include <sequence/ShootDownCommand.h>
#include <sequence/MovementCommand.h>
#include <stm32interface/ElevationAngleMD.h>
#include <std_msgs/UInt8.h>

#include <fstream>
#include <string>
#include <sstream>
#include <vector>
#include <map>
#include <stdio.h>
#include <filesystem>
#include <sys/stat.h>
#include <array>
#include <boost/filesystem.hpp>

#include "Movement.hpp"
#include "Conversion.hpp"
#include "CharacterManipulation.hpp"
#include "DataFormat.hpp"
#include "ShootSpotDef.hpp"
#include "MyTF.hpp"
#include "CANID.hpp"

namespace NITNC
{

#define STOP 90
#define CCW 180

namespace ELEV_ANGLE
{
    #define RUNNING 30.0
    #define STANDBY 30.0
};

class ShootSpot : public CharacterManipulation, public MyTF
{
private:

    ros::NodeHandle* m_p_nh;
    ros::NodeHandle* m_p_np;

    ros::Publisher m_ServoPublisher;
    ros::Publisher m_MechanismMDPublisher;
    ros::Publisher m_ElevationAngleMDPublisher;

    ros::Subscriber m_StandByModeSubscriber;
    ros::Subscriber m_RunningModeSubscriber;

    ros::Subscriber m_ShootSpotChangeSubscriber;
    
    Server* m_p_server;


    ShootInfo M0 = *( new ShootInfo( false ) );
    ShootInfo M1 = *( new ShootInfo( false ) );
    ShootInfo M2 = *( new ShootInfo( false ) );
    ShootInfo M3 = *( new ShootInfo( true ) );
    ShootInfo M4 = *( new ShootInfo( true ) );

    std::vector<ShootInfo*> m_p_ShootInfos;

    std::map<uint8_t, stm32interface::Servo> m_Servo;

    uint8_t m_CurrentShootSpot = 1;

    bool m_f_AutoAiming = false;

    void ExecuteCallback( const sequence::ShootSpotGoalConstPtr& goal );
    void StandByModeCallback( const std_msgs::Empty& e );
    void RunningModeCallback( const sequence::MovementCommand& msg );

    void StaticConfig( void );

    void GetDynamicConfig( uint8_t ShootPosition );
    void GetStaticShootParam( ShootInfo& info );
    
    void DriveMotorAndSendOutServo( const ShootInfo& info, bool ForceStop = false );
    void DriveElevationAngleMD( const ShootInfo& M, bool SetInDefaultAngle = false, uint8_t DefaultAngle = 0 );
    void DriveSteeringServo( const ShootInfo& info, bool SetInDefaultAngle = false );

    uint8_t pointFiveResolutionFormat( double targetRadian );

    void shootSpotChangeCallback( const std_msgs::UInt8& msg );

public:


    void Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster );

    void Run( void );
    void Exit( void );

    void Save( void );
};

};

