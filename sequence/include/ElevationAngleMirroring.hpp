#pragma once

#include <ros/ros.h>

#include <map>
#include <boost/filesystem.hpp>

#include "CharacterManipulation.hpp"


namespace NITNC
{

namespace FieldInfo
{
    extern const uint8_t TargetSpotNum;
    extern const uint8_t ShootSpotNum;
    extern const uint8_t MirroringNum;
};

namespace M0_M2CorrespondanceTable
{
    extern std::map<uint8_t, uint8_t> ShootSpot;
    extern std::map<std::string, std::string> TargetSpot;
    extern std::map<std::string, std::string> Mechanism;
};

class ElevationAngleMirroring : public CharacterManipulation
{
private:

    ros::NodeHandle* m_p_nh;
    ros::NodeHandle* m_p_np;

    void Save( void );


public:

    void Init( ros::NodeHandle& nh, ros::NodeHandle& np );
    void Execute( void );
};
};