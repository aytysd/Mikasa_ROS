#include "AttitudeAnglePID.hpp"



namespace NITNC
{


AttitudeAnglePID::AttitudeAnglePID(){};
AttitudeAnglePID::~AttitudeAnglePID(){};

double AttitudeAnglePID::P( double dev )
{
    double P = Kp_ * dev;

    if( abs( P ) > p_clamp_max_ )
    {
        if( P < 0 )
            P = ( -1 ) * p_clamp_max_;
        else
            P = p_clamp_max_;
    }

    ROS_INFO( "P:%lf", P );

    return P;

}

double AttitudeAnglePID::I( double dev )
{

    double buff = dev * ControlRate;
    AddIntegral( buff );

    static bool SignedFlag = false;

    if( SignedFlag != SIGNEDFLAG( dev ) )
    {
        ResetIntegral();
    }

    SignedFlag = SIGNEDFLAG( dev );


    if( abs( GetIntegral() ) > i_clamp_max_ )
    {
        if( GetIntegral() < 0 )
            SetIntegral( ( -1 ) * i_clamp_max_ );
        else
            SetIntegral( i_clamp_max_ );
    }

    double I = Ki_ * GetIntegral();

    ROS_INFO( "I:%lf", I );

    return I;

}

double AttitudeAnglePID::D( double dev )
{
    static double prev_dev;

    double D = Kd_ * ( dev - prev_dev ); // * FPS;

    if( abs( D ) > d_clamp_max_ )
    {
        if( D < 0 )
            D = ( -1 ) * d_clamp_max_;
        else
            D = d_clamp_max_;
    }

    prev_dev = dev;

    ROS_INFO( "D:%lf", D );

    return D;
}

double AttitudeAnglePID::compute( double current_vector, double target_vector, double current_speed )
{
    double dev = target_vector - current_vector;

    if( abs( dev ) > M_PI )
    {
        if( dev < 0 )
            dev += M_PI * 2;
        else
            dev -= M_PI * 2;
    }

    double out = 
        P( dev ) +
        I( dev );// +
        // D( dev );

    out *= ( current_speed / 4.5 ) + 0.35;
    double prop = ( current_speed / 6.0 ) + 0.35;

    out += 0.01;

    ROS_INFO( "out:%lf", out );
    // ROS_INFO( "prop:%lf", prop );


    // return 
    //     P( dev ) +
    //     I( dev ) +
    //     D( dev );

    return out;

}




};