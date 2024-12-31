#pragma once

namespace NITNC
{
    
enum class CAN1 : uint8_t
{
    MainCircuit = 1U,
    SteeringV1 = 2U,
    SteeringV2 = 3U,
    SteeringV3 = 4U,
    SteeringV4 = 5U,
    DriveV1 = 6U,
    DriveV2 = 7U,
    DriveV3 = 8U,
    DriveV4 = 9U,
    MY_ID = 31U
};

enum class CAN2 : uint8_t
{
    MainCircuit = 1U,
    Servo1 = 2U,
    Servo2 = 3U,
    Servo3 = 4U,
    M1MD = 5U,
    M2MD = 6U,
    M3MD = 7U,
    M4MD = 8U,
    M5MD = 9U,
    M6MD = 10U,
    M7MD = 11U,
    M8MD = 12U,
    TapeLED = 15U,
    MY_ID = 31U
};


enum class DataIDFromMain : uint8_t
{
    Controller = 1,
    GPIO = 2
};

enum class ControllerDataFromMain : uint8_t
{
    GotoStartZone = 1
};

};
