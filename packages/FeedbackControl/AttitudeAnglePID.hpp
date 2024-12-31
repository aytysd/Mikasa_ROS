#pragma once

#include <ros/ros.h>

#include "PID.hpp"

namespace NITNC
{

#define SIGNEDFLAG( x ) ( ( x < 0 )? true : false )

class AttitudeAnglePID : public PID
{
private:

    double P( double dev );
    double I( double dev );
    double D( double dev );



public:

    AttitudeAnglePID();
    ~AttitudeAnglePID();


    double compute( double current_vector, double target_vector, double current_speed );
    
};

};