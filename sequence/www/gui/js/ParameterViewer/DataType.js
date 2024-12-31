class ROSParameters
{
    s1 = new Mechanism();
    s2 = new Mechanism();
    s3 = new Mechanism();
    s4 = new Mechanism();
    s5 = new Mechanism();
};


class Mechanism
{
    M0 = new TargetSpot();
    M1 = new TargetSpot();
    M2 = new TargetSpot();
    M3 = new TargetSpot();
    M4 = new TargetSpot();
};

class TargetSpot
{
    Sa1 = new Param();
    Sa2 = new Param();
    Sa3 = new Param();
    Sb1 = new Param();
    Sb2 = new Param();
    S_K1 = new Param();
    S_K2 = new Param();
    Ba_right = new Param();
    Ba_left = new Param();
    Bb = new Param();
};

class Param
{
    ElevationAngle = 0;
    velocity = 0;
    SteeringDev = 0;
};