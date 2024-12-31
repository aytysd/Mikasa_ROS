#include <ros/ros.h>
#include "Serial.hpp"
#include "Instances.hpp"



int main( int argc, char** argv )
{
    using namespace NITNC;

    ros::init( argc, argv, "Serial" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    tf2_ros::TransformBroadcaster TfBroadcaster;

    diagnostic_updater::Updater updater;

    serial.Init( nh, np, TfBroadcaster, updater );

    ros::spin();
}
