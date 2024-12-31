#include "PID.hpp"



namespace NITNC
{

void PID::Init
(
    double Kp,
    double Ki,
    double Kd,
    double p_clamp_max,
    double i_clamp_max,
    double d_clamp_max,
    double max_thresh
)
{
    Kp_ = Kp;
    Ki_ = Ki;
    Kd_ = Kd;
    p_clamp_max_ = p_clamp_max;
    i_clamp_max_ = i_clamp_max;
    d_clamp_max_ = d_clamp_max;
    max_thresh_ = max_thresh;

}

double PID::P( double current_vector, double target_vector )
{
    double P = Kp_ * ( target_vector - current_vector );

    if( abs( P ) > p_clamp_max_ )
    {
        if( P < 0 )
            P = ( -1 ) * p_clamp_max_;
        else
            P = p_clamp_max_;
    }

    return P;
}

double PID::I( double current_vector, double target_vector )
{
    static ros::Time prev_time;
    ros::Time now_time = ros::Time::now();
    ros::Duration time_dev = now_time - prev_time;

    AddIntegral( ( target_vector - current_vector ) * ( time_dev.sec + ( double )time_dev.nsec * pow( 10, -9 ) ) );

    static bool Reverted = false;
    static bool PrevSignedFlag = false;
    bool SignedFlag = SIGNED( target_vector - current_vector );

    if( SignedFlag != PrevSignedFlag )
        ResetIntegral();

    PrevSignedFlag = SignedFlag;

    double I = Ki_ * GetIntegral();

    if( abs( GetIntegral() ) > i_clamp_max_ )
    {
        if( GetIntegral() < 0 )
            SetIntegral( ( -1 ) * i_clamp_max_ );
        else
            SetIntegral( i_clamp_max_ );
    }

    prev_time = now_time;

    return I;

}

double PID::D( double current_vector, double target_vector )
{
    static double prev_dev;
    double current_dev = target_vector - current_vector;

    double D = Kd_ * ( current_dev - prev_dev );

    if( abs( D ) > d_clamp_max_ )
    {
        if( D < 0 )
            D = ( -1 ) * d_clamp_max_;
        else
            D = d_clamp_max_;
    }

    prev_dev = current_dev;

    return D;
}

double PID::compute( double current_vector, double target_vector )
{
    return ( abs( max_thresh_ ) < abs( target_vector - current_vector ) ) ?
        P( current_vector, target_vector ) +
        I( current_vector, target_vector ) +
        D( current_vector, target_vector ) : 0;

}



}