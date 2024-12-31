#pragma once


#include <vector>
#include <string>
#include <iostream>
#include <sstream>
#include <fstream>


namespace NITNC
{

using Table = std::vector<std::vector<std::string>>;

class CSV
{
private:

    Table m_Table;
    std::string m_RootPath = "";

    /**
     * @brief CSVファイルから読み取ったデータ（点の座標．絶対追従点か否か，追従速度）を格納する
     * 
     */

public:
    std::vector<std::string> split( std::string& input, char delimiter );

    void SetRootPath( std::string RootPath ){ m_RootPath = RootPath; };

    Table GetTable( void ){ return m_Table; };

    virtual void ReadCSV( std::string FileName );

    uint32_t GetRowCount(std::string csv_path);
    uint32_t GetColumnCount(std::string csv_path);


};
};