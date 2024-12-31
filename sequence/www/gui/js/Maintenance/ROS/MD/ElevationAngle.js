MD.ElevationAngle = class
{
    constructor( ros )
    {
        this.ros = ros;

        this.ElevationAngleMDPublisher = new ROSLIB.Topic({
            ros : this.ros,
            name : '/MechanismMDCommand',
            messageType : 'stm32interface/MD'
        });

        this.MDCANID = {};

        for( let i = 0; i < 3; i++ )
        {
            var ElevationAngleMDCANIDParam = new ROSLIB.Param({
                ros : this.ros,
                name : '/shoot_spot_node/StaticShootParam/M' + i + '/ElevationAngleMDCANID'
            });

            ElevationAngleMDCANIDParam.get( function( param ){
                Talker.MDCANID[ 'M' + i ] = param;
            })


        }
    
    }

    SetElevationAngle( angle, MInString )
    {
        var CANID = this.MDCANID[ MInString ];

        var command = new ROSLIB.Message({
            canid : CANID,
            ElevationAngle : DEG2RAD( angle )
        });

        this.ElevationAngleMDPublisher.publish( command );
        
        console.log( MInString );
        console.log( angle );
    }



}