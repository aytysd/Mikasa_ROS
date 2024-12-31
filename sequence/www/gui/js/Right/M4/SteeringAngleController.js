

M4.SteeringAngleController = 
{
    K : 0.6,

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
        document.getElementById("angle_status_shootdown").innerHTML = value;
    },

    /**
     * 
     * @param {int} value degree
     */
    SetSteeringAngle( value )
    {
        this.m_SteeringAngleDev = value;
        this.SetDisplaySteeringAngle( value );
        Talker.M4.SetSteeringAngleDev( value );
    },

    ResetSteeringAngle : function()
    {
        this.SetSteeringAngle( 0 );
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

        if( arguments.callee.float_deg > 1 )
        {
            if( this.GetSteeringAngle() < 20 )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() + 1 );
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

        if( arguments.callee.float_deg < -1 )
        {
            if( this.GetSteeringAngle() > -20 )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() - 1 );
                arguments.callee.float_deg = 0;
            }
        }

    },

    ResetJoyData : function()
    {
        delete this.DecrementSteeringAngle.float_deg;
        delete this.IncrementSteeringAngle.float_deg;
    },

    Init : function()
    {
        this.m_SteeringAngleDev = 0;
        this.SetSteeringAngle( this.m_SteeringAngleDev );
    }


}