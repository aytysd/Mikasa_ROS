#pragma once

#include "Movement.hpp"
#include "ShootSpot.hpp"
#include "TfRepeater.hpp"
#include "Retry.hpp"
#include "ElevationAngleMirroring.hpp"

namespace NITNC
{
    extern Movement movement;
    extern ShootSpot s;
    extern TfRepeater tf_repeater;
    extern Retry retry;
    extern ElevationAngleMirroring elevation_angle_mirroring;
};