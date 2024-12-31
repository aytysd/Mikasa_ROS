#pragma once

#include <ros/ros.h>
#include <std_msgs/UInt8MultiArray.h>

#include <assert.h>

namespace NITNC
{

enum class TapeLEDIndex : uint8_t
{
    DrivePower = 0,
    ManualControl,
    AutoControl,
    ShootDown,
    Shoot4BaseA,
    Size,
};



typedef struct StructColour
{
    StructColour
    (
        uint8_t r_,
        uint8_t g_,
        uint8_t b_
    )
    :
    r( r_ ),
    g( g_ ),
    b( b_ )
    {};

    uint8_t r = 0;
    uint8_t g = 0;
    uint8_t b = 0;


} Colour_t;

namespace Colours
{
    const Colour_t Red = *( new Colour_t( 5, 0, 0 ) );
    const Colour_t Green = *( new Colour_t( 0, 5, 0 ) );
    const Colour_t Blue = *( new Colour_t( 0, 0, 5 ) );
    const Colour_t Yellow = *( new Colour_t( 5, 5, 0 ) );
    const Colour_t None = *( new Colour_t( 0, 0, 0 ) );
    const Colour_t LightBlue = *( new Colour_t( 0, 5, 5 ) );
    const Colour_t Purple = *( new Colour_t( 3, 0, 3 ) );
};

class TapeLEDCircuit
{
private:

    ros::NodeHandle* m_p_nh;
    ros::NodeHandle* m_p_np;

    ros::Timer m_Timer;

    uint8_t TxData[ 4 ] = { 0 };

    bool DrivePower( void );
    bool ManualControl( void );
    bool AutoControl( void );
    bool AutoControlIsApproaching( void );

    void SetRed( uint8_t& data, uint8_t r );
    void SetBlue( uint8_t& data, uint8_t b );
    void SetGreen( uint8_t& data, uint8_t g );

    void SetRGB( uint8_t* data, const Colour_t& colour );

    void TapeLEDTimerCallback( const ros::TimerEvent& e );

    std::vector<ros::Timer> m_p_BlinkTimers = *( new std::vector<ros::Timer>( static_cast<uint8_t>( TapeLEDIndex::Size ) ) );
    void CreateBlinkLamda( uint8_t* data, const Colour_t& colour1, const Colour_t& colour2 );


public:

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
};

};

