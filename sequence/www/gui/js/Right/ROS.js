

    
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
    M2 : null,
    M4 : null,
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


        var DiagnosticsSubscriber = new ROSLIB.Topic({
            ros : this.ros,
            name : '/diagnostics',
            messageType : 'diagnostic_msgs/DiagnosticArray'
        });

        this.M2 = new M2ROS( this.ros );
        this.M4 = new M4ROS( this.ros );

        var RedZoneParam = new ROSLIB.Param({
            ros : this.ros,
            name : 'red_zone'
        })


        RedZoneParam.get
        (
            function( param )
            {
                Talker.red_zone = param;                
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


    DiagnosticsCallback( msg )
    {
        for( var i = 0; i < msg.status.length; i++ )
        {
            var status = msg.status[ i ];

            switch( status.name )
            {
            case 'serial_handler: Serial':
                this.SerialStatus = status;
                document.getElementById("serial_handler").innerHTML = this.SerialStatus.message;

                if( this.SerialStatus.level >= 1 && ( !this.Alerted[0] ) )
                {
                    alert( this.SerialStatus.message );
                }
                else
                {
                    this.Alerted[ 0 ] = true;
                }

                break;
            case 'CAN1: /CAN1':
                this.CAN1Status = status;
                document.getElementById("can1").innerHTML = this.CAN1Status.message;
                break;
            case 'CAN2: /CAN2':
                this.CAN2Status = status;
                document.getElementById("can2").innerHTML = this.CAN2Status.message;
                break;
            case 'amcl: Standard deviation':
                this.AMCLStatus = status;
                document.getElementById("amcl").innerHTML =  this.AMCLStatus.message ;
                break;
            case 'scan_right: Hardware Status':
                this.RightScanStatus = status;
                document.getElementById("scan_right").innerHTML = this.RightScanStatus.message;
                break;
            case 'scan_left: Hardware Status':
                this.LeftScanStatus = status;
                document.getElementById("scan_left").innerHTML = this.LeftScanStatus.message;
                break;
            default:
                break;
            };
        }

    },

    MovementCommandCallback( msg )
    {
        M4.SteeringAngleController.ResetSteeringAngle();
        M4.FireStatusController.SetFireStatus( false );

        M2.FireStatusController.SetFireStatus( false );    
        
        Talker.m_CurrentShootSpotInString = SHOOTSPOT_INDEX2STRING[ msg.where ];
        M2.TargetSpotController.SetTargetSpot( SHOOTSPOT_INDEX2STRING[ msg.where ] );

        // M4.TargetSpotController.SetShootSpotChecked( 0 );
        M4.TargetSpotController.SetDefaultShootSpotChecked( msg.where );
        // GamePad.SetActionMode( Shoot );
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

