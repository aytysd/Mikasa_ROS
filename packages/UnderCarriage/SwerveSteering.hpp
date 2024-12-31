#pragma once

#include <ros/ros.h>
#include <dynamic_reconfigure/server.h>


#include <pure_pursuit/OutputCmd.h>
#include <stm32interface/Swerve_testConfig.h>
#include <stm32interface/SingleUnderCarriageDriveMD.h>
#include <stm32interface/SingleUnderCarriageSteeringMD.h>

#include "math.h"

#include "CANUSB.hpp"
#include "Serial.hpp"
#include "Vector2_t.hpp"
#include "MarkerPublisher.hpp"
#include "SwerveSteeringEquation.hpp"
#include "MachineInfo.hpp"
#include "CANID.hpp"


namespace NITNC
{


class SwerveSteering : public MarkerPublisher, public SwerveSteeringEquation
{

private:

    ros::Subscriber m_CommandSubscriber;
    ros::Subscriber m_SingleDriveMDSubscriber;
    ros::Subscriber m_SingleSteeringMDSubscriber;

    void TestCallback( const stm32interface::Swerve_testConfig& config );

    bool m_IsEnabled = true;

    void SteeringCheckCallback( const stm32interface::SingleUnderCarriageSteeringMD& msg );
    void DriveCheckCallback( const stm32interface::SingleUnderCarriageDriveMD& msg );


public:

    void Enable( void )
    {
        m_IsEnabled = true;
    }

    void Disable( void )
    {
        m_IsEnabled = false;
    }

    SwerveSteering(){};

    void drive( uint8_t canid, Vector2_t info );
    void SteeringMD( uint8_t canid, double theta );
    void DriveMD( uint8_t canid, double velocity );

    virtual void CommandCallback( const pure_pursuit::OutputCmd& msg );

    void Init
    ( 
        ros::NodeHandle& nh, 
        ros::NodeHandle& np, 
        dynamic_reconfigure::Server<stm32interface::Swerve_testConfig>& server, 
        dynamic_reconfigure::Server<stm32interface::Swerve_testConfig>::CallbackType& f
    );


    void TestRepeat();
};

};

