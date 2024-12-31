#include "MathEquation.hpp"



namespace NITNC
{

void MathEquation::CalcQuadraticEquation( std::vector<double>& Outs, double a, double b, double c )
{
    /* 判別式 */
    float discriminant;

    /* 解が複素数を含む場合 */
    float real, imag;

    /* 判別式を計算 */
    discriminant = b * b - 4 * a * c;

    /* 判別式に数値による条件分岐 */
    if ( discriminant > 0 )
    {

        // 解の計算
        Outs.push_back( ( -b + sqrt(discriminant) ) / (2*a) );
        Outs.push_back( ( -b - sqrt(discriminant) ) / (2*a) );


    } 
    else if ( discriminant == 0 ) 
    {

    // 解の計算
        Outs.push_back( -b / ( 2 * a ) );


    }
    else 
    {

    // 解の計算
        real = -b / (2*a);
        imag = sqrt(-discriminant) / (2*a);

    // 解の出力
    }


}

double MathEquation::CalcCubicRoot(double x)
{
    double answer = pow(fabs(x), 1.0/3.0);
    if (x < 0)  return -answer;
    else        return answer;
}

/**
 * @brief ３次方程式を解く関数 (ax^3+bx^2+cx+d=0)
 * @param a x^3の係数
 * @param b x^2の係数
 * @param c x  の係数
 * @param d 1  の係数
 * @param solution 解を格納したい二次元配列([][0]:実部, [][1]:虚部)
 */
void MathEquation::CalcCubic(double a, double b, double c, double d, double solution[][2])
{
    double A, B, C;
    A = b/a;
    B = c/a;
    C = d/a;

    double p, q;
    p = B - A*A/3;
    q = C - (A*B)/3 + (2*A*A*A)/27;

    double D, d1, d2;
    d1 = -(q*q)/4;
    d2 = -(p*p*p)/27;
    D = d1 + d2;

    double _a, _b;
    _a = -q/2;
    _b = -A/3;

    double R, Q, theta;
    theta = atan2(sqrt(fabs(D)), _a);
    R = pow((_a*_a) + D, 1.0/6.0) * cos(theta/3.0); 
    Q = pow((_a*_a) + D, 1.0/6.0) * sin(theta/3.0); 

    double S, T;
    S = CalcCubicRoot(_a + sqrt(fabs(-D)));
    T = CalcCubicRoot(_a - sqrt(fabs(-D)));

    for (uint8_t i = 0; i < 3; i++) 
    {
        for (uint8_t j = 0; j < 2; j++) solution[i][j] = 0; 
    }

    if (D == 0.0)
    {
        if (q == 0.0)  solution[0][REAL] = _b;
        else 
        {
            solution[0][REAL] = -(_b) - 2*CalcCubicRoot(_a);
            solution[1][REAL] = -(_b) + CalcCubicRoot(-_a);
        }
    }
    else if (D > 0.0)
    {
        solution[0][REAL] = _b + 2*R;
        solution[1][REAL] = _b - R - sqrt(3)*Q;
        solution[2][REAL] = _b - R + sqrt(3)*Q;
    }
    else if (D < 0.0)
    {
        solution[0][REAL] = _b + S + T;
        solution[1][REAL] = _b - (S + T)/2;
        solution[1][COMPLEX] = sqrt(3)*(S - T) /2;
        solution[2][REAL] = _b - (S + T)/2;
        solution[2][COMPLEX] = -sqrt(3)*(S - T) /2;
    }
}

    
};