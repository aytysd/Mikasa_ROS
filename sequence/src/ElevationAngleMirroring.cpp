#include "ElevationAngleMirroring.hpp"


namespace NITNC
{

namespace FieldInfo
{
    const uint8_t TargetSpotNum = 10;
    const uint8_t ShootSpotNum = 5;
    const uint8_t MirroringNum = 3;
};

namespace M0_M2CorrespondanceTable
{
    std::map<uint8_t, uint8_t> ShootSpot =
    {
        { 1, 5 },
        { 2, 4 },
        { 3, 3 },
        { 4, 2 },
        { 5, 1 }
    };

    std::map<std::string, std::string> TargetSpot = 
    {
        { "S_K1", "S_K2" },
        { "Sa1", "Sa3" },
        { "Sb1", "Sb2" },
        { "Sa2", "Sa2" },
        { "Bb", "Bb" },
    };

    std::map<std::string, std::string> Mechanism = 
    {
        { "M0", "M2" }
    };
};


void ElevationAngleMirroring::Init( ros::NodeHandle& nh, ros::NodeHandle& np )
{
    m_p_nh = &nh;
    m_p_np = &np;
}

void ElevationAngleMirroring::Execute( void )
{
    std::map<std::string, std::string> ElevParamSentences;

    std::vector<std::string> TargetSpotKeys;
    for ( std::map<std::string, std::string>::iterator it = M0_M2CorrespondanceTable::TargetSpot.begin(); it != M0_M2CorrespondanceTable::TargetSpot.end(); it++ )
    {
        TargetSpotKeys.push_back( it -> first );
    }

    std::vector<uint8_t> ShootSpotKeys;
    for ( std::map<uint8_t, uint8_t>::iterator it = M0_M2CorrespondanceTable::ShootSpot.begin(); it != M0_M2CorrespondanceTable::ShootSpot.end(); it++ )
    {
        ShootSpotKeys.push_back( it -> first );
    }

    for( size_t ShootSpotIndex = 0; ShootSpotIndex < ShootSpotKeys.size(); ShootSpotIndex++ )
    {

        for( size_t TargetSpotIndex = 0; TargetSpotIndex < TargetSpotKeys.size(); TargetSpotIndex++ )
        {


            std::string M0Sentence = "DynamicShootParam";
            std::string M2Sentence = "DynamicShootParam";

            M0Sentence += std::to_string( ShootSpotKeys[ ShootSpotIndex ] );
            M2Sentence += std::to_string( M0_M2CorrespondanceTable::ShootSpot[ ShootSpotKeys[ ShootSpotIndex ] ] );
            
            M0Sentence += "/M0/";
            M2Sentence += "/M2/";

            M0Sentence += TargetSpotKeys[ TargetSpotIndex ];
            M2Sentence += M0_M2CorrespondanceTable::TargetSpot[ TargetSpotKeys[ TargetSpotIndex ] ];

            M0Sentence += "/ElevationAngle";
            M2Sentence += "/ElevationAngle";

            ElevParamSentences[ M0Sentence ] = M2Sentence;
        
        }
    }


    std::vector<std::string> M0Sentences;
    for ( std::map<std::string, std::string>::iterator it = ElevParamSentences.begin(); it != ElevParamSentences.end(); it++ )
    {
        M0Sentences.push_back( it -> first );
    }


    for( size_t i = 0; i < M0Sentences.size(); i++ )
    {
        double value = 0;

        std::string M0Sentence = M0Sentences[ i ];
        std::string M2Sentence = ElevParamSentences[ M0Sentences[ i ] ];

        m_p_np -> getParam( M0Sentence, value );
        m_p_np -> setParam( M2Sentence, value );
    }

    Save();
}


void ElevationAngleMirroring::Save( void )
{

    std::string NewHistoryFolder = "";

    { // create folder
        std::string now = GetDatetimeStr();
        now += "/";
        NewHistoryFolder = "/home/ayato/catkin_ws/src/2022/sequence/config/history/" + now;
        boost::filesystem::create_directory( NewHistoryFolder.c_str() );
    }

    {
        std::string BaseFolder = "/home/ayato/catkin_ws/src/2022/sequence/config/";

        for( size_t i = 1; i <= 5; i++ )
        {
            std::string destination = NewHistoryFolder + "DynamicShootParam" + std::to_string( i ) + ".yaml";
            std::string base = BaseFolder + "DynamicShootParam" + std::to_string( i ) + ".yaml";

            const std::string blank = " ";

            std::string command = "mv";
            command += blank;
            command += base;
            command += blank;
            command += destination;

            system( command.c_str() );
        }
    }

    for( size_t i = 1; i <= 51; i++ )
    {
        std::string RosParamNamespace = "/ElevationAngleMirroring_node/DynamicShootParam" + std::to_string( i );
        std::string DumpFileName = "/home/ayato/catkin_ws/src/2022/sequence/config/DynamicShootParam" + std::to_string( i ) + ".yaml";
        std::string command = "rosparam dump";
        command += " ";
        command += DumpFileName;
        command += " ";
        command += RosParamNamespace;
        system( command.c_str() );

    }


}



}