#pragma once

#include <ros/ros.h>

#include <string>
#include <iostream>
#include <iomanip>
#include<sstream>


namespace NITNC
{


class CharacterManipulation
{

private:

public:

    /**
     * @brief 十進数で送られてきたデータを，十六進の文字列に治す
     * 
     * @param Data デーた
     * @param Length 文字列の長さ
     * @return std::string  十六進数の文字列
     */
    std::string Dec2HexString( uint64_t Data, uint8_t Length )
    {
        std::stringstream ss;
        ss << std::hex << Data;
        std::string string = ss.str();

        while( string.length() < Length )
            string.insert( 0, "0" );

        transform (string.begin(), string.end(), string.begin(), toupper);

        return string;
    }


    void HexString2Dec( std::string Data, std::vector<uint8_t>& Result )
    {
        uint64_t number = strtoll( Data.c_str(), NULL, 16 );

        for( int i = 0; i < Data.size() / 2; i++ )
        {
            Result.insert( Result.begin(), ( number & 0xFF ) );
            number = number >> 8;
        }

    }

    uint16_t HexString2Dec( std::string Data )
    {
        return strtol( Data.c_str(), NULL, 16 );
    }

    std::string GetDatetimeStr( void );
    void GetNumberFromString( std::vector<int>& numbers, std::string s );

};

};