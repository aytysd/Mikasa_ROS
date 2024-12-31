#include "CharacterManipulation.hpp"



namespace NITNC
{


std::string CharacterManipulation::GetDatetimeStr( void ) {
    time_t t = time(nullptr);
    const tm* localTime = localtime(&t);
    std::stringstream s;
    // setw(),setfill()で0詰め
    s << std::setw(2) << std::setfill('0') << localTime->tm_mon + 1;
    s << std::setw(2) << std::setfill('0') << localTime->tm_mday;
    s << "-";
    s << std::setw(2) << std::setfill('0') << localTime->tm_hour;
    s << ":";
    s << std::setw(2) << std::setfill('0') << localTime->tm_min;
    s << ":";
    s << std::setw(2) << std::setfill('0') << localTime->tm_sec;
    // std::stringにして値を返す
    return s.str();
}

void CharacterManipulation::GetNumberFromString( std::vector<int>& numbers, std::string s )
{
    std::stringstream str_strm;
    str_strm << s; //convert the string s into stringstream
    std::string temp_str;
    int temp_int;
    while( !str_strm.eof() ) 
    {
        str_strm >> temp_str; //take words into temp_str one by one
        if( std::stringstream( temp_str ) >> temp_int )
        {
            numbers.push_back( temp_int );
        }
        temp_str = ""; //clear temp string
    }
}
}