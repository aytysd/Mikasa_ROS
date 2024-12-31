#include "Conversion.hpp"


namespace NITNC
{

geometry_msgs::Point32 Conversion::Polar2Rectangular( const Pose base, double radius, double theta )
{
    geometry_msgs::Point32 point;
    point.x = radius * cos( theta ) + base.x;
    point.y = radius * sin( theta ) + base.y;
    return point;
}

float Conversion::IEEE2Float( uint32_t floatingToIntValue )
{
    float *pf, f;
    pf = ( float* )&(floatingToIntValue);
    f = *pf;

    return f;
}
}