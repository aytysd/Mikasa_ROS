#include "PositionalRelation.hpp"


namespace NITNC
{

double PositionalRelation::GetDistance( const geometry_msgs::TransformStamped tf )
{
    double XDev = abs( tf.transform.translation.x );
    double YDev = abs( tf.transform.translation.y );

    double Distance = 
        sqrt
        (
            pow( XDev, 2 ) +
            pow( YDev, 2 )
        );

    return Distance;
}


/**
* @brief ２点間の距離を求める関数
* 
* @param a 
* @param b 
* @return double [m]
*/
double PositionalRelation::GetDistance( const geometry_msgs::Pose2D a, const geometry_msgs::Pose2D b )
{
    double XDev = abs( a.x - b.x );
    double YDev = abs( a.y - b.y );

    double Distance = 
        sqrt
        (
            pow( XDev, 2 ) +
            pow( YDev, 2 )
        );

    return Distance;
}

/**
* @brief ２つの角度の最小誤差を求める．左がマイナス（かな）右がプラス                                                                                                                                                                                                                                                                                                                                                                                           
* 
* @param Base 
* @param Target 
* @return double [rad]
*/
double PositionalRelation::GetNarrowestRad( double Base, double Target )
{
    double Dev1 = abs( Target - Base );
    double Dev2 = 2 * M_PI - Dev1;

    if( Dev1 > Dev2 )
    {
        double TargetSubBase = Target - Base;

        while( TargetSubBase < 0 )
        {
            TargetSubBase += 2 * M_PI;
        }

        if( TargetSubBase > M_PI )
        {
            return ( -1 ) *Dev2;
        }
        else
        {
            return Dev2;
        }

    }
    else
    {
        double TargetSubBase = Target - Base;

        while( TargetSubBase < 0 )
        {
            TargetSubBase += 2 * M_PI;
        }

        if( TargetSubBase > M_PI )
        {
            return ( -1 ) * Dev1;
        }
        else
        {
            return Dev1;
        }

    }
}

/**
* @brief 2点の方角を求める．baseから見たTargetの値を返す
* 
* @param base 
* @param target 
* @param IsAbsolute 絶対角度かどうか．Trueなら0-360. Falseなら-180 - 180
* @return double [rad]
*/
double PositionalRelation::GetDirectionFromPoints( geometry_msgs::Pose2D base, geometry_msgs::Pose2D target, bool IsAbsolute )
{
    double x_diff = target.x - base.x;
    double y_diff = target.y - base.y;

    if( x_diff == 0 )
        x_diff = 0.0001;

    double TargetDegree = atan( y_diff / x_diff );

    if( y_diff >= 0 )
    {
        if( !( x_diff >= 0 ) )
            TargetDegree += M_PI;
    }
    else
    {
        if( !( x_diff >= 0 ) )
            TargetDegree += M_PI;
    }

    if( IsAbsolute == true )
        return TargetDegree;
    else
    {
        if( TargetDegree > M_PI )
        {
            TargetDegree -= 2 * M_PI;
        }
        return TargetDegree;
    }

}



}
