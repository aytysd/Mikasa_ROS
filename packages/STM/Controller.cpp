#include "Controller.hpp"
#include "Instances.hpp"

namespace NITNC
{
    
void Controller::JoyCallback( const stm32interface::ManualControl& msg )
{
    // swerve_steering.Disable();

    bool Enabled = false;
    m_p_nh -> getParamCached( "/ManualControl/Enabled", Enabled );

    if( Enabled )
    {
        double V = sqrt( pow( msg.Vx, 2 ) + pow( msg.Vy, 2 ) ) * speed_limit;
        double theta = atan2( msg.Vy, msg.Vx );

        pure_pursuit::OutputCmd cmd;

        double AngularVelocity= msg.TargetAttitudeAngle * 0.5;

        cmd.DirectionOfTravel.data = theta;
        cmd.Speed.data = V;
        cmd.AttitudeAngle.data = 0;
        cmd.AngularVelocity.data = AngularVelocity;

        CommandCallback( cmd );



    }
    else
    {

    }

}

void Controller::ShootSpotActivationCallback( const std_msgs::UInt8& msg )
{
    m_p_ShootSpotClient -> cancelAllGoals();

    // bool red_zone = false;
    // m_p_nh -> getParam( "red_zone", red_zone );

    // uint8_t shoot_spot = 1;

    // if( red_zone )
    // {
    //     shoot_spot = 1;
    // }
    // else
    // {
    //     shoot_spot = 5;
    // }

    sequence::ShootSpotGoal goal;

    goal.AutoAiming = false;
    goal.ShootSpot = msg.data;
    m_p_nh -> setParam( "/CurrentShootSpot", msg.data );

    m_p_ShootSpotClient -> sendGoal( goal );


}


void Controller::Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster, tf2_ros::StaticTransformBroadcaster& StaticTfBroadcaster )
{
    m_p_nh = &nh;
    m_p_np = &np;

    m_JoySubscriber = nh.subscribe( "/ManualControl", 10, &Controller::JoyCallback, this );
    m_ShootSpotServerActivateSubscriber = nh.subscribe( "/ManualControl/ActivateShootSpot", 10, &Controller::ShootSpotActivationCallback, this );

    m_p_ShootSpotClient = new ShootSpotClient( "ShootSpot", true );

    MyTF::Init( nh, np, TfBroadcaster, StaticTfBroadcaster );

    np.param( "speed_limit", speed_limit, 2.0 );

    m_p_nh -> setParam( "/ManualControl/Enabled", false );

    // bool MaintenanceMode = false;
    // m_p_np -> getParam( "Maintenance", MaintenanceMode );

    // if( MaintenanceMode )
    // {

    // }
    // else
    // {
    //     ROS_INFO("Waiting for ShootSpot server to start.");
    //     m_p_ShootSpotClient -> waitForServer();
    //     ROS_INFO("ShootSpot server started.");
    // }


}

void Controller::CommandCallback( const pure_pursuit::OutputCmd& msg )
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


}


}
