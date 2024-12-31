#pragma once

#include <ros/ros.h>
#include <geometry_msgs/Point32.h>
#include <geometry_msgs/Pose2D.h>

#include "math.h"
#include <bitset>

namespace NITNC
{
#define RAD2DEG( x ) ( ( double )180.0 * ( double )x / ( double )M_PI )
#define DEG2RAD( x ) ( ( double )M_PI * ( double )x / ( double )180.0 )
#define PLUSMINUS( x ) ( ( x < 0 )? 1 : 0 )
#define NUM_BIT 32

using Pose = geometry_msgs::Pose2D;

class Conversion
{
private:

public:
    static float IEEE2Float( uint32_t floatingToIntValue );
    geometry_msgs::Point32 Polar2Rectangular( const Pose base, double radius, double theta );

};
};
