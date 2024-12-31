#include "PurePursuitCallback.hpp"


namespace NITNC
{

double PurePursuitCallback::m_ApproachTolerance = 0;
double PurePursuitCallback::m_AttitudeAngleTolerance = 0;

void PurePursuitCallback::ActivateCallback( Pose SelfPos, Pose TargetPoint )
{
    for( int i = 0; i < GetCallbackSize(); i++ )
    {
        PurePursuitActivator Activator = GetActivator( i );

        if( Activator( SelfPos ) )
        {
            PurePursuitCallbackFunc Callback = GetCallback( i );
            Callback( SelfPos, i );

            RemoveCallback( i );
        }

    }


}

void PurePursuitCallback::MakeActivatorLamda( PurePursuitActivator& activator, Pose point, double ApproachTolerance, double AngleTolerance, bool SaveParam )
{
    if( SaveParam )
    {
        m_ApproachTolerance = ApproachTolerance;
        m_AttitudeAngleTolerance = AngleTolerance;
    }

    activator =
    [
        point,
        ApproachTolerance,
        AngleTolerance
    ]
    ( Pose SelfPos ) -> bool
    {
        double AbsAttitudeAngleDev = abs( PositionalRelation::GetNarrowestRad( SelfPos.theta, point.theta ) );
        if
        (
            PositionalRelation::GetDistance( SelfPos, point ) < ApproachTolerance &&
            AbsAttitudeAngleDev < AngleTolerance
        )
        {
            return true;
        }
        else
        {
            return false;
        }

    };


}

};