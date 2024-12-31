#include <ros/ros.h>

#include "Instances.hpp"


int main( int argc, char** argv )
{
    using namespace NITNC;

    ros::init( argc, argv, "ElevationAngleMirroring_node" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    elevation_angle_mirroring.Init( nh, np );
    elevation_angle_mirroring.Execute();
    
}