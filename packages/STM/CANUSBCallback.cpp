#include "CANUSBCallback.hpp"


namespace NITNC
{

void CANUSBCallback::ActivateCallback( uint16_t CANID, std::vector<uint8_t> Data, uint8_t DataLength )
{
    for( int i = 0; i < GetCallbackSize(); i++ )
    {
        CANUSBActivator activator = GetActivator( i );

        if( activator( CANID ) )
        {
            CANUSBCallbackFunc CallbackFunc = GetCallback( i );
            CallbackFunc( CANID, Data, DataLength );
        }
    }

}

void CANUSBCallback::MakeActivatorLamda( CANUSBActivator& activator, uint16_t CANID )
{
    activator =
    [ CANID ]( uint16_t ReceivedCANID )
    {
        if( CANID == ReceivedCANID )
        {
            return true;
        }
        else
        {
            return false;
        }
    };
}

void CANUSBCallback::MakeActivatorLamda( CANUSBActivator& activator, uint16_t SendorID, uint16_t DestinationID )
{
    activator =
    [
        SendorID,
        DestinationID
    ]
    ( uint16_t ReceivedCANID )
    {
        uint16_t CANID = ( DestinationID << 5 ) | SendorID;

        if( CANID == ReceivedCANID )
        {
            return true;
        }
        else
        {
            return false;
        }
    };
}

uint16_t CANUSBCallback::ExtractCANID( const std::string RxDataInString )
{
    uint16_t CANID = HexString2Dec( RxDataInString.substr( 1, 3 ) );
    return CANID;
}

uint8_t CANUSBCallback::ExtractData( const std::string RxDataInString, std::vector<uint8_t>& Data )
{

    uint8_t DataLength = stoi( RxDataInString.substr( 4, 1 ) );
    
    for( int i = 0; i < DataLength; i++ )
    {
        try
        {
            Data[ i ] = strtol( RxDataInString.substr( 5 + i * 2, 2 ).c_str(), NULL, 16 );
        }
        catch(const std::out_of_range& e)
        {
            ROS_INFO( "Not Received Correctly!" );
        }
        catch(const std::invalid_argument& e)
        {
            ROS_INFO( "It's not valid!" );
        }
        
    } 

    return DataLength;

}

}