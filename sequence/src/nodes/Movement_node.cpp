#include <ros/ros.h>

#include "Movement.hpp"
#include "Instances.hpp"


int main( int argc, char** argv )
{
    using namespace NITNC;

    ros::init( argc, argv, "Sequence" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    tf2_ros::TransformBroadcaster TfBroadcaster;

    movement.Init( nh, np, TfBroadcaster );

    ros::spin();

}

