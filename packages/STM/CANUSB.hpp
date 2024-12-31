#pragma once

#include "ros/ros.h"
#include <nodelet/nodelet.h>
#include <pluginlib/class_list_macros.h>
#include "std_msgs/String.h"
#include "diagnostic_updater/diagnostic_updater.h"

#include <string>
#include <unistd.h>
#include <poll.h>
#include <fcntl.h>
#include <termios.h>
#include <sys/select.h>
#include <sys/statvfs.h>
#include <errno.h>

#include "CharacterManipulation.hpp"
#include "Serial.hpp"
#include "CANID.hpp"
#include "CANUSBDef.hpp"
#include "CANUSBCallback.hpp"

namespace NITNC
{

class CANUSB : public CANUSBCallback
{

private:

    diagnostic_updater::Updater* m_p_updater;


    ros::Timer timer_;
    
    SerialConfig_t serial_config_;
    CANConfig_t can_config_;


    struct pollfd fds_;

    int DiagnosticCounter = 0;


    void Start();
    void Open();
    void Close();

    uint8_t flag();
    void AutoPoll( bool enable = true );

    void Version();
    void Flag();

    void SetACR();
    void SetAMR();

    void SetBitRate();
    void SetBTR();

    void ToggleTimeStamp( bool enable );

    virtual void TimerCallback( const ros::TimerEvent& ) final;
    void CANUSBDiagnostic( diagnostic_updater::DiagnosticStatusWrapper& stat );

    void OpenSerialStream( void );
    void CloseSerialStream( void );

public:

    uint8_t GetMyID( uint32_t CANID )
    {
        uint8_t MyID = ( CANID & 0b11111100000 ) >> 5;
        return MyID;
    }

    uint8_t GetPartnerID( uint32_t CANID )
    {
        uint8_t PartnerID = CANID & 0b11111;
        return PartnerID;
    }

    void Transmit( CAN1 DestinationID, uint8_t DataSize, uint8_t* pData );
    void Transmit( CAN2 DestinationID, uint8_t DataSize, uint8_t* pData );
    void Transmit( uint8_t DestinationID, uint8_t DataSize, uint8_t* pData );

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np, diagnostic_updater::Updater& updater );
    
};




};
