#include "ElevationAngleMD.hpp"
#include "Instances.hpp"

namespace NITNC
{

void ElevationAngleMD::ForwardCallback( const stm32interface::ElevationAngleMD& msg )
{
    uint8_t TargetElevationAngleInDegree = static_cast<uint8_t>( round( RAD2DEG( msg.ElevationAngle ) ) );

    canusb.Transmit( msg.canid, 1, &TargetElevationAngleInDegree );
}

void ElevationAngleMD::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_p_nh = &nh;
    
    m_ElevationAngleSubscriber = m_p_nh -> subscribe( "/ElevationAngleMD/Command", 10, &ElevationAngleMD::ForwardCallback, this );

}
}