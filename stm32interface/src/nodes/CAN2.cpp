#include <ros/ros.h>
#include <dynamic_reconfigure/server.h>
#include <stm32interface/SingleShootConfig.h>

#include "CANUSB.hpp"
#include "Instances.hpp"


int main(int argc, char **argv)
{
    using namespace NITNC;

    ros::init( argc, argv, "CAN2" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    diagnostic_updater::Updater updater;

    canusb.Init( nh, np, updater );    
    main_circuit.Init( nh, np );
    servo.Init( nh, np );
    tapeled.Init( nh, np );
    mechanism_md.Init( nh, np );
    elevation_angle_md.Init( nh, np );

    // ros::Rate loop_rate( 5 );

    // while( ros::ok() )
    // {
    //     stm32interface::Servo servo_msg;
    //     servo_msg.canid = 1;
    //     servo_msg.value.push_back( 45 );
    //     servo_msg.value.push_back( 90 );
    //     servo_msg.value.push_back( 45 );
    //     servo_msg.value.push_back( 90 );

    //     servo.ForwardCallback( servo_msg );

    //     loop_rate.sleep();
    //     ros::spinOnce();

    //     // stm32interface::MD md_msg;
    //     // md_msg.can_id = 8;
    //     // md_msg.speed = 3;

    //     // mechanism_md.ForwardCallback( md_msg );

    // }


    ros::spin();
}


