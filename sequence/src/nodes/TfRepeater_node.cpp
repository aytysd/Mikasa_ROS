#include <ros/ros.h>

#include "TfRepeater.hpp"
#include "Instances.hpp"

int main( int argc, char** argv )
{
    using namespace NITNC;
    
    ros::init( argc, argv, "RepeatNode" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    tf2_ros::TransformBroadcaster TfBroadcaster;
    tf2_ros::StaticTransformBroadcaster StaticTfBroadcaster;

    tf_repeater.Init( nh, np, TfBroadcaster, StaticTfBroadcaster );

    ros::spin();
}

