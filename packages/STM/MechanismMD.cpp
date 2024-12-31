#include "MechanismMD.hpp"
#include "Actuator.hpp"
#include "Instances.hpp"

namespace NITNC
{
void MechanismMD::ForwardCallback( const stm32interface::MD& msg )
{

    double velocity = msg.speed * 1000.0;

    uint8_t velocity_data[2] = { 0 };
    uint8_t direction;

    direction = CW;

    if (velocity < 0)        direction = CCW;
    else if (velocity == 0)  direction = BRAKE;

    uint32_t v = labs(velocity);
    if (v > V_MAX)
    {
        v = V_MAX;
    }

    velocity_data[0] = (direction << 7) | ((v&0b111111100000000) >> 8);
    velocity_data[1] = (uint8_t)(v&0b11111111);

    // if( velocity == 0 )
    // {
    // 	velocity_data[ 0 ] |= ( 1 << 6 );
    // }


    canusb.Transmit( msg.can_id, 2, velocity_data );

}

void MechanismMD::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    CommandSubscriber = nh.subscribe( "/MechanismMDCommand", 10, &MechanismMD::ForwardCallback, this );
}
}
