
const COUNT_THRESH = 5;
ElevationAngleController = 
{

    /**
     * current elevation angle state
     */

    m_ElevationAngleInfos :
    {
        'a' : 
        {
            'Sa1' : 0,
            'Sa2' : 0,
            'Sa3' : 0,
            'Sb1' : 0,
            'Sb2' : 0,
            'Ba_right' : 0,
            'Ba_left' : 0,
            'S_K1' : 0,
            'S_K2' : 0,
            'Bb' : 0
        },

        'b' : 
        {
            'Sa1' : 0,
            'Sa2' : 0,
            'Sa3' : 0,
            'Sb1' : 0,
            'Sb2' : 0,
            'Ba_right' : 0,
            'Ba_left' : 0,
            'S_K1' : 0,
            'S_K2' : 0,
            'Bb' : 0
        },


        'c' : 
        {
            'Sa1' : 0,
            'Sa2' : 0,
            'Sa3' : 0,
            'Sb1' : 0,
            'Sb2' : 0,
            'Ba_right' : 0,
            'Ba_left' : 0,
            'S_K1' : 0,
            'S_K2' : 0,
            'Bb' : 0
        },

        'd' : 
        {
            'Sa1' : 0,
            'Sa2' : 0,
            'Sa3' : 0,
            'Sb1' : 0,
            'Sb2' : 0,
            'Ba_right' : 0,
            'Ba_left' : 0,
            'S_K1' : 0,
            'S_K2' : 0,
            'Bb' : 0
        },

        'e' : 
        {
            'Sa1' : 0,
            'Sa2' : 0,
            'Sa3' : 0,
            'Sb1' : 0,
            'Sb2' : 0,
            'Ba_right' : 0,
            'Ba_left' : 0,
            'S_K1' : 0,
            'S_K2' : 0,
            'Bb' : 0
        },

    },

    /**
     * 
     * @param {int} value degree
     */
    SetDisplayElevationAngle( value )
    {
        document.getElementById("elevation_angle").value = value;
        document.getElementById("ui_elevation_angle").innerHTML  =value;
    },

    GetElevationAngle( ShootSpotInString, TargetSpotInString )
    {
        return this.m_ElevationAngleInfos[ ShootSpotInString ][ TargetSpotInString ];
    },

    /**
     * 
     * @param {int} value degree
     * @param {string} ShootSpotInString where to shoot? like 'a', 'b', or 'c'...
     * @param {string} TargetSpotInString like 'Sa1', 'Sa2', 'Sa3'.....
     */
    SetElevationAngle( value, ShootSpotInString, TargetSpotInString )
    {
        this.m_ElevationAngleInfos[ ShootSpotInString ][ TargetSpotInString ] = value;
        this.SetDisplayElevationAngle( value );
        Talker.SetElevationAngle( value, ShootSpotInString, TargetSpotInString );
    },

    IncrementElevationAngle : function()
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = 0;
        }

        var ShootSpotInString = ShootSpotController.GetCurrentShootSpotSelection();
        var TargetSpotInString = TargetSpotController.GetCurrentTargetSpotSelection()


        arguments.callee.count++;

        if( arguments.callee.count >= COUNT_THRESH )
        {
            arguments.callee.count = 0;
            var now = this.GetElevationAngle( ShootSpotInString, TargetSpotInString );

            if( now >= document.getElementById("elevation_angle").max )
            {

            }
            else
            {
                now++;
            }

            this.SetElevationAngle( now, ShootSpotInString, TargetSpotInString );
        }

    },

    DecrementElevationAngle : function()
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = 0;
        }

        var ShootSpotInString = ShootSpotController.GetCurrentShootSpotSelection();
        var TargetSpotInString = TargetSpotController.GetCurrentTargetSpotSelection()


        arguments.callee.count++;

        if( arguments.callee.count >= COUNT_THRESH )
        {
            arguments.callee.count = 0;
            var now = this.GetElevationAngle( ShootSpotInString, TargetSpotInString );

            if( now <= document.getElementById("elevation_angle").min )
            {

            }
            else
            {
                now--;
            }

            this.SetElevationAngle( now, ShootSpotInString, TargetSpotInString );
        }


    }




}