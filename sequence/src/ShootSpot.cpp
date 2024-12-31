#include "ShootSpot.hpp"

namespace NITNC
{
void ShootSpot::ExecuteCallback( const sequence::ShootSpotGoalConstPtr& goal )
{

    ros::Rate loop_rate( 10 );
    m_CurrentShootSpot = goal -> ShootSpot;
    m_f_AutoAiming = goal -> AutoAiming;

    m_p_nh -> setParam( "/shoot_spot_node/Active", true );

    if( !m_f_AutoAiming )
    {
        m_p_nh -> setParam( "/shoot_spot_node/ManualActive", true );
    }

    while( ros::ok() )
    {
        ROS_INFO( "ShootSpot!" );

        if( m_p_server -> isPreemptRequested() )
        {
            Exit();
            return;
        }

        Run();

        ros::spinOnce();
        loop_rate.sleep();
    }

    Exit();
}

void ShootSpot::Run( void )
{
    GetDynamicConfig( m_CurrentShootSpot );


    for( std::vector<ShootInfo*>::iterator itr = m_p_ShootInfos.begin(), itr_end = m_p_ShootInfos.end(); itr != itr_end; ++itr )
    {
        ShootInfo* M = *itr;

        if( M -> f_Enabled )
        {
            DriveMotorAndSendOutServo( *M );
            DriveElevationAngleMD( *M );
            DriveSteeringServo( *M );
        }
    }

    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo1 ) ] );
    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo2 ) ] );
    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo3 ) ] );

}

void ShootSpot::Exit( void )
{
    for( std::vector<ShootInfo*>::iterator itr = m_p_ShootInfos.begin(), itr_end = m_p_ShootInfos.end(); itr != itr_end; ++itr )
    {
        ShootInfo* M = *itr;
        DriveMotorAndSendOutServo( *M, true );
        DriveElevationAngleMD( *M, true, RUNNING );
        DriveSteeringServo( *M, true );
    }


    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo1 ) ] );
    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo2 ) ] );
    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo3 ) ] );

    m_p_nh -> setParam( "/shoot_spot_node/Active", false );

    m_p_server -> setPreempted();

}

void ShootSpot::StandByModeCallback( const std_msgs::Empty& )
{
    for( std::vector<ShootInfo*>::iterator itr = m_p_ShootInfos.begin(), itr_end = m_p_ShootInfos.end(); itr != itr_end; ++itr )
    {
        ShootInfo* M = *itr;
        DriveMotorAndSendOutServo( *M, true );
        DriveElevationAngleMD( *M, true, STANDBY );
        DriveSteeringServo( *M, true );
    }


    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo1 ) ] );
    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo2 ) ] );
    m_ServoPublisher.publish( m_Servo[ static_cast<uint8_t>( CAN2::Servo3 ) ] );

    m_p_nh -> setParam( "/shoot_spot_node/Active", false );

}

void ShootSpot::RunningModeCallback( const sequence::MovementCommand& )
{
    for( std::vector<ShootInfo*>::iterator itr = m_p_ShootInfos.begin(), itr_end = m_p_ShootInfos.end(); itr != itr_end; ++itr )
    {
        ShootInfo* M = *itr;
        DriveElevationAngleMD( *M, true, RUNNING );
    }

    m_p_nh -> setParam( "/shoot_spot_node/Active", false );

}


void ShootSpot::DriveSteeringServo( const ShootInfo& info, bool SetInDefaultAngle )
{

    double TargetAngle = GetTargetAngle( info.TFLinkName, info.GetTargetSpot() );

    uint8_t SteeringServoCANID = info.SteeringServoCANID;
    uint8_t SteeringServoTIM = ServoTIM[ info.SteeringServoTIM ];

    if( SetInDefaultAngle )
    {
        if( info.TFLinkName == "M0" )
        {
            m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = static_cast<uint8_t>( round ( RAD2DEG( static_cast<double>( M_PI / 4.0 ) ) ) );
        }
        else if
        ( 
            info.TFLinkName == "M3" ||
            info.TFLinkName == "M4" 
        )
        {
            m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = static_cast<uint8_t>( round ( RAD2DEG( static_cast<double>( M_PI / 2.0 ) ) ) );
        }
        else if( info.TFLinkName == "M2" )
        {
            m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = static_cast<uint8_t>( round ( RAD2DEG( static_cast<double>( ( 3.0 * M_PI ) / 4.0 ) ) ) );
        }
        else if( info.TFLinkName == "M1" )
        {
            m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = 0;
        }
    }
    else
    {
        if( m_f_AutoAiming )
        {
            if( info.TFLinkName == "M1" )
            {
                uint8_t data = pointFiveResolutionFormat( TargetAngle + info.GetSteeringDev() );
                m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = data;
            }
            else
            {
                m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = static_cast<uint8_t>( round( RAD2DEG( TargetAngle ) ) ) + static_cast<uint8_t>( round( RAD2DEG( info.GetSteeringDev() ) ) );
            }
            
        }
        else
        {

            TargetAngle = GetTargetAngle( "S" + std::to_string( m_CurrentShootSpot ), info.GetTargetSpot() );

            if( info.TFLinkName == "M1" )
            {
                uint8_t data = pointFiveResolutionFormat( TargetAngle + info.GetSteeringDev() );
                m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = data;
            }
            else
            {
                m_Servo[ SteeringServoCANID ].value[ SteeringServoTIM ] = static_cast<uint8_t>( round( RAD2DEG( info.GetSteeringDev() ) ) + RAD2DEG( TargetAngle ) );
            }
        }
    }
    
}

uint8_t ShootSpot::pointFiveResolutionFormat( double targetRadian )
{
    double angle = RAD2DEG( targetRadian );
    double relAngle =  angle - 90;
    double absRelAngle = abs( relAngle );
    uint8_t absRelIntAngle = static_cast<uint8_t>( absRelAngle );
    double decimal = absRelAngle - floor( absRelAngle );

    bool pointFive = false;

    if
    ( 
        decimal >= 0.25 &&
        decimal <= 0.75 
    )
    {
        pointFive = true;
    }

    bool minus = false;

    if( relAngle < 0 )
    {
        minus = true;
    }

    uint8_t data = ( minus << 7 | pointFive << 6 | absRelIntAngle );

    return data;
}

void ShootSpot::DriveMotorAndSendOutServo( const ShootInfo& info, bool ForceStop )
{    
    if( info.GetFire() && !ForceStop )
    {
        stm32interface::MD msg;

        msg.can_id = info.MD_CANID;
        msg.speed = info.GetVelocity();

        m_MechanismMDPublisher.publish( msg );

        uint8_t SendOutServoCANID = info.SendOutServoCANID;
        uint8_t SendOutServoTIM = ServoTIM[ info.SendOutServoTIM ];

        m_Servo[ SendOutServoCANID ].value[ SendOutServoTIM ] = CCW;

    }
    else
    {
        stm32interface::MD msg;

        msg.can_id = info.MD_CANID;
        msg.speed = 0;

        m_MechanismMDPublisher.publish( msg );

        uint8_t SendOutServoCANID = info.SendOutServoCANID;
        uint8_t SendOutServoTIM = ServoTIM[ info.SendOutServoTIM ];


        m_Servo[ SendOutServoCANID ].value[ SendOutServoTIM ] = STOP;

    }
}

void ShootSpot::DriveElevationAngleMD( const ShootInfo& M, bool SetInDefaultAngle, uint8_t DefaultAngle )
{

    if( M.Get_f_ShootDown() )
    {

    }
    else
    {
        uint8_t ElevationAngleMDCANID = M.ElevationAngleMDCANID;

        double TargetAngle = 0;

        if( SetInDefaultAngle )
        {
            if( M.TFLinkName == "M0" )
            {
                TargetAngle = static_cast<double>( DEG2RAD( static_cast<double>( DefaultAngle ) ) );
            }
            else if( M.TFLinkName == "M2" )
            {
                TargetAngle = static_cast<double>( DEG2RAD( static_cast<double>( DefaultAngle ) ) );
            }
        }
        else
        {
            TargetAngle = M.GetElevationAngle();
        }
        

        if
        ( 
            M.TFLinkName == "M0" ||
            M.TFLinkName == "M2"
        )
        {
            stm32interface::ElevationAngleMD msg;
            msg.canid = ElevationAngleMDCANID;
            msg.ElevationAngle = TargetAngle;

            m_ElevationAngleMDPublisher.publish( msg );
        }


    }

}


void ShootSpot::Save( void )
{

    bool sim = false;
    m_p_np -> getParam( "sim", sim );

    bool ManualControl = false;
    m_p_nh -> getParam( "/shoot_spot_node/ManualActive", ManualControl );

    if( sim || ManualControl )
    {

    }
    else
    {

        ROS_INFO( "save paramters" );

        std::string NewHistoryFolder = "";

        { // create folder
            std::string now = GetDatetimeStr();
            now += "/";
            NewHistoryFolder = "/home/ayato/catkin_ws/src/2022/sequence/config/history/" + now;
            boost::filesystem::create_directory( NewHistoryFolder.c_str() );
        }


        for( size_t i = 1; i <= 5; i++ )
        {
            std::string RosParamNamespace = "/shoot_spot_node/DynamicShootParam" + std::to_string( i );
            std::string DumpFileName = "/home/ayato/catkin_ws/src/2022/sequence/config/DynamicShootParam" + std::to_string( i ) + ".yaml";
            std::string command = "rosparam dump";
            command += " ";
            command += DumpFileName;
            command += " ";
            command += RosParamNamespace;
            system( command.c_str() );

        }

        {
            std::string BaseFolder = "/home/ayato/catkin_ws/src/2022/sequence/config/";

            for( size_t i = 1; i <= 5; i++ )
            {
                std::string destination = NewHistoryFolder + "DynamicShootParam" + std::to_string( i ) + ".yaml";
                std::string base = BaseFolder + "DynamicShootParam" + std::to_string( i ) + ".yaml";

                const std::string blank = " ";

                std::string command = "cp";
                command += blank;
                command += base;
                command += blank;
                command += destination;

                system( command.c_str() );
            }
        }



    }
}

void ShootSpot::shootSpotChangeCallback( const std_msgs::UInt8& msg )
{
    m_CurrentShootSpot = msg.data;
}


void ShootSpot::Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster )
{
    m_p_nh = &nh;
    m_p_np = &np;

    m_p_server = new Server( nh, "ShootSpot", boost::bind( &ShootSpot::ExecuteCallback, this, _1 ), false );
    m_p_server -> start();

    MyTF::Init
    (
        nh, 
        np,
        TfBroadcaster
    );


    {
        m_ServoPublisher = nh.advertise<stm32interface::Servo>( "/ServoCommand", 10 );
        m_MechanismMDPublisher = nh.advertise<stm32interface::MD>( "/MechanismMDCommand", 10 );
        m_ElevationAngleMDPublisher = nh.advertise<stm32interface::ElevationAngleMD>( "/ElevationAngleMD/Command", 10 );

        m_StandByModeSubscriber = nh.subscribe( "/shoot_spot_node/StandByRequest", 10, &ShootSpot::StandByModeCallback, this );
        m_RunningModeSubscriber = nh.subscribe( "/movement_command", 10, &ShootSpot::RunningModeCallback, this );

        m_ShootSpotChangeSubscriber = nh.subscribe( "/ManualControl/ActivateManualShootSpotServer", 10, &ShootSpot::shootSpotChangeCallback, this );
    }

    m_p_ShootInfos.push_back( &M0 );
    m_p_ShootInfos.push_back( &M1 );
    m_p_ShootInfos.push_back( &M2 );
    m_p_ShootInfos.push_back( &M3 );
    m_p_ShootInfos.push_back( &M4 );

    {
        m_Servo[ static_cast<uint8_t>( CAN2::Servo1 ) ] = *( new stm32interface::Servo() );
        m_Servo[ static_cast<uint8_t>( CAN2::Servo2 ) ] = *( new stm32interface::Servo() );
        m_Servo[ static_cast<uint8_t>( CAN2::Servo3 ) ] = *( new stm32interface::Servo() );

        m_Servo[ static_cast<uint8_t>( CAN2::Servo1 ) ].canid = static_cast<uint8_t>( CAN2::Servo1 );
        m_Servo[ static_cast<uint8_t>( CAN2::Servo2 ) ].canid = static_cast<uint8_t>( CAN2::Servo2 );
        m_Servo[ static_cast<uint8_t>( CAN2::Servo3 ) ].canid = static_cast<uint8_t>( CAN2::Servo3 );

        m_Servo[ static_cast<uint8_t>( CAN2::Servo1 ) ].value = { 90, 90, 90, 90, 90, 90 };
        m_Servo[ static_cast<uint8_t>( CAN2::Servo2 ) ].value = { 90, 90, 90, 90, 90, 90 };
        m_Servo[ static_cast<uint8_t>( CAN2::Servo3 ) ].value = { 90, 90, 90, 90, 90, 90 };
    }

    StaticConfig();

    m_p_nh -> setParam( "/shoot_spot_node/Active", false );
    m_p_nh -> setParam( "/shoot_spot_node/ManualActive", false );


}

void ShootSpot::GetDynamicConfig( uint8_t ShootPosition )
{

    for( std::vector<ShootInfo*>::iterator itr = m_p_ShootInfos.begin(), itr_end = m_p_ShootInfos.end(); itr != itr_end; ++itr )
    {
        ShootInfo* M = *itr;

        if( M -> f_Enabled )
        {
            bool fire = false;
            std::string where = "";

            m_p_np -> getParamCached( "DynamicShootParam/" + M -> TFLinkName + "/fire", fire );
            m_p_np -> getParamCached( "DynamicShootParam/" + M -> TFLinkName + "/where", where );

            M -> SetFire( fire );
            M -> SetTargetSpot( where );

            if( M -> Get_f_ShootDown() )
            {
                {
                    double SteeringDev = 0;
                    m_p_np -> getParamCached( "DynamicShootParam/" + M -> TFLinkName + "/SteeringDev", SteeringDev );
                    M -> SetSteeringDev( SteeringDev );
                }

                {
                    std::string CurrentShootSpotInString = std::to_string( m_CurrentShootSpot );

                    double velocity = 0;
                    m_p_np -> getParamCached( "DynamicShootParam" + CurrentShootSpotInString + "/" + M -> TFLinkName + "/" + M -> GetTargetSpot() + "/velocity", velocity );
                    M -> SetVelocity( velocity );
                }
            }
            else
            {
                std::string CurrentShootSpotInString = std::to_string( m_CurrentShootSpot );

                {

                    double Velocity = 0;
                    m_p_np -> getParamCached( "DynamicShootParam" + CurrentShootSpotInString + "/" + M -> TFLinkName + "/" + M -> GetTargetSpot() + "/velocity", Velocity );
                    M -> SetVelocity( Velocity );
                }

                {
                    double ElevationAngle = 0;

                    m_p_np -> getParamCached( "DynamicShootParam" + CurrentShootSpotInString + "/" + M -> TFLinkName + "/" + M -> GetTargetSpot() + "/ElevationAngle", ElevationAngle );
                    M -> SetElevationAngle( ElevationAngle );
                }

                {
                    double SteeringDev = 0;
                    m_p_np -> getParamCached( "DynamicShootParam" + CurrentShootSpotInString + "/" + M -> TFLinkName + "/" + M -> GetTargetSpot() + "/SteeringDev", SteeringDev );
                    M -> SetSteeringDev( SteeringDev );
                }

            }
        }
    }

}

void ShootSpot::StaticConfig( void )
{


    for( std::vector<ShootInfo*>::iterator itr = m_p_ShootInfos.begin(); itr != m_p_ShootInfos.end(); ++itr )
    {
        static int MNumber = 0;

        ShootInfo* M = *itr;

        M -> TFLinkName = GETVARNAME( *M );
        M -> TFLinkName.erase( 0, 1 );
        M -> TFLinkName += std::to_string( MNumber );

        GetStaticShootParam( *M );

        MNumber++;
    }

}


void ShootSpot::GetStaticShootParam( ShootInfo& info )
{
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/MD_CANID", info.MD_CANID );
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/ElevationAngleMDCANID", info.ElevationAngleMDCANID );   
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/SendOutServoCANID", info.SendOutServoCANID ); 
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/SendOutServoTIM", info.SendOutServoTIM ); 
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/SteeringServoCANID", info.SteeringServoCANID ); 
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/SteeringServoTIM", info.SteeringServoTIM ); 
    m_p_np -> getParamCached( "StaticShootParam/" + info.TFLinkName + "/Enabled", info.f_Enabled );
}


}
