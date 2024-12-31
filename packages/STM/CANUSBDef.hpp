#pragma once


namespace NITNC
{


typedef std::function<void( uint16_t, std::vector<uint8_t>, uint8_t )> CANUSBCallbackFunc;
typedef std::function<bool( uint16_t )> CANUSBActivator;




typedef struct StructCANConfig
{
std::string BitRate;
bool IsOpen = false;
std::string ACR;
std::string AMR;
} CANConfig_t;


enum class AsciiCommands : uint8_t
{
    S = 83,
    s = 115,
    O = 79,
    C = 67,
    t = 116,
    F = 70,
    X = 88,
    M = 77,
    m = 109,
    U = 85,
    V = 86,
    N = 78,
    Z = 90,

    CR = 13,
    LINUX_CR = 10,
    BELL = 7
};

};