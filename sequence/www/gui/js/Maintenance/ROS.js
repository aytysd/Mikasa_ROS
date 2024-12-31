
var ServoTIMCorr = { "tim2_ch1": 0, "tim2_ch2": 1, "tim2_ch3": 2, "tim3_ch1": 3, "tim3_ch2": 4, "tim3_ch3": 5 };

var Talker;

const MechNum = 6;

if(!Talker){
    
        Talker = {
        ros : null,
        name : "",
        DriveMotorPublisher : null,
        DriveServoPublisher : null,
        SwerveSteeringDrivePublisher : null,
        SwerveSteeringSteeringPublisher : null,
        ElevationAngleMDPublisher : null,
        Servo1Command : null,
        Servo2Command : null,
        Servo3Command : null,
        SendOutServoCANIDs : Array( MechNum ),
        SendOutServoTIMs : Array( MechNum ),
        SteeringServoCANIDs : Array( MechNum ),
        SteeringServoTIMs : Array( MechNum ),
        MotorCANIDs : Array( MechNum ),
        ElevationAngleMDCANIDs : Array( 3 ),
        init : function(){

            this.ros = new ROSLIB.Ros();

            this.ros.connect('ws://' + location.hostname + ':9090');
            
            this.ros.on('error', function(error) {
                document.getElementById('rosbridge_status').innerHTML = "Error";
            });
            this.ros.on('connection', function(error) {
                document.getElementById('rosbridge_status').innerHTML = "Connect";
            });
            this.ros.on('close', function(error) {
                document.getElementById('rosbridge_status').innerHTML = "Close";
            });

            this.DriveMotorPublisher = new ROSLIB.Topic({
                ros : this.ros,
                name : '/MechanismMDCommand',
                messageType : 'stm32interface/MD'
            });

            this.DriveServoPublisher = new ROSLIB.Topic({
                ros : this.ros,
                name : '/ServoCommand',
                messageType : 'stm32interface/Servo'
            });

            this.SwerveSteeringDrivePublisher = new ROSLIB.Topic({
                ros : this.ros,
                name : '/SwerveSteering/Drive',
                messageType : 'stm32interface/SingleUnderCarriageDriveMD'
            });

            this.SwerveSteeringSteeringPublisher = new ROSLIB.Topic({
                ros : this.ros,
                name : '/SwerveSteering/Steering',
                messageType : 'stm32interface/SingleUnderCarriageSteeringMD'
            });

            this.ElevationAngleMDPublisher = new ROSLIB.Topic({
                ros : this.ros,
                name : '/ElevationAngleMD/Command',
                messageType : 'stm32interface/ElevationAngleMD'
            });

            this.Servo1Command = new ROSLIB.Message({
                canid : 2,
                value : new Array( 90, 0, 90, 90, 90, 90 )
            });

            this.Servo2Command = new ROSLIB.Message({
                canid : 3,
                value : new Array( 90, 90, 90, 90, 90, 90 )
            });

            this.Servo3Command = new ROSLIB.Message({
                canid : 4,
                value : new Array( 90, 90, 90, 90, 90, 90 )
            });

            for( let i = 0; i < MechNum; i++ )
            {
            
                var P_MDCANID = new ROSLIB.Param({
                    ros : this.ros,
                    name : '/shoot_spot_node/StaticShootParam/M' + i + '/MD_CANID'
                });

                P_MDCANID.get( function( param ){
                    Talker.MotorCANIDs[ i ] = param;
                });

                var P_SendOutServoCANID = new ROSLIB.Param({
                    ros : this.ros,
                    name : '/shoot_spot_node/StaticShootParam/M' + i + '/SendOutServoCANID'
                });


                P_SendOutServoCANID.get( function( CANID ){
                    Talker.SendOutServoCANIDs[ i ] = CANID;        
                })

                var P_SendOutServoTIM = new ROSLIB.Param({
                    ros : Talker.ros,
                    name : '/shoot_spot_node/StaticShootParam/M' + i + '/SendOutServoTIM'
                });

                P_SendOutServoTIM.get( function( param ){
                    Talker.SendOutServoTIMs[ i ] = param;
                });

                var P_SteeringServoCANID = new ROSLIB.Param({
                    ros : this.ros,
                    name : '/shoot_spot_node/StaticShootParam/M' + i + '/SteeringServoCANID'
                });

                P_SteeringServoCANID.get( function( param ){
                    Talker.SteeringServoCANIDs[ i ] = param;
                });

                var P_SteeringServoTIM = new ROSLIB.Param({
                    ros : this.ros,
                    name : '/shoot_spot_node/StaticShootParam/M' + i + '/SteeringServoTIM',
                })

                P_SteeringServoTIM.get( function( param ){
                    Talker.SteeringServoTIMs[ i ] = param;
                })

            }

            for( let i = 0; i < 3; i++ )
            {
                var P_ElevationAngleMDCANID = new ROSLIB.Param({
                    ros : this.ros,
                    name : '/shoot_spot_node/StaticShootParam/M' + i + '/ElevationAngleMDCANID'
                });

                P_ElevationAngleMDCANID.get( function( param ){
                    Talker.ElevationAngleMDCANIDs[ i ] = param;
                })
            }
    
        },


        DriveUnderCarriageSteeringMotor( angle, num )
        {

            var command = new ROSLIB.Message({
                canid : 0,
                theta : Math.PI * angle / 180.0
            });

            switch( num )
            {
            case 1:
                command.canid = 2;
                break;
            case 2:
                command.canid = 3;
                break;
            case 3:
                command.canid = 4;
                break;
            case 4:
                command.canid = 5;
                break;
            }

            this.SwerveSteeringSteeringPublisher.publish( command );
        },

        DriveUnderCarriageDriveMotor( velocity_, num )
        {
            console.log("CarriageMoter:"+velocity_)

            var command = new ROSLIB.Message({
                canid : null,
                velocity : velocity_ / 1000.0
            });

            switch( num )
            {
            case 1:
                command.canid = 2;
                break;
            case 2:
                command.canid = 3;
                break;
            case 3:
                command.canid = 4;
                break;
            case 4:
                command.canid = 5;
                break;
            };

            this.SwerveSteeringDrivePublisher.publish( command );
        },

        StopUnderCarriageDriveMotor( num )
        {
            var command = new ROSLIB.Message({
                canid : null,
                velocity : 0
            });

            switch( num )
            {
            case 1:
                command.canid = 2;
                break;
            case 2:
                command.canid = 3;
                break;
            case 3:
                command.canid = 4;
                break;
            case 4:
                command.canid = 5;
                break;
            };

            this.SwerveSteeringDrivePublisher.publish( command );
        },

        SetElevationAngle( angle, mech_num )
        {
            // console.log( mech_num );
            console.log("ElevationAngle:"+ angle );

            var CANID = this.ElevationAngleMDCANIDs[ mech_num ];

            var command = new ROSLIB.Message({
                canid : CANID,
                ElevationAngle : Math.PI * ( angle / 180.0 )
            });

            this.ElevationAngleMDPublisher.publish( command );
            
        },

        DriveMotor( velocity, MotorNum )
        {
            console.log("velocity:"+velocity);
            let command = new ROSLIB.Message({
                can_id : this.MotorCANIDs[ MotorNum ],
                speed : velocity / 1000.0
            });

            Talker.DriveMotorPublisher.publish( command );

        },

        StopMotor( MotorNum )
        {
            let command = new ROSLIB.Message({
                can_id : this.MotorCANIDs[ MotorNum ],
                speed : 0
            });

            Talker.DriveMotorPublisher.publish( command );
        },

        DriveSendOutServo( velocity, MechNum )
        {
            // velocity = 144;

            var ServoCANID = this.SendOutServoCANIDs[ MechNum ];
            var ServoTIM = this.SendOutServoTIMs[ MechNum ]

            switch( ServoCANID )
            {
            case 2:
            {
                Talker.Servo1Command.value[ ServoTIMCorr[ ServoTIM ] ] = parseInt( velocity );
                Talker.DriveServoPublisher.publish( Talker.Servo1Command );
                break;
            }
            case 3: 
            {
                Talker.Servo2Command.value[ ServoTIMCorr[ ServoTIM ] ] = parseInt( velocity );
                Talker.DriveServoPublisher.publish( Talker.Servo2Command );
                break;
            }
            case 4: 
            {
                Talker.Servo3Command.value[ ServoTIMCorr[ ServoTIM ] ] = parseInt( velocity );
                Talker.DriveServoPublisher.publish( Talker.Servo3Command );
                break;
            }
            }

        },

        StopSendOutServo( MechNum )
        {

            var ServoCANID = this.SendOutServoCANIDs[ MechNum ];
            var ServoTIM = this.SendOutServoTIMs[ MechNum ]


            switch( ServoCANID )
            {
            case 2:
            {
                Talker.Servo1Command.value[ ServoTIMCorr[ ServoTIM ] ] = 90;
                Talker.DriveServoPublisher.publish( Talker.Servo1Command );
                break;
            }
            case 3: 
            {
                Talker.Servo2Command.value[ ServoTIMCorr[ ServoTIM ] ] = 90;
                Talker.DriveServoPublisher.publish( Talker.Servo2Command );
                break;
            }
            case 4: 
            {
                Talker.Servo3Command.value[ ServoTIMCorr[ ServoTIM ] ] = 90;
                Talker.DriveServoPublisher.publish( Talker.Servo3Command );
                break;
            }
            }

                
    
        },

        DriveSteeringServo( angle, MechNum )
        {
            console.log("SteeringAngle:"+angle);
            var ServoCANID = this.SteeringServoCANIDs[ MechNum ];
            var ServoTIM = this.SteeringServoTIMs[ MechNum ]

            if( MechNum == 1 )
            {
                angle = Mechanism.SteeringAngleController.pointFiveResolutionFormat( angle );
            }

            switch( ServoCANID )
            {
            case 2:
            {
                Talker.Servo1Command.value[ ServoTIMCorr[ ServoTIM ] ] = angle;
                Talker.DriveServoPublisher.publish( Talker.Servo1Command );
                break;
            }
            case 3: 
            {
                Talker.Servo2Command.value[ ServoTIMCorr[ ServoTIM ] ] = angle;
                Talker.DriveServoPublisher.publish( Talker.Servo2Command );
                break;
            }
            case 4: 
            {
                Talker.Servo3Command.value[ ServoTIMCorr[ ServoTIM ] ] = angle;
                Talker.DriveServoPublisher.publish( Talker.Servo3Command );
                break;
            }
            }

        }
                
    
    }
    Talker.init();

    // window.onload = function(){
    // };
    window.onunload = function(){
        Talker.ros.close();
    };
}
// export default Talker;

function DEG2RAD( deg )
{
    return Math.PI * deg / 180.0;
}

function RAD2DEG( rad )
{
    return 180.0 * rad / Math.PI;
}

function PLUSMINUS( num )
{
    if( num <  0 )
    {
        return -1;
    }
    else
    {
        return 1;
    }
}