#include "CSV.hpp"



namespace NITNC
{

/**
* @brief 第一引数のstd::stringのやつをdelimiter(カンマ)で区切って返す関数
* 
* @param input 
* @param delimiter 
* @return std::vector<std::string> 
*/
std::vector<std::string> CSV::split( std::string& input, char delimiter )
{
    std::istringstream stream(input);
    std::string field;
    std::vector<std::string> result;

    while (getline(stream, field, delimiter))
        result.push_back(field);


    return result;
}

void CSV::ReadCSV( std::string FileName )
{
    std::string FilePath = m_RootPath;
    FilePath += FileName;

    std::ifstream ifs( FilePath );

    std::string line;
    getline( ifs, line );


    while ( getline( ifs, line ) )
    {
        std::vector<std::string> strvec = split(line, ',');
        m_Table.push_back( strvec );
    }

}

    // 行数を求める（WayPointの数を求める）
uint32_t CSV::GetRowCount(std::string csv_path)
{
    std::ifstream csv_file(csv_path);
    std::string temp;
    int i = 0;
    while (std::getline(csv_file, temp))
        i++;

    return i;
}

uint32_t CSV::GetColumnCount(std::string csv_path)
{
    std::ifstream csv_file(csv_path);
    std::string temp;
    int i = 0;
    if (std::getline(csv_file, temp))
    {
        std::istringstream istream(temp);
        std::string temp2;
        while (std::getline(istream, temp2, ','))
            i++;
    }
    
    return i;
}


}