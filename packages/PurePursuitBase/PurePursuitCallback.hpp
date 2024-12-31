#pragma once

#include "PurePursuitDef.hpp"
#include "CallbackBase.hpp"
#include "PurePursuitDef.hpp"
#include "PositionalRelation.hpp"

namespace NITNC
{

class PurePursuitCallback : public CallbackBase<PurePursuitCallbackFunc, PurePursuitActivator>
{

private:

    static double m_ApproachTolerance;
    static double m_AttitudeAngleTolerance;

public:

    PurePursuitCallback() : 
    CallbackBase
    (
        []( Pose SelfPos ) -> bool
        {
            return false;
        }
    ) 
    {};
    ~PurePursuitCallback(){};

    void ActivateCallback( Pose SelfPos, Pose TargetPoint );

    static void MakeActivatorLamda( PurePursuitActivator& activator, Pose point, double ApproachTolerance, double AngleTolerance, bool SaveParam = false );

    static double GetApproachTolerance( void ){ return m_ApproachTolerance; };
    static double GetAttitudeAngleTolerance( void ){ return m_AttitudeAngleTolerance; };

};
};