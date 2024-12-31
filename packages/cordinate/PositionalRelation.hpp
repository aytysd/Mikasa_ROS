#pragma once

#include <geometry_msgs/Pose2D.h>
#include <geometry_msgs/TransformStamped.h>

namespace NITNC
{
class PositionalRelation
{
public:

    static double GetDistance( const geometry_msgs::TransformStamped tf );
    static double GetDistance( const geometry_msgs::Pose2D a, const geometry_msgs::Pose2D b );
    static double GetNarrowestRad( double a, double b );

    static double GetDirectionFromPoints( geometry_msgs::Pose2D base, geometry_msgs::Pose2D target, bool IsAbsolute = true );

};
};