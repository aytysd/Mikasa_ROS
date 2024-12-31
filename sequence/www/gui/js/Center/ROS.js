var ShootSpotAssign = {"Sa1":0,"Sa2":1,"Sa3":2,"Sb1":3,"Sb2":4,"Ba":5,"Bb":6,"S_K1":7,"S_K2":8};
var MechanismAssign = {"M1":0,"M2":1,"M3":2,"M4":3,"M5":4,"M6":5,"M7":6,"M8":7};
var ShootPointAssign = {"a": 1, "b":2, "c":3, "d":4, "e":5};



var RedZone = false;



    Talker = {
    ros : null,
    name : "",
    DrivePowerStatusParam : null,
    CurrentShootSpotParam : null,
    M1Fire : null,
    ManualControlEnabled : null,
    PurePursuitEnabled : null,
    red_zone_param : null,
    DrivePowerStatusByGPIOParam : null,
    ElevationAngleDevParam : null,
    TargetSpotParam : null,
    red_zone : true,
    ManualShootSpotServerActivatePublisher : null,
    ManualShootSpotServer : false,
    ManualParam4TapeLED : null,
    init : function(){

        this.ros = new ROSLIB.Ros();

        this.ros.connect('ws://' + location.hostname + ':9090');
        
        this.red_zone_param = new ROSLIB.Param({
            ros : this.ros,
            name : 'red_zone'
        });


        this.DrivePowerStatusParam = new ROSLIB.Param({
            ros: this.ros,
            name : '/DrivePoweredOn'
        }),

        this.ManualShootSpotServerActivatePublisher = new ROSLIB.Topic({
            ros : this.ros,
            name : '/ManualControl/ActivateShootSpot',
            messageType : 'std_msgs/UInt8'
        });

        var DestinationArrivalSubscriber = new ROSLIB.Topic({
            ros : this.ros,
            name : '/DestinationArrival',
            messageType : 'std_msgs/Empty'
        });

        this.DrivePowerStatusByGPIOParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/DrivePoweredOnByGPIO'
        });

        // this.DrivePowerStatusByGPIOParam.get( function( param ) {
        //     UI.SetUsable( param );
        // });

        this.CurrentShootSpotParam = new ROSLIB.Param({
            ros: this.ros,
            name: '/CurrentShootSpot'
        });

        this.M1Fire = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M1/fire'
        });

        this.TargetSpotParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M1/where'
        });


        this.CurrentShootSpotParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/CurrentShootSpot'
        });

        this.PurePursuitEnabled = new ROSLIB.Param({
            ros : this.ros,
            name : '/PurePursuit/Enabled'
        });

        this.ManualControlEnabled = new ROSLIB.Param({
            ros : this.ros,
            name : '/ManualControl/Enabled'
        });

        this.ElevationAngleDevParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M1/ElevationAngle'
        });

        this.ManualParam4TapeLED = new ROSLIB.Param({
            ros : this.ros,
            name : '/ManualControl/ActivateManualShootSpotServer'
        });


        this.red_zone_param.get(function(param){
            RedZone = param;
            Talker.red_zone = param;

            document.getElementById("red_zone").checked = RedZone;
            document.getElementById("blue_zone").checked = !RedZone;
            if(RedZone)
            {
                ShootSpotController.SetCurrentShootPointSelection( 'a' );
            }
            else
            {
                ShootSpotController.SetCurrentShootPointSelection( 'e' );
            }
        
        } );

        this.ManualControlEnabled.get( function( param ){
            if(param){
                document.getElementById("ManualControl").innerHTML = "有効";
            }else{
                document.getElementById("ManualControl").innerHTML = "無効";
            }
        });

        this.PurePursuitEnabled.get( function( param ){
            if(param){
                document.getElementById("AutoControl").innerHTML = "有効";
            }else{
                document.getElementById("AutoControl").innerHTML = "無効";
            }

        });

        this.ros.on('error', function(error) {
            document.getElementById('rosbridge_status').innerHTML = "Error";
        });
        this.ros.on('connection', function(error) {
            document.getElementById('rosbridge_status').innerHTML = "Connect";
        });
        this.ros.on('close', function(error) {
            document.getElementById('rosbridge_status').innerHTML = "Close";
        });


        var ControllerLockDisableSubscriber = new ROSLIB.Topic({
            ros : this.ros,
            name : '/Retry',
            messageType : 'std_msgs/Empty'
        });

        ControllerLockDisableSubscriber.subscribe( this.ControllerLockDisableCallback );



        DestinationArrivalSubscriber.subscribe( this.DestinationArrivalCallback );

    },

    ControllerLockDisableCallback : function( msg )
    {
        GamePad.Enable();
    },

    EmergencySignalSendingCallback : function( msg )
    {
        // alert( 'sending' );
    },

    DestinationArrivalCallback : function( msg )
    {
        ManualController.m_f_Enabled = true;
    },


    ManualCommandSend:function(x,y,angle){

        let pub = new ROSLIB.Topic({
            ros : this.ros,
            name : '/ManualControl',
            messageType : 'stm32interface/ManualControl'
        });

        let command = new ROSLIB.Message(
            {
                Vx: x,
                Vy: y,
                TargetAttitudeAngle: angle
            }
        );

        pub.publish( command );


    },

    TogglePurePursuitEnabled : function( func )
    {

        this.PurePursuitEnabled.get( function( param ){

            if( param )
            {

                Talker.ManualShootSpotServer = true;

                Talker.PurePursuitEnabled.set( false );
                Talker.ManualControlEnabled.set( true );

                ManualController.m_f_Enabled = true;

                var CurrentShootSpot = ShootSpotController.GetCurrentShootSpotSelectionInInt();

                let command = new ROSLIB.Message( { data : CurrentShootSpot } );
                Talker.ManualShootSpotServerActivatePublisher.publish( command );

                let pub = new ROSLIB.Topic({
                    ros : Talker.ros,
                    name : '/ManualControl/ActivateManualShootSpotServer',
                    messageType : 'std_msgs/UInt8'
                });

                let movement_command = new ROSLIB.Message( { data : CurrentShootSpot } );

                Talker.ManualParam4TapeLED.set( true );
                
        
                pub.publish( movement_command );

            }
            else
            {
                Talker.ManualControlEnabled.set( false );
                Talker.PurePursuitEnabled.set( true );
    
                ManualController.m_f_Enabled = false;

            }

            func( !param );
        })

    },


    PurePursuitEnable : function()
    {
        this.ManualControlEnabled.set( false );
        this.PurePursuitEnabled.set( true );

        ManualController.m_f_Enabled = false;

        Talker.ManualShootSpotServer = false;

        Talker.ManualParam4TapeLED.set( false );

    },




    EmergencyStop: function(){
        console.log( "EmergencyStop" );
        var command = new ROSLIB.Message({
            data : false
        });

        let pub = new ROSLIB.Topic({
            ros : this.ros,
            name : '/EmergencyStop',
            messageType : 'std_msgs/Bool'
        });

        pub.publish( command );
    },

    EmergencyStart: function(){
        console.log( "EmergencyStart" );

        var command = new ROSLIB.Message({
            data : true
        });

        let pub = new ROSLIB.Topic({
            ros : this.ros,
            name : '/EmergencyStop',
            messageType : 'std_msgs/Bool'
        });


        pub.publish( command );

    },


    AutoReturn:function
    (
        {
            route,
            where
        }
    )
    {
        this.PurePursuitEnable();

        let pub = new ROSLIB.Topic({
            ros : this.ros,
            name : '/movement_command',
            messageType : 'sequence/MovementCommand'
        });

        let command = new ROSLIB.Message(
            {
                where: where,
                red_zone: this.red_zone,
                route: route,
                ToShootSpot: false,
                speed_multiplier: 1.0,
                k: 0.5
            }
        );
        

        pub.publish(command);

    },
    AutoOutward:function
    (
        {
            route,
            where
        }
    )
    {
        this.PurePursuitEnable();


        let pub = new ROSLIB.Topic({
            ros : this.ros,
            name : '/movement_command',
            messageType : 'sequence/MovementCommand'
        });

        let command = new ROSLIB.Message(
            {
                where: where,
                red_zone: this.red_zone,
                route: route,
                ToShootSpot: true,
                speed_multiplier: 1.0,
                k: 0.5
            }
        );

        pub.publish(command);

    },

    GetDrivePowerStatus : function( callback_func )
    {
        this.DrivePowerStatusParam.get( callback_func );
    },

    GetDrivePowerStatusByGPIO : function( callback_func )
    {
        this.DrivePowerStatusByGPIOParam.get( callback_func );
    },

    SetTargetSpot : function( TargetSpot )
    {
        this.TargetSpotParam.set( TargetSpot );
    },

    ShootStart : function(speed,shoot_point){
        this.M1Fire.set( true, function(){} );
    },

    SetShootSpeed : function( speed, shoot_point ,Target )
    {

        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M1/' + Target + '/velocity'
        });

        Param.set( parseFloat( speed ) / 1000.0 );
    },

    ShootStop : function(){

        this.M1Fire.set( false, function(){} );

    },

    SetSteeringDev : function( dev, shoot_point, Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M1/' + Target + '/SteeringDev'
        });

        Param.set( DEG2RAD( dev ) );

    },

    /**
     * 
     * @param {int} angle degree
     * @param {string} Target e.x. Sa1,Sa2.....
     * @param {string} shoot_point a, b, c, d, or e
     */
    SetElevationAngle : function( angle,shoot_point,Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M1/' + Target + '/ElevationAngle'
        });


        Param.set( DEG2RAD( parseInt( angle ) ) );
    },



    /**
     * To get speed parameter from rosparam
     * e.x Talker.GetSpeedFromParam( function( param ){ UI.speed_data = param }, "a", "Sa1" );
     * @param {function} func function to be called after getting parameter. argument 'param' is m/s
     * @param {string} shoot_point a, b, c, d, or e
     * @param {string} Target like Sa1, Sa2, Sa3......
     */
    GetSpeedFromParam : function( func, shoot_point, Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M1/' + Target + '/velocity'
        })

        Param.get( func );
    },

    /**
     * 
     * @param {function} func function to be called after getting parameter
     * @param {string} shoot_point a, b, c, d, or e
     * @param {string} Target like Sa1, Sa2, Sa3........
     */
    GetElevationFromParam :function(func,shoot_point,Target)
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M1/' + Target + '/ElevationAngle'
        });


        Param.get( func );

    },

    GetSteeringDevFromParam : function( func, shoot_point, Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M1/' + Target + '/SteeringDev'
        });


        Param.get( func );

    }


}
Talker.init();

// window.onload = function(){
// };
window.onunload = function(){
    Talker.ros.close();
};


