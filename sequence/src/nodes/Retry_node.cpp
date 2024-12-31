#include "Instances.hpp"


int main( int argc, char** argv )
{
    using namespace NITNC;

    ros::init( argc, argv, "Retry_node" );

    ros::NodeHandle nh;
    ros::NodeHandle np( "~" );

    retry.Init( nh, np );

    ros::spin();
}