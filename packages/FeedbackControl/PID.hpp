#include <ros/ros.h>

#pragma once

#include "Control.hpp"

#define SIGNED( x ) ( ( x < 0 )? true : false )

namespace NITNC
{
class PID
{
protected:

    double Kp_;
    double Ki_;
    double Kd_;

    double p_clamp_max_;
    double i_clamp_max_;
    double d_clamp_max_;

    double max_thresh_;

    virtual double P( double current_vector, double target_vector );
    virtual double I( double current_vector, double target_vector );
    virtual double D( double current_vector, double target_vector );

    double m_Integral = 0;

public:

    void SetIntegral( double n ){ m_Integral = n; };
    void AddIntegral( double n ){ m_Integral += n; };
    void ResetIntegral( void ){ m_Integral = 0; };
    double GetIntegral( void ){ return m_Integral; };



    PID(){};
    ~PID(){};

    virtual void Init
    (
        double Kp,
        double Ki,
        double Kd,
        double p_clamp_max,
        double i_clamp_max,
        double d_clamp_max,
        double max_thresh
    );

    virtual double compute( double current_vector, double target_vector );


    inline void SetPIDGain( double p, double i, double d )
    {
        Kp_ = p;
        Ki_ = i;
        Kd_ = d;
    };



};






};
