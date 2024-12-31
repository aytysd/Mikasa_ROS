#include "MyTF.hpp"


namespace NITNC
{

void MyTF::Init
( 
    ros::NodeHandle& nh, 
    ros::NodeHandle& np,
    tf2_ros::TransformBroadcaster& TfBroadcaster,
    tf2_ros::StaticTransformBroadcaster& StaticTfBroadcaster
)
{
    m_pTfListener = new tf2_ros::TransformListener( m_TfBuffer );
    m_pTfBroadcaster = &TfBroadcaster;
    m_pStaticTfBroadcaster = &StaticTfBroadcaster;
}

void MyTF::Init
( 
    ros::NodeHandle& nh, 
    ros::NodeHandle& np,
    tf2_ros::TransformBroadcaster& TfBroadcaster
)
{
    m_pTfListener = new tf2_ros::TransformListener( m_TfBuffer );
    m_pTfBroadcaster = &TfBroadcaster;
}

void MyTF::BroadcastStaticTF
(
    std::string frame_id,
    std::string child_frame_id,
    std::array<double, 3> translation,
    double roll,
    double yaw
)
{
    geometry_msgs::TransformStamped static_tf;

    static_tf.header.stamp = ros::Time::now();
    static_tf.header.frame_id = frame_id;
    static_tf.child_frame_id = child_frame_id;
    static_tf.transform.translation.x = translation.at(0);
    static_tf.transform.translation.y = translation.at(1);
    static_tf.transform.translation.z = translation.at(2);
    tf2::Quaternion quat;
    quat.setRPY(roll, 0.0, yaw); // ここでLRFの向きを指定する. 逆さまで前方向ならM_PI, 0, 0
    static_tf.transform.rotation.x = quat.x();
    static_tf.transform.rotation.y = quat.y();
    static_tf.transform.rotation.z = quat.z();
    static_tf.transform.rotation.w = quat.w();

    m_pStaticTfBroadcaster -> sendTransform(static_tf); // 発行
}

void MyTF::LookUpSelfPos( geometry_msgs::Pose2D& SelfPos )
{
    geometry_msgs::TransformStamped transformStamped;

    try
    {
        transformStamped = m_TfBuffer.lookupTransform( "map", "base_link", ros::Time( 0 ) );
    }
    catch( tf2::TransformException& e ){}

    SelfPos.x = transformStamped.transform.translation.x;
    SelfPos.y = transformStamped.transform.translation.y;

    tf2::Quaternion q
    (
        transformStamped.transform.rotation.x,
        transformStamped.transform.rotation.y,
        transformStamped.transform.rotation.z,
        transformStamped.transform.rotation.w
    );

    tf2::Matrix3x3 m(q);
    double roll, pitch, yaw;
    m.getRPY(roll, pitch, yaw);

    SelfPos.theta = yaw;
    
}

bool MyTF::LookUpTransform( std::string frame, std::string child_frame, geometry_msgs::TransformStamped& tf )
{

    bool failed_flag = false;

    if( m_TfBuffer.canTransform( frame, child_frame, ros::Time( 0 ) ) )
    {
        
    }
    else
    {
        failed_flag = true;
        return failed_flag;
    }

    try
    {
        tf = m_TfBuffer.lookupTransform( frame, child_frame, ros::Time( 0 ) );
    }
    catch( tf2::TransformException& e ){ failed_flag = true; }

    return failed_flag;
}

double MyTF::GetTargetAngle( std::string base, std::string target )
{
    geometry_msgs::TransformStamped Base2Target;

    try
    {
        Base2Target = m_TfBuffer.lookupTransform( base, target, ros::Time( 0 ) );
    }
    catch(const std::exception& e){}
    
    double TargetAngle = atan2( Base2Target.transform.translation.y, Base2Target.transform.translation.x );// - SelfPos.theta;

    return TargetAngle;

}

double MyTF::GetTargetElevationAngle( std::string base, std::string target )
{
    geometry_msgs::TransformStamped Base2Target;

    try
    {
        Base2Target = m_TfBuffer.lookupTransform( base, target, ros::Time( 0 ) );
    }
    catch(const std::exception& e){}
    
    double distance = PositionalRelation::GetDistance( Base2Target );
    double height_dev = Base2Target.transform.translation.z;

    double TargetElevationAngle = atan2( height_dev, distance );// - SelfPos.theta;

    return TargetElevationAngle;
}

void MyTF::BroadcastSelfPos( const Pose SelfPos )
{
    BroadcastTF( "odom", "base_link", SelfPos.x, SelfPos.y, SelfPos.theta );
}

void MyTF::BroadcastSelfPos( const double x, const double y, const double theta )
{
    BroadcastTF( "odom", "base_link", x, y, theta );
}


geometry_msgs::TransformStamped MyTF::BroadcastTF( std::string base, std::string target, double x, double y, double theta )
{

    geometry_msgs::TransformStamped Base2Target;

    tf2::Quaternion quat;
    quat.setRPY( 0, 0, theta );
    
    Base2Target.header.stamp = ros::Time::now();
    Base2Target.header.frame_id = base;
    Base2Target.child_frame_id = target;
    Base2Target.transform.translation.x = x;
    Base2Target.transform.translation.y = y;
    Base2Target.transform.rotation.x = quat.x();
    Base2Target.transform.rotation.y = quat.y();
    Base2Target.transform.rotation.z = quat.z();
    Base2Target.transform.rotation.w = quat.w();

    m_pTfBroadcaster -> sendTransform( Base2Target );

    return Base2Target;

}
};
