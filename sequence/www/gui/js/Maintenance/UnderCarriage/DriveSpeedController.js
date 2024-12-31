

UnderCarriage.DriveSpeedController = 
{
    m_DriveSpeed : 0,

    K_SPEED : 5,
    /**
     * 
     * @param {int} value mm/s
     * @param {string} ShootSpotInString a, b, c, d, e
     * @param {string} TargetSpotInString Sa1, Sa2, Sa3......
     */
    SetShootSpeed : function( value )
    {
        this.m_DriveSpeed = value;
        this.SetDisplayShootSpeed( value );
        
        if( UnderCarriage.FireStatusController.m_IsDriving )
        {
            for (let i = 0; i < 4; i++ )
            {
                Talker.DriveUnderCarriageDriveMotor( value ,i+1 );
            }
        }
    },

    Start : function()
    {
        this.SetShootSpeed( this.m_DriveSpeed );
    },

    Stop : function()
    {
        var value = 0;
        this.m_DriveSpeed = value;
        this.SetDisplayShootSpeed( value );
        
        for (let i = 0; i < 4; i++ )
        {
            Talker.DriveUnderCarriageDriveMotor( value ,i+1 );
        }

    },


    /**
     * set speed data to display to GUI
     * @param {int} value mm/s 
     */
    SetDisplayShootSpeed: function ( value ) 
    {
        document.getElementById( "speed1" ).innerHTML = value;
        document.getElementById( "RangeM1" ).value = value;
    },

    GetShootSpeed : function()
    {
        return this.m_DriveSpeed;
    },


    IncrementUnderCarriageSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        arguments.callee.count += depth * this.K_SPEED;

        if( arguments.callee.count > 1 )
        {
            var now = this.GetShootSpeed();
            if( now<document.getElementById("RangeM1").max )
            {
                now += 50;
            }

            this.SetShootSpeed( now );
            arguments.callee.count = 0;
        }
    },

    DecrementUnderCarriageSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        arguments.callee.count += depth * this.K_SPEED;

        if( arguments.callee.count < -1 )
        {
            var now = this.GetShootSpeed();
            if( now>document.getElementById( "RangeM1" ).min )
            {
                now -= 50;
            }

            this.SetShootSpeed( now );
            arguments.callee.count = 0;
        }
    },

    Init : function()
    {
        // this.SetShootSpeed(0);
    }


}