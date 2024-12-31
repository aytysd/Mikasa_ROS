

M4.ShootSpeedController = 
{
    m_ShootSpeedInfos :
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

    K_SPEED : 2,
    /**
     * 
     * @param {int} value mm/s
     * @param {string} ShootSpotInString a, b, c, d, e
     * @param {string} TargetSpotInString Sa1, Sa2, Sa3......
     */
    SetShootDownSpeed : function( value, ShootSpotInString, TargetSpotInString )
    {
        this.m_ShootSpeedInfos[ ShootSpotInString ][ TargetSpotInString ] = value;
        this.SetDisplayShootSpeed( value );
        Talker.M4.SetShootSpeed( value, ShootSpotInString, TargetSpotInString );
    },

    SetShootDownSpeedFromParam : function()
    {
        var CurrentTargetSpotSelectionInString = M4.TargetSpotController.GetCurrentTargetSpotSelection();
        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();

        Talker.M4.GetSpeedFromParam
        (
            function( param )
            {
                M4.ShootSpeedController.SetDisplayShootSpeed( param * 1000.0 );
                M4.ShootSpeedController.m_ShootSpeedInfos[ CurrentShootSpotSelectionInString ][ CurrentTargetSpotSelectionInString ] = param * 1000.0;

            },
            CurrentShootSpotSelectionInString,
            CurrentTargetSpotSelectionInString
        );
    },


    /**
     * set speed data to display to GUI
     * @param {int} value mm/s 
     */
    SetDisplayShootSpeed: function ( value ) 
    {
        document.getElementById("speed_status_shootdown").innerHTML = value;
        document.getElementById("shootdown_speed").value = value;
    },

    GetShootDownSpeed : function( ShootSpotInString, TargetSpotInString )
    {
        return this.m_ShootSpeedInfos[ ShootSpotInString ][ TargetSpotInString ];
    },


    IncrementShootDownSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        var CurrentTargetSpotSelectionInString = M4.TargetSpotController.GetCurrentTargetSpotSelection();
        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();

        arguments.callee.count += depth * K_SPEED;

        if( arguments.callee.count > 1 )
        {
            var now = this.GetShootDownSpeed( CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            if(now<document.getElementById("shootdown_speed").max){
                now += 50;
            }

            this.SetShootDownSpeed( now, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            arguments.callee.count = 0;
        }
    },

    DecrementShootDownSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        var CurrentTargetSpotSelectionInString = M4.TargetSpotController.GetCurrentTargetSpotSelection();
        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();

        arguments.callee.count += depth * K_SPEED;

        if( arguments.callee.count < -1 )
        {
            var now = this.GetShootDownSpeed( CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            if( now > document.getElementById("shootdown_speed").min )
            {
                now -= 50;
            }

            this.SetShootDownSpeed( now, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            arguments.callee.count = 0;
        }
    },

    Init : function()
    {
        Talker.M4.GetSpeedFromParam
        (
            function( param )
            {
                M4.ShootSpeedController.SetShootDownSpeed( param * 1000.0 );
            },
            'a',
            'Sa1'
        );
    }


}