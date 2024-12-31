#include <ros/ros.h>

#include <pure_pursuit/OutputCmd.h>
#include "OmniWheelEquation.hpp"
#include "CANUSB.hpp"
#include "MachineInfo.hpp"
#include "Actuator.hpp"

namespace NITNC
{

void OmniWheelEquation::init( ros::NodeHandle& nh )
{
	sub_Cmd_ = nh.subscribe( "/OutputCmd", 10, &OmniWheelEquation::WheelOutput, this );
	Sub_MotorTest_ = nh.subscribe( "/MotorTest", 10, &OmniWheelEquation::SingleWheelOutput, this );
}

void OmniWheelEquation::WheelOutput( const pure_pursuit::OutputCmd& msg )
{
	double Vx = msg.Speed.data * cos( msg.DirectionOfTravel.data );
	double Vy = msg.Speed.data * sin( msg.DirectionOfTravel.data );

	double AttitudeRad = msg.AttitudeAngle.data;
	double RotationSpeed = msg.AngularVelocity.data;

	double V1 = Vx * cos( AttitudeRad + M_PI/4) + Vy * sin( AttitudeRad + M_PI/4) + RotationSpeed * R;
	double V2 = Vx * cos( AttitudeRad + M_PI * 3/4) + Vy * sin( AttitudeRad + M_PI * 3/4) + RotationSpeed * R;
	double V3 = Vx * cos( AttitudeRad + M_PI * 5/4) + Vy * sin( AttitudeRad + M_PI * 5/4) + RotationSpeed * R;
	double V4 = Vx * cos( AttitudeRad + M_PI * 7/4) + Vy * sin( AttitudeRad + M_PI * 7/4) + RotationSpeed * R;

	V1 *= 1000.0;
	V2 *= 1000.0;
	V3 *= 1000.0;
	V4 *= 1000.0;

	drive( V1, 2 );
	drive( V2, 3 );
	drive( V3, 4 );
	drive( V4, 5 );
}

void OmniWheelEquation::SingleWheelOutput( const std_msgs::Float32MultiArray& msg )
{
	uint8_t CANID = ( uint8_t )msg.data[ 0 ];
	double velocity = msg.data[ 1 ];

	drive( velocity, CANID );
}

void OmniWheelEquation::drive( double velocity, uint8_t CANID )
{
    uint8_t velocity_data[2] = { 0 };
    uint8_t direction;

	direction = CCW;

	if (velocity < 0)        direction = CW;
	else if (velocity == 0)  direction = BRAKE;

	uint32_t v = labs(velocity);
	if (v > V_MAX)
	{
		v = V_MAX;
	}

	velocity_data[0] = (direction << 7)|(0 << 6)|((v&0b111111100000000) >> 8);
	velocity_data[1] = (uint8_t)(v&0b11111111);

	// if( velocity == 0 )
	// {
	// 	velocity_data[ 0 ] |= ( 1 << 6 );
	// }


	// can_handler.Transmit( CANID, 2, velocity_data );
}

};
