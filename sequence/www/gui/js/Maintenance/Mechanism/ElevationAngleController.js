
const COUNT_THRESH = 2;
Mechanism.ElevationAngleController = 
{
    Elevation_angle : 
    {
        'M0' : 27,
        'M1' : 27,
        'M2' : 27,
        'M3' : 27,
        'M4' : 27

    },
    /**
     * 
     * @param {int} value degree
     */
    SetDisplayElevationAngle( value )
    {
        document.getElementById("elevation_angle_range").value = value;
        document.getElementById("elevation_angle_mechanism").innerHTML  =value;
    },

    /**
     * 
     * @param {int} value degree
     */
    SetElevationAngle( value )
    {
        this.Elevation_angle[Mechanism.MechanismSelection.GetTargetMechanismInString()] = value;
        this.SetDisplayElevationAngle( value );
        Talker.SetElevationAngle( value, Mechanism.MechanismSelection.GetTargetMechanism() );
    },

    IncrementElevationAngle : function()
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = 0;
        }


        arguments.callee.count++;

        if( arguments.callee.count >= COUNT_THRESH )
        {
            arguments.callee.count = 0;
            var now = this.Elevation_angle[Mechanism.MechanismSelection.GetTargetMechanismInString()];

            if( now >= document.getElementById("elevation_angle_range").max )
            {

            }
            else
            {
                now++;
            }

            this.SetElevationAngle( now );
        }

    },

    DecrementElevationAngle : function()
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = 0;
        }


        arguments.callee.count++;

        if( arguments.callee.count >= COUNT_THRESH )
        {
            arguments.callee.count = 0;
            var now = this.Elevation_angle[Mechanism.MechanismSelection.GetTargetMechanismInString()];

            if( now <= document.getElementById("elevation_angle_range").min )
            {

            }
            else
            {
                now--;
            }

            this.SetElevationAngle( now );
        }


    }




}