class M3ROS
{

    constructor( ros )
    {
        this.ros = ros;
        this.SteeringAngleDevParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M3/SteeringDev'
        });

        this.FireParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M3/fire'
        });

        this.TargetSpotParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M3/where'
        });

        this.VelocityParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M3/velocity'
        });


    }

    /**
     * to set shoot down speed
     * @param {int} speed mm/s
     */
    SetShootSpeed( speed, shoot_point ,Target )
    {

        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M3/' + Target + '/velocity'
        });

        Param.set( parseFloat( speed ) / 1000.0 );
    }

    /**
     * 
     * @param {string} TargetSpot target spot in string
     */
    SetTargetSpot( TargetSpot )
    {
        this.TargetSpotParam.set( TargetSpot );
    }

    ShootStart()
    {
        this.FireParam.set( true, function(){} );
    }


    ShootStop()
    {
        this.FireParam.set( false, function(){} );
    }


    SetSteeringAngleDev( angle )
    {
        console.log("M3ThetaDeb:"+angle);
        this.SteeringAngleDevParam.set( DEG2RAD( angle ) );
    }

    /**
     * To get speed parameter from rosparam
     * e.x Talker.GetSpeedFromParam( function( param ){ UI.speed_data = param }, "a", "Sa1" );
     * @param {function} func function to be called after getting parameter. argument 'param' is m/s
     * @param {string} shoot_point a, b, c, d, or e
     * @param {string} Target like Sa1, Sa2, Sa3......
     */
    GetSpeedFromParam( func, shoot_point,Target )
    {

        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M3/' + Target + '/velocity'
        })

        Param.get( func );
    }


}
