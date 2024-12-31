#include "SwerveSteeringEquation.hpp"

namespace NITNC
{

void SwerveSteeringEquation::Forward( const pure_pursuit::OutputCmd& msg )
{

#if INVERTOUTPUT
    double Vx = msg.Speed.data * ( -1 ) * cos( msg.DirectionOfTravel.data - msg.AttitudeAngle.data );//速度のｘ方向
    double Vy = msg.Speed.data * ( -1 ) * sin( msg.DirectionOfTravel.data - msg.AttitudeAngle.data );//速度のｙ方向

    double Omega_r = R * ( -1 ) * msg.AngularVelocity.data;//車体の長さと速度の積
#else

    double Vx = msg.Speed.data * cos( msg.DirectionOfTravel.data - msg.AttitudeAngle.data );//速度のｘ方向
    double Vy = msg.Speed.data * sin( msg.DirectionOfTravel.data - msg.AttitudeAngle.data );//速度のｙ方向

    double Omega_r = R * msg.AngularVelocity.data;//車体の長さと速度の積

#endif


    m_V1.Vx = Omega_r * cos( 0.5222 ) + Vx;
    m_V1.Vy = Omega_r * sin( 0.5222 ) + Vy;

    m_V2.Vx = Omega_r * cos( 2.35898 ) + Vx;
    m_V2.Vy = Omega_r * sin( 2.35898 ) + Vy;

    m_V3.Vx = Omega_r * cos( 3.98633 ) + Vx;
    m_V3.Vy = Omega_r * sin( 3.98633 ) + Vy;

    m_V4.Vx = Omega_r * cos( 5.7732 ) + Vx;
    m_V4.Vy = Omega_r * sin( 5.7732 ) + Vy;

    m_V1.V = sqrt( pow( m_V1.Vx, 2 ) + pow( m_V1.Vy, 2 ) );//V1の速度
    m_V1.theta = std::atan2( m_V1.Vy, m_V1.Vx );//V1の方向

    m_V2.V = sqrt( pow( m_V2.Vx, 2 ) + pow( m_V2.Vy, 2 ) );
    m_V2.theta = std::atan2( m_V2.Vy, m_V2.Vx );

    m_V3.V = sqrt( pow( m_V3.Vx, 2 ) + pow( m_V3.Vy, 2 ) );
    m_V3.theta = std::atan2( m_V3.Vy, m_V3.Vx );

    m_V4.V = sqrt( pow( m_V4.Vx, 2 ) + pow( m_V4.Vy, 2 ) );
    m_V4.theta = std::atan2( m_V4.Vy, m_V4.Vx );

    while( m_V1.theta < 0 )
        m_V1.theta += 2 * M_PI;

    while( m_V2.theta < 0 )
        m_V2.theta += 2 * M_PI;

    while( m_V3.theta < 0 )
        m_V3.theta += 2 * M_PI;

    while( m_V4.theta < 0 )
        m_V4.theta += 2 * M_PI;


    m_V1.V *= 1000.0;//速度をmm/sに変換   
    m_V2.V *= 1000.0;//速度をmm/sに変換   
    m_V3.V *= 1000.0;//速度をmm/sに変換   
    m_V4.V *= 1000.0;//速度をmm/sに変換  


    if( msg.Speed.data == 0 && msg.AngularVelocity.data == 0 )//速度が０なら
    {
        // m_V1.theta = DEG2RAD( 299.92 - 180.0 );
        // m_V2.theta = DEG2RAD( 45.16 + 180.0 );
        // m_V3.theta = DEG2RAD( 134.84 + 180.0 );
        // m_V4.theta = DEG2RAD( 240.78 - 180.0 );

        m_V1.theta = 0.52459;
        m_V2.theta = 2.35819;
        m_V3.theta = 3.9234;
        m_V4.theta = 5.7724;
    }

}

}