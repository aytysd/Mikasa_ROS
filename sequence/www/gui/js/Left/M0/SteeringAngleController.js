
const K = 0.4;

M0.SteeringAngleController = 
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
        Talker.M0.SetSteeringDev( value, shoot_point, Target );
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
        var CurrentTargetSpotSelectionInString = M0.TargetSpotController.GetCurrentTargetSpotSelection();

        if( arguments.callee.float_deg > 1 )
        {
            if( this.GetSteeringAngle() < STEERINGANGLE_MAX )
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
        var CurrentTargetSpotSelectionInString = M0.TargetSpotController.GetCurrentTargetSpotSelection();

        if( arguments.callee.float_deg < -1 )
        {
            if( this.GetSteeringAngle() > STEERINGANGLE_MIN )
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
        Talker.M0.GetSteeringDevFromParam
        (
            function( param )
            {
                M0.SteeringAngleController.SetSteeringAngle( RAD2DEG( param ), CurrentShootSpotInString, M0.TargetSpotController.TARGET_SPOT_ASSIGN[ CurrentShootSpotInString ][ 0 ] );
            },
            CurrentShootSpotInString,
            M0.TargetSpotController.TARGET_SPOT_ASSIGN[ CurrentShootSpotInString ][ 0 ]
        );

    }


}
