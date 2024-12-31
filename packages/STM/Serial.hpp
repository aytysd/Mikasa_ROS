#pragma once

#include <ros/ros.h>
#include <geometry_msgs/Pose2D.h>
#include <tf2_ros/transform_broadcaster.h>
#include <tf2_ros/transform_listener.h>
#include <tf2_ros/static_transform_broadcaster.h>
#include <diagnostic_updater/diagnostic_updater.h>
#include <geometry_msgs/Pose2D.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>

#include <string>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <thread>
#include <chrono>
#include <poll.h>

#include "CharacterManipulation.hpp"
#include "Conversion.hpp"
#include "MyTF.hpp"

typedef struct pollfd pollfd_t;

namespace NITNC
{

typedef struct StructSerialConfig
{
    int fd;
    std::string DeviceName;
    struct termios conf_tio = { 0 };
    int baud_rate = false;
    double PollingRate;
} SerialConfig_t;

class Serial : public CharacterManipulation, public MyTF
{
private:

    ros::NodeHandle* m_p_nh;

    ros::Publisher m_SelfPosPublisher;
    ros::Subscriber m_SimSelfPosSubscriber;

    ros::Timer timer_;

    diagnostic_updater::Updater* m_p_updater;

    pollfd_t fds_;
    SerialConfig_t serial_config_;

    std::string RxChunkData_;

    virtual void TimerCallback( const ros::TimerEvent& e );
    void SimSelfPosCallback( const geometry_msgs::Pose2D& msg );

    void SerialDiagnostic(diagnostic_updater::DiagnosticStatusWrapper& stat);
    // void ReconfigureCallback( )


    int error_limit;
    int warn_limit;
    double dev_tolerance;
    int DiagnosticCounter = 0;

public:

    Serial()
    {}

    virtual void Init( ros::NodeHandle& nh, ros::NodeHandle& np, tf2_ros::TransformBroadcaster& TfBroadcaster, diagnostic_updater::Updater& updater );
};

};


