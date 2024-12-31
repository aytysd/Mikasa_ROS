
const ANGLE_MIN = 27;
const ANGLE_MAX = 48;

const COUNT_THRESH = 3;
M0.ElevationAngleController = 
{
    DEPTH_K : 0.4,
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
        document.getElementById("ElevationAngle_shoot").innerHTML  =value;
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
        Talker.M0.SetElevationAngle( value, ShootSpotInString, TargetSpotInString );
    },

    IncrementElevationAngle : function( depth )
    {
        if( depth == 0 )
        {
            delete arguments.callee.count;
        }
        else
        {
            if ( !( 'count' in arguments.callee ) )
            {
                arguments.callee.count = 0.99;
            }
    
            var ShootSpotInString = Talker.GetCurrentShootSpotInString();
            var TargetSpotInString = M0.TargetSpotController.GetCurrentTargetSpotSelection()
    
    
            arguments.callee.count += depth * this.DEPTH_K;
    
            if( arguments.callee.count > 1 )
            {
                arguments.callee.count = 0;
                var now = this.GetElevationAngle( ShootSpotInString, TargetSpotInString );
    
                if( now >= ANGLE_MAX )
                {
    
                }
                else
                {
                    now++;
                }
    
                this.SetElevationAngle( now, ShootSpotInString, TargetSpotInString );
            }
    
        }

    },

    DecrementElevationAngle : function( depth )
    {

        if( depth == 0 )
        {
            delete arguments.callee.count;
        }
        else
        {
            if ( !( 'count' in arguments.callee ) )
            {
                arguments.callee.count = 0.99;
            }
    
            var ShootSpotInString = Talker.GetCurrentShootSpotInString();
            var TargetSpotInString = M0.TargetSpotController.GetCurrentTargetSpotSelection()
    
    
            arguments.callee.count += depth * this.DEPTH_K;
    
            if( arguments.callee.count > 1 )
            {
                arguments.callee.count = 0;
                var now = this.GetElevationAngle( ShootSpotInString, TargetSpotInString );
    
                if( now <= ANGLE_MIN )
                {
    
                }
                else
                {
                    now--;
                }
    
                this.SetElevationAngle( now, ShootSpotInString, TargetSpotInString );
            }
    
        }


    },

    Init : function( CurrentShootSpotInString )
    {
        Talker.M0.GetElevationFromParam
        (
            function( param )
            {
                M0.ElevationAngleController.SetElevationAngle( RAD2DEG( param ), CurrentShootSpotInString, M0.TargetSpotController.TARGET_SPOT_ASSIGN[ CurrentShootSpotInString ][ 0 ] );
            },
            CurrentShootSpotInString,
            M0.TargetSpotController.TARGET_SPOT_ASSIGN[ CurrentShootSpotInString ][ 0 ]
        );
    }





}