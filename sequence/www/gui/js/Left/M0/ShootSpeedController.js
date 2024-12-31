const K_SPEED = 2;

M0.ShootSpeedController = 
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
        Talker.M0.SetShootSpeed( value, ShootSpotInString, TargetSpotInString );
    },


    /**
     * set speed data to display to GUI
     * @param {int} value mm/s 
     */
    SetDisplayShootSpeed: function ( value ) 
    {
        document.getElementById("speed_status_shoot").innerHTML = value;
        document.getElementById("shoot_speed").value = value;
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

        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();
        var CurrentTargetSpotSelectionInString = M0.TargetSpotController.GetCurrentTargetSpotSelection();

        arguments.callee.count += depth * K_SPEED;

        if( arguments.callee.count > 1 )
        {
            var now = this.GetSelectedShootSpeed( CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            if(now<document.getElementById("shoot_speed").max){
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

        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();
        var CurrentTargetSpotSelectionInString = M0.TargetSpotController.GetCurrentTargetSpotSelection();

        arguments.callee.count += depth * K_SPEED;

        if( arguments.callee.count < -1 )
        {
            var now = this.GetSelectedShootSpeed( CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            if(now>document.getElementById("shoot_speed").min){
                now -= 50;
            }

            this.SetShootSpeed( now, CurrentShootSpotSelectionInString, CurrentTargetSpotSelectionInString );
            arguments.callee.count = 0;
        }
    },

    Init : function()
    {
        var RedZone = Talker.GetRedZone();

        if( RedZone )
        {
            var DefaultShootSpot = 'a';
            var DefaultTargetSpot = 'Sa1';

            Talker.M0.GetSpeedFromParam
            (
                function( param )
                {
                    M0.ShootSpeedController.SetShootSpeed( param * 1000.0, DefaultShootSpot, DefaultTargetSpot );
                },
                DefaultShootSpot,
                DefaultTargetSpot
            );
        }
        else
        {
            var DefaultShootSpot = 'e';
            var DefaultTargetSpot = 'Sa3';

            Talker.M0.GetSpeedFromParam
            (
                function( param )
                {
                    M0.ShootSpeedController.SetShootSpeed( param * 1000.0, DefaultShootSpot, DefaultTargetSpot );
                },
                DefaultShootSpot,
                DefaultTargetSpot
            );

        }
    }

}