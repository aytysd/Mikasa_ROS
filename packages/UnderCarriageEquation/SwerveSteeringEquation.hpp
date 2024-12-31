#pragma once

#include <ros/ros.h>
#include <pure_pursuit/OutputCmd.h>

#include "Vector2_t.hpp"
#include "MachineInfo.hpp"


namespace NITNC
{

#define INVERTOUTPUT ( true )


class SwerveSteeringEquation
{

    using Order = pure_pursuit::OutputCmd;

private:

    Vector2_t m_V1;
    Vector2_t m_V2;
    Vector2_t m_V3;
    Vector2_t m_V4;

public: 

    Vector2_t GetV1(){ return m_V1; };
    Vector2_t GetV2(){ return m_V2; };
    Vector2_t GetV3(){ return m_V3; };
    Vector2_t GetV4(){ return m_V4; };

    virtual void Forward( const pure_pursuit::OutputCmd& msg );

};
};