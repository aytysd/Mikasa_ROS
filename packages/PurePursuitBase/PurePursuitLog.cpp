#include "PurePursuitLog.hpp"


namespace NITNC
{

void PurePursuitLog::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_PubRotateP = nh.advertise<std_msgs::Float32>( "/PurePursuitRotateP", 10 );
    m_PubRotateI = nh.advertise<std_msgs::Float32>( "/PurePursuitRotateI", 10 );

}

}