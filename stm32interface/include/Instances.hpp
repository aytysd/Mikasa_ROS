#pragma once

#include "SwerveSteering.hpp"
#include "CANUSB.hpp"
#include "Serial.hpp"
#include "MechanismMD.hpp"
#include "Servo.hpp"
#include "TapeLED.hpp"
#include "MainCircuit.hpp"
#include "Controller.hpp"
#include "ElevationAngleMD.hpp"

namespace NITNC
{

extern SwerveSteering swerve_steering;
extern CANUSB canusb;
extern Serial serial;
extern MechanismMD mechanism_md;
extern Servo servo;
extern TapeLEDCircuit tapeled;
extern MainCircuit main_circuit;
extern Controller controller;
extern ElevationAngleMD elevation_angle_md;

};