const K_SPEED = 2;

ShootSpeedController = 
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


    /**
     * 
     * @param {int} value mm/s
     * @param {string} ShootSpotInString a, b, c, d, e
     * @param {string} TargetSpotInString Sa1, Sa2, Sa3......
     */
    SetShootSpeed : function( value, ShootSpotInString, TargetSpotInString )
    {
        this.m_ShootSpeedInfos[ ShootSpotInString ][ TargetSpotInString ] = value;
        this.SetDisplayShootSpeed( value );
        Talker.SetShootSpeed( value, ShootSpotInString, TargetSpotInString );
    },

    /**
     * set speed data to display to GUI
     * @param {int} value mm/s 
     */
    SetDisplayShootSpeed: function ( value ) 
    {
        document.getElementById("ui_Speed").innerHTML = value;
        document.getElementById("speed").value = value;
    },

    GetSelectedShootSpeed : function( ShootSpotInString, TargetSpotInString )
    {
        return this.m_ShootSpeedInfos[ ShootSpotInString ][ TargetSpotInString ];
    },

    IncrementShootSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        var CurrentShootSpotSelectionInString = ShootSpotController.GetCurrentShootSpotSelection();
        var CurrentTargetSpotSelectionInString = TargetSpotController.GetCurrentTargetSpotSelection();

        arguments.callee.count += depth * K_SPEED;

        if( arguments.callee.count > 1 )
        {
            var now = this.GetSelectedShootSpeed( CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            if(now<document.getElementById("speed").max){
                now += 50;
            }

            this.SetShootSpeed( now, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            arguments.callee.count = 0;
        }
    },

    DecrementShootSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        var CurrentShootSpotSelectionInString = ShootSpotController.GetCurrentShootSpotSelection();
        var CurrentTargetSpotSelectionInString = TargetSpotController.GetCurrentTargetSpotSelection();

        arguments.callee.count += depth * K_SPEED;

        if( arguments.callee.count < -1 )
        {
            var now = this.GetSelectedShootSpeed( CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            if(now>document.getElementById("speed").min){
                now -= 50;
            }

            this.SetShootSpeed( now, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            arguments.callee.count = 0;
        }


    }

    
}