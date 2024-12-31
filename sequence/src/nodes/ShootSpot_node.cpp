#include <ros/ros.h>

#include "ShootSpot.hpp"
#include "Instances.hpp"

int main( int argc, char** argv )
{
    using namespace NITNC;
    
    ros::init( argc, argv, "ShootSpot_node" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    tf2_ros::TransformBroadcaster TfBroadcaster;

    s.Init( nh, np, TfBroadcaster );

    ros::spin();

    s.Save();
}