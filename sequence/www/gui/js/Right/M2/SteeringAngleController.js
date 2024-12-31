
const K = 0.5;

M2.SteeringAngleController = 
{

    /**
     * steering angle deviation
     */
    m_SteeringAngleDev : 0,

    /**
     * 
     * @param {int} value degree
     */
    SetDisplaySteeringAngle( value )
    {
        document.getElementById("angle_status_shoot").innerHTML = value;
    },

    /**
     * 
     * @param {int} value degree
     */
    SetSteeringAngle( value, shoot_point, Target )
    {
        this.m_SteeringAngleDev = value;
        this.SetDisplaySteeringAngle( value );
        Talker.M2.SetSteeringDev( value, shoot_point, Target );
    },


    GetSteeringAngle : function()
    {
        return this.m_SteeringAngleDev;
    },

    IncrementSteeringAngle : function( depth )
    {
        if ( !( 'float_deg' in arguments.callee ) )
        {
            arguments.callee.float_deg = parseFloat( 1 - ( K / 3 ) );
        }

        arguments.callee.float_deg += depth * K;

        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();
        var CurrentTargetSpotSelectionInString = M2.TargetSpotController.GetCurrentTargetSpotSelection();

        if( arguments.callee.float_deg > 1 )
        {
            if( this.GetSteeringAngle() < 50 )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() + 1, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
                arguments.callee.float_deg = 0;
            }
        }

    },

    DecrementSteeringAngle : function( depth )
    {
        if ( !( 'float_deg' in arguments.callee ) )
        {
            arguments.callee.float_deg = parseFloat( -1 + ( K / 3 ) );
        }

        arguments.callee.float_deg += depth * K;

        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();
        var CurrentTargetSpotSelectionInString = M2.TargetSpotController.GetCurrentTargetSpotSelection();

        if( arguments.callee.float_deg < -1 )
        {
            if( this.GetSteeringAngle() > -50 )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() - 1, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString  );
                arguments.callee.float_deg = 0;
            }
        }

    },

    ResetJoyData : function()
    {
        delete this.DecrementSteeringAngle.float_deg;
        delete this.IncrementSteeringAngle.float_deg;
    },

    Init : function( CurrentShootSpotInString )
    {
        Talker.M2.GetSteeringDevFromParam
        (
            function( param )
            {
                M2.SteeringAngleController.SetSteeringAngle( RAD2DEG( param ), CurrentShootSpotInString, M2.TargetSpotController.TARGET_SPOT_ASSIGN[ CurrentShootSpotInString ][ 0 ] );
            },
            CurrentShootSpotInString,
            M2.TargetSpotController.TARGET_SPOT_ASSIGN[ CurrentShootSpotInString ][ 0 ]
        );

    }


}
