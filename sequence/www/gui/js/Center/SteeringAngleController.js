
const K = 0.1;

SteeringAngleController = 
{

    /**
     * steering angle deviation
     */
    m_SteeringAngleDev : 90,

    /**
     * 
     * @param {int} value degree
     */
    SetDisplaySteeringAngle( value )
    {
        document.getElementById("angle_range").value = (value-90)*-1+90;
        document.getElementById("ui_Angle").innerHTML = value;
    },

    /**
     * 
     * @param {int} value degree
     */
    SetSteeringAngle( value, shoot_point, Target )
    {
        this.m_SteeringAngleDev = value;
        this.SetDisplaySteeringAngle( value );
        Talker.SetSteeringDev( value, shoot_point, Target );
    },

    ResetSteeringAngle : function()
    {
        this.SetSteeringAngle( 90 );
    },

    GetSteeringAngle : function()
    {
        return this.m_SteeringAngleDev;
    },

    IncrementSteeringAngle : function( depth )
    {
        if ( !( 'float_deg' in arguments.callee ) )
        {
            arguments.callee.float_deg = parseFloat( 0.95 );
        }

        var CurrentShootSpotSelectionInString = ShootSpotController.GetCurrentShootSpotSelection();
        var CurrentTargetSpotSelectionInString = TargetSpotController.GetCurrentTargetSpotSelection();

        arguments.callee.float_deg += depth * K;

        if( arguments.callee.float_deg > 1 )
        {
            if( this.GetSteeringAngle() > -20 )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() - 0.5, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
                arguments.callee.float_deg = 0;
            }
        }

    },

    DecrementSteeringAngle : function( depth )
    {
        if ( !( 'float_deg' in arguments.callee ) )
        {
            arguments.callee.float_deg = parseFloat( -0.95 );
        }

        var CurrentShootSpotSelectionInString = ShootSpotController.GetCurrentShootSpotSelection();
        var CurrentTargetSpotSelectionInString = TargetSpotController.GetCurrentTargetSpotSelection();

        arguments.callee.float_deg += depth * K;

        if( arguments.callee.float_deg < -1 )
        {
            if( this.GetSteeringAngle() < 20 )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() + 0.5, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString  );
                arguments.callee.float_deg = 0;
            }
        }

    },


    ResetJoyData : function()
    {
        delete this.DecrementSteeringAngle.float_deg;
        delete this.IncrementSteeringAngle.float_deg;
    },


}