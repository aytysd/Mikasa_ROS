#pragma once


#include "CallbackBase.hpp"
#include "CANUSBDef.hpp"
#include "CANID.hpp"
#include "CharacterManipulation.hpp"

namespace NITNC
{

class CANUSBCallback : public CallbackBase<CANUSBCallbackFunc, CANUSBActivator>, public CharacterManipulation
{
private:

public:

    CANUSBCallback() :
    CallbackBase
    (
        []( uint16_t CANID ) -> bool
        {
            return false;
        }
    ){};
    ~CANUSBCallback(){};

    void ActivateCallback( uint16_t CANID, std::vector<uint8_t> Data, uint8_t DataLength );

    static void MakeActivatorLamda( CANUSBActivator& activator, uint16_t CANID );
    static void MakeActivatorLamda( CANUSBActivator& activator, uint16_t SenderID, uint16_t DestinationID = static_cast<uint16_t>( CAN1::MY_ID ) );

    uint16_t ExtractCANID( const std::string RxDataInString );
    uint8_t ExtractData( const std::string RxDataInString, std::vector<uint8_t>& Data );
};
};