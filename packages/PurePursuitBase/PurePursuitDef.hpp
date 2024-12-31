#pragma once

#include <vector>
#include <string>

#include <geometry_msgs/Pose2D.h>

#include "TypeDef.hpp"

namespace NITNC
{

typedef std::function<void( Pose, uint8_t )> PurePursuitCallbackFunc;
typedef std::function<bool( Pose )> PurePursuitActivator;

typedef struct StructConfigParams
{
    double L;//LookAhead Distance
    double K;//const Coefficient
    double RotateP;
    double RotateI;
    double RotateD;
    double ApproachBeginningDistance;
    double SpeedMultiplier = 1.0;

    void SetK( double k ){ K = k; };
    void SetSpeedMultiplier( double speed_multiplier ){ SpeedMultiplier = speed_multiplier; };
} ConfigParams_t;

typedef struct StructPointInfo
{
    double Speed = 0;
    Pose Point;
} PointInfo_t;

typedef std::vector<PointInfo_t> PointsInfo_t;

typedef struct StructStatus
{
    bool IsEnabled = false;
    Pose SelfPos;
    bool IsApproaching = false;
    double CurrentSpeed = 0;
} Status_t;

};