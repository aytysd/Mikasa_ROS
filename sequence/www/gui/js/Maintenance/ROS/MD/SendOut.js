MD.SendOut = class
{
    constructor( ros )
    {
        this.ros = ros;

        this.MotorPublisher = new ROSLIB.Topic({
            ros : this.ros,
            name : '/MechanismMDCommand',
            messageType : 'stm32interface/MD'
        });

        this.MDCANID = {};

        for( let i = 0; i < MechNum; i++ )
        {
            var MDCANIDParam = new ROSLIB.Param({
                ros : this.ros,
                name : '/shoot_spot_node/StaticShootParam/M' + i + '/MD_CANID'
            });

            MDCANIDParam.get( function( param ){
                this.MotorCANIDs[ i ] = param;
            });


        }
    
    }

    Drive( velocity, MotorNum )
    {
        let command = new ROSLIB.Message({
            can_id : this.MotorCANIDs[ MotorNum ],
            speed : velocity / 1000.0
        });

        this.MotorPublisher.publish( command );

    }


    StopMotor( MotorNum )
    {
        let command = new ROSLIB.Message({
            can_id : this.MotorCANIDs[ MotorNum ],
            speed : 0
        });

        this.MotorPublisher.publish( command );
    }



}