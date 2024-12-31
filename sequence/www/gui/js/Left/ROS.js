

    
Talker = {
    ros : null,
    name : "",
    SerialStatus : null,
    CAN1Status : null,
    CAN2Status : null,
    AMCLStatus : null,
    RightScanStatus : null,
    LeftScanStatus : null,
    m_CurrentShootSpotInString : 'a',
    M0 : null,
    M3 : null,
    red_zone : true,
    CurrentShootSpotParam : null,
    init : function(){

        this.ros = new ROSLIB.Ros();

        this.ros.on('error', function(error) {
            document.getElementById('rosbridge_status').innerHTML = "Error";
        });
        this.ros.on('connection', function(error) {
            document.getElementById('rosbridge_status').innerHTML = "Connect";
        });
        this.ros.on('close', function(error) {
            document.getElementById('rosbridge_status').innerHTML = "Close";
        });
        this.ros.connect('ws://' + location.hostname + ':9090');

        this.CurrentShootSpotParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/CurrentShootSpot'
        });

        var MovementCommandSubscriber = new ROSLIB.Topic({
            ros : this.ros,
            name : '/movement_command',
            messageType : 'sequence/MovementCommand'
        });

        MovementCommandSubscriber.subscribe( this.MovementCommandCallback );

        var ManualModeNotificationSubscriber = new ROSLIB.Topic({
            ros : this.ros,
            name : '/ManualControl/ActivateManualShootSpotServer',
            messageType : 'std_msgs/UInt8'
        });

        ManualModeNotificationSubscriber.subscribe( this.ManualModeNotificationCallback );

        this.M0 = new M0ROS( this.ros );
        this.M3 = new M3ROS( this.ros );

        var RedZoneParam = new ROSLIB.Param({
            ros : this.ros,
            name : 'red_zone'
        })


        RedZoneParam.get
        (
            function( param )
            {
                Talker.red_zone = param;
                
                if( param )
                {
                    Talker.m_CurrentShootSpotInString = 'a';
                }
                else
                {
                    Talker.m_CurrentShootSpotInString = 'e';
                }
            }
        );


        // DiagnosticsSubscriber.subscribe( this.DiagnosticsCallback );

    },

    ManualModeNotificationCallback( msg )
    {

        let movement_command = new ROSLIB.Message(
            {
                where: msg.data,
                red_zone: Talker.red_zone,
                route: 1,
                ToShootSpot: true,
                speed_multiplier: 1.0,
                k: 0.5
            }
        );

        Talker.MovementCommandCallback( movement_command );

    },


    MovementCommandCallback( msg )
    {
        M3.SteeringAngleController.ResetSteeringAngle();
        M3.FireStatusController.SetFireStatus( false );

        M0.FireStatusController.SetFireStatus( false );    
        
        Talker.m_CurrentShootSpotInString = SHOOTSPOT_INDEX2STRING[ msg.where ];
        M0.TargetSpotController.SetTargetSpot( SHOOTSPOT_INDEX2STRING[ msg.where ] );
    
        // M3.TargetSpotController.SetShootSpotChecked( 0 );
        M3.TargetSpotController.SetDefaultShootSpotChecked( msg.where );
    },

    GetCurrentShootSpotInString : function()
    {
        return this.m_CurrentShootSpotInString;
    },

    GetRedZone : function()
    {
        return this.red_zone;
    }

    
}


window.onunload = function(){
    Talker.ros.close();
};

