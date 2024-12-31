#pragma once

#include <ros/ros.h>

#include "PurePursuitDef.hpp"

namespace NITNC
{

class PurePursuitVar 
{
private:

    Status_t m_status;
    ConfigParams_t m_ConfigParams;
    PointsInfo_t CandidatePath_;


    /* data */
public:

    ConfigParams_t& GetConfigParams( void ){ return m_ConfigParams; };
    PointsInfo_t& GetCandidatePath( void ){ return CandidatePath_; };
    

};

};

