
const K = 1.4;

Mechanism.SteeringAngleController = 
{

    /**
     * steering angle deviation
     */
    m_SteeringAngleDev:
    {
        "M0" : 90,
        "M1" : 90,
        "M2" : 90,
        "M3" : 90,
        "M4" : 90

    },

    /**
     * 
     * @param {int} value degree
     */
    SetDisplaySteeringAngle( value )
    {
        document.getElementById("angle_range").value = ( value - 90 ) *-1 + 90;
        document.getElementById("angle_mechanism").innerHTML = value;
    },

    /**
     * 
     * @param {int} value degree
     */
    SetSteeringAngle( value )
    {
        this.m_SteeringAngleDev[ Mechanism.MechanismSelection.GetTargetMechanismInString() ] = value;
        this.SetDisplaySteeringAngle( value );
        Talker.DriveSteeringServo( value , Mechanism.MechanismSelection.GetTargetMechanism() );
    },

    pointFiveResolutionFormat( targetDegree )
    {
        var angle = targetDegree;
        var relAngle =  angle - 90;
        var absRelAngle = Math.abs( relAngle );

        var minus = false;
        if( relAngle < 0 )
        {
            minus = true;
        }

        var data = ( minus << 7 | 0 << 6 | absRelAngle );

        return data;
    },


    ResetSteeringAngle : function()
    {
        this.SetSteeringAngle( 90 );
    },

    GetSteeringAngle : function()
    {
        return this.m_SteeringAngleDev[ Mechanism.MechanismSelection.GetTargetMechanismInString() ];
    },

    IncrementSteeringAngle : function( depth )
    {
        if ( !( 'float_deg' in arguments.callee ) )
        {
            arguments.callee.float_deg = parseFloat( 0 );
        }

        arguments.callee.float_deg += depth * K;

        if( arguments.callee.float_deg > 1 )
        {
            if( this.GetSteeringAngle() > document.getElementById("angle_range").min )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() - 1 );
                arguments.callee.float_deg = 0;
            }
        }

    },

    DecrementSteeringAngle : function( depth )
    {
        if ( !( 'float_deg' in arguments.callee ) )
        {
            arguments.callee.float_deg = parseFloat( 0 );
        }

        arguments.callee.float_deg += depth * K;

        if( arguments.callee.float_deg < -1 )
        {
            if( this.GetSteeringAngle() < document.getElementById("angle_range").max )
            {
                this.SetSteeringAngle( this.GetSteeringAngle() + 1 );
                arguments.callee.float_deg = 0;
            }
        }

    }

}