#pragma once

#include <ros/ros.h>
#include <std_msgs/Float32.h>

namespace NITNC
{

class PurePursuitLog
{
private:

    ros::Publisher m_PubRotateP;
    ros::Publisher m_PubRotateI;


public:

    PurePursuitLog(){};
    ~PurePursuitLog(){};

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
};

};