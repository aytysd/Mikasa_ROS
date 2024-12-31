#include <ros/ros.h>
#include <dynamic_reconfigure/server.h>
#include <pure_pursuit/PurePursuitConfig.h>

#include "PurePursuit.hpp"
#include "PurePursuitInterface.hpp"

int main( int argc, char** argv )
{

    ros::init( argc, argv, "PurePursuit_node" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    dynamic_reconfigure::Server<pure_pursuit::PurePursuitConfig> server;
    dynamic_reconfigure::Server<pure_pursuit::PurePursuitConfig>::CallbackType f;


    purepursuit.init( nh, np, server, f );
    pure_pursuit_interface.init( nh, np );

    ros::spin();

}
