#include <ros/ros.h>
#include <dynamic_reconfigure/server.h>

#include "Instances.hpp"
#include "CANUSB.hpp"


int main(int argc, char **argv)
{
    using namespace NITNC;

    ros::init( argc, argv, "CAN1" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    dynamic_reconfigure::Server<stm32interface::Swerve_testConfig> server_swerve;
    dynamic_reconfigure::Server<stm32interface::Swerve_testConfig>::CallbackType f_swerve;

    diagnostic_updater::Updater updater;

    tf2_ros::TransformBroadcaster TfBroadcaster;
    tf2_ros::StaticTransformBroadcaster StaticTfBroadcaster;

    canusb.Init( nh, np, updater );
    main_circuit.Init( nh, np );
    swerve_steering.Init( nh, np, server_swerve, f_swerve );
    controller.Init( nh, np, TfBroadcaster, StaticTfBroadcaster );

    // swerve_steering.TestRepeat();

    ros::spin();
}


