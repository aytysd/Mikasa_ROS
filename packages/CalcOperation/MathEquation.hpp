#pragma once

#include <ros/ros.h>

#include <vector>
#include "math.h"

namespace NITNC
{

#define REAL 0
#define COMPLEX 1

class MathEquation
{

private:

    double CalcCubicRoot(double x);

public:

    void CalcQuadraticEquation( std::vector<double>& Outs, double a, double b, double c );

    /**
     * @brief ３次方程式を解く関数 (ax^3+bx^2+cx+d=0)
     * @param a x^3の係数
     * @param b x^2の係数
     * @param c x  の係数
     * @param d 1  の係数
     * @param solution 解を格納したい二次元配列([][0]:実部, [][1]:虚部)
     */
    void CalcCubic(double a, double b, double c, double d, double solution[][2]);

};
};