#include "SwerveSteering.hpp"
#include "Instances.hpp"

namespace NITNC
{

void SwerveSteering::SteeringCheckCallback( const stm32interface::SingleUnderCarriageSteeringMD& msg )
{
    SteeringMD( msg.canid, msg.theta );
}

void SwerveSteering::DriveCheckCallback( const stm32interface::SingleUnderCarriageDriveMD& msg )
{
    DriveMD( msg.canid, msg.velocity * 1000 );
}

void SwerveSteering::DriveMD( uint8_t canid, double velocity )
{
    int16_t velocityInInt16 = static_cast<int16_t>( velocity );
    uint16_t velocityInUint16 = 0;

    uint8_t velocity_data[ 3 ] = { 0 };
    uint8_t direction;

    uint8_t InvertVelocity = 0;

    if( velocityInInt16 < 0 )
    {
        InvertVelocity = 0;
        velocityInUint16 = abs( velocityInInt16 );
    }
    else
    {
        InvertVelocity = 180;
        velocityInUint16 = velocityInInt16;
    }


    velocity_data[ 0 ] = ( InvertVelocity & 0xFF );
    velocity_data[ 1 ] = ( ( velocityInUint16 & 0b1111111 ) << 1 ) | ( ( InvertVelocity & 0b100000000 ) >> 8 );
    velocity_data[ 2 ] = ( velocityInUint16 & 0b111111110000000 ) >> 7;

    canusb.Transmit ( canid, 3, velocity_data );


}

void SwerveSteering::SteeringMD( uint8_t canid, double theta )
{
    uint16_t thetaInUint16 = static_cast<uint16_t>( RAD2DEG( theta ) );
        
    uint8_t velocity_data[ 3 ] = { 0 };
    uint8_t direction;


    velocity_data[ 0 ] = ( thetaInUint16 & 0xFF );
    velocity_data[ 1 ] = ( ( thetaInUint16 & 0b100000000 ) >> 8 );
    velocity_data[ 2 ] = 0;

    canusb.Transmit( canid, 3, velocity_data );

}

/**
 * @brief ステアを駆動する関数
 * 
 * @param msg コマンド，pure_pursuit::OutputCmdはマシンの姿勢角度，速度，回転速度，進みたい方向がラジアン, m/sの単位で内包している．
 */
void SwerveSteering::CommandCallback( const pure_pursuit::OutputCmd& msg )
{
    if( m_IsEnabled )
    {

        Forward( msg );

        ros::Duration duration( 0.001 );

        drive( 2, GetV1() );
        duration.sleep();
        
        drive( 3, GetV2() );
        duration.sleep();
        
        drive( 4, GetV3() );
        duration.sleep();

        drive( 5, GetV4() );
        duration.sleep();

        PublishSteeringOutputs
        (
            GetV1(),
            GetV2(),
            GetV3(),
            GetV4()
        );
    }

}

void SwerveSteering::drive( uint8_t canid, Vector2_t info )
{
    uint16_t velocityInUint16 = static_cast<uint16_t>( info.V );
    uint16_t thetaInUint16 = static_cast<uint16_t>( RAD2DEG( info.theta ) );

    uint8_t velocity_data[ 3 ] = { 0 };
    uint8_t direction;

    // direction = CW;

    // if (velocity < 0)        direction = CCW;
    // else if (velocity == 0)  direction = BRAKE;

    // uint32_t v = labs(velocity);
    // if (v > V_MAX)
    // {
    //     v = V_MAX;
    // }

    velocity_data[ 0 ] = ( thetaInUint16 & 0xFF );
    velocity_data[ 1 ] = ( ( velocityInUint16 & 0b1111111 ) << 1 ) | ( ( thetaInUint16 & 0b100000000 ) >> 8 );
    velocity_data[ 2 ] = ( velocityInUint16 & 0b111111110000000 ) >> 7;


    canusb.Transmit( canid, 3, velocity_data );

}

pure_pursuit::OutputCmd cmd;

void SwerveSteering::TestCallback( const stm32interface::Swerve_testConfig& config )
{

    cmd.AngularVelocity.data = config.angular_velocity;
    cmd.DirectionOfTravel.data = config.direction;
    cmd.Speed.data = config.velocity;
    // cmd.AttitudeAngle = 

    geometry_msgs::Pose2D SelfPos;
    // cmd.AttitudeAngle.data = SelfPos.theta;
    cmd.AttitudeAngle.data = 0;

    // CommandCallback( cmd );
}

void SwerveSteering::Init( ros::NodeHandle& nh, ros::NodeHandle& np, dynamic_reconfigure::Server<stm32interface::Swerve_testConfig>& server, dynamic_reconfigure::Server<stm32interface::Swerve_testConfig>::CallbackType& f )
{
    m_CommandSubscriber = nh.subscribe( "/OutputCmd", 10, &SwerveSteering::CommandCallback, this );

    m_SingleSteeringMDSubscriber = nh.subscribe( "/SwerveSteering/Steering", 10, &SwerveSteering::SteeringCheckCallback, this );
    m_SingleDriveMDSubscriber = nh.subscribe( "/SwerveSteering/Drive", 10, &SwerveSteering::DriveCheckCallback, this );

    MarkerPublisher::Init( nh, np );

    f = boost::bind( &SwerveSteering::TestCallback, this, _1 );
    server.setCallback( f );
}


void SwerveSteering::TestRepeat()
{
    ros::Rate loop_rate( 100 );

    while( ros::ok() )
    {
        CommandCallback( cmd );

        ros::spinOnce();
        loop_rate.sleep();
    }
}


}
