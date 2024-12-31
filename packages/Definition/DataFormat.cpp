#include "DataFormat.hpp"



namespace NITNC
{

std::map<std::string, uint8_t> ServoTIM
{
    { "tim2_ch1", 0 },
    { "tim2_ch2", 1 },
    { "tim2_ch3", 2 },
    { "tim3_ch1", 3 },
    { "tim3_ch2", 4 },
    { "tim3_ch3", 5 }
};

#define ServoPortNum 6

};