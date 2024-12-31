class M2ROS
{

    constructor( ros )
    {
        this.ros = ros;


        this.FireParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M2/fire'
        });

        this.TargetSpotParam = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam/M2/where'
        });



    }

    SetShootSpeed( speed, shoot_point ,Target )
    {

        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M2/' + Target + '/velocity'
        });

        Param.set( parseFloat( speed ) / 1000.0 );
    }

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


    SetSteeringDev( dev, shoot_point, Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M2/' + Target + '/SteeringDev'
        });

        Param.set( DEG2RAD( dev ) );

    }

    /**
     * 
     * @param {int} angle degree
     * @param {string} Target e.x. Sa1,Sa2.....
     * @param {string} shoot_point a, b, c, d, or e
     */
    SetElevationAngle( angle,shoot_point,Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M2/' + Target + '/ElevationAngle'
        });


        Param.set( DEG2RAD( parseInt( angle ) ) );
    }

    /**
     * To get speed parameter from rosparam
     * e.x Talker.GetSpeedFromParam( function( param ){ UI.speed_data = param }, "a", "Sa1" );
     * @param {function} func function to be called after getting parameter. argument 'param' is m/s
     * @param {string} shoot_point a, b, c, d, or e
     * @param {string} Target like Sa1, Sa2, Sa3......
     */
    GetSpeedFromParam( func, shoot_point, Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M2/' + Target + '/velocity'
        })

        Param.get( func );
    }

    /**
         * 
         * @param {function} func function to be called after getting parameter
         * @param {string} shoot_point a, b, c, d, or e
         * @param {string} Target like Sa1, Sa2, Sa3........
         */
    GetElevationFromParam(func,shoot_point,Target)
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M2/' + Target + '/ElevationAngle'
        });


        Param.get( func );

    }

    GetSteeringDevFromParam( func, shoot_point, Target )
    {
        var ShootPoint = ShootPointAssign[ shoot_point ];

        var Param = new ROSLIB.Param({
            ros : this.ros,
            name : '/shoot_spot_node/DynamicShootParam' + ShootPoint + '/M2/' + Target + '/SteeringDev'
        });


        Param.get( func );

    }

}
