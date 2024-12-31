#pragma once


namespace NITNC
{


#define GETVARNAME( var ) ( #var )

#define ServoSendOut 180
#define ServoSTOP 90

class StaticShootInfo
{
public:

    std::string TFLinkName;

    int ElevationAngleMDCANID = 0;

    int MD_CANID = 0;

    int SendOutServoCANID = 0;
    std::string SendOutServoTIM = "";

    std::string SteeringServoTIM = "";
    int SteeringServoCANID = 0;

    bool f_Enabled = true;


};

class ShootInfo : public StaticShootInfo
{
private:
    double m_Velocity = 0;
    bool m_f_Fire = false;

    std::string m_TargetSpot = "Sa1";
    double m_SteeringDev = 0;

    double m_ElevationAngle = 0;

    bool m_f_ShootDown;


public:

    ShootInfo( bool ShootDown ) : m_f_ShootDown( ShootDown ){};


    void SetVelocity( double velocity ){ m_Velocity = velocity; };
    void SetFire( bool fire ){ m_f_Fire = fire; };
    void SetElevationAngle( double angle ){ m_ElevationAngle = angle; };

    bool Get_f_ShootDown( void ) const { return m_f_ShootDown; };
    double GetElevationAngle( void ) const { return m_ElevationAngle; };
    double GetVelocity( void ) const { return m_Velocity; };
    bool GetFire( void ) const { return m_f_Fire; };

    virtual ~ShootInfo() = default;

    void SetTargetSpot( std::string target_spot ){ m_TargetSpot = target_spot; }

    void SetSteeringDev( double theta_dev ){ m_SteeringDev = theta_dev; }

    const double GetSteeringDev( void ) const { return m_SteeringDev; }

    std::string GetTargetSpot( void ) const { return m_TargetSpot; };

};


typedef actionlib::SimpleActionServer<sequence::ShootSpotAction> Server;

};