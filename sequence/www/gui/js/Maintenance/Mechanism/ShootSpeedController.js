

Mechanism.ShootSpeedController = 
{
    m_ShootSpeed :
    {
        "M0" : 13000,
        "M1" : 13000,
        "M2" : 13000,
        "M3" : 27000,
        "M4" : 27000,

    },

    K_SPEED : 5,
    /**
     * 
     * @param {int} value mm/s
     * @param {string} ShootSpotInString a, b, c, d, e
     * @param {string} TargetSpotInString Sa1, Sa2, Sa3......
     */
    SetShootSpeed : function( value )
    {
        if( arguments.length == 0 )
        {
            var value = this.m_ShootSpeed[ Mechanism.MechanismSelection.GetTargetMechanismInString() ];
            this.SetDisplayShootSpeed( value );
            
            if(  Mechanism.FireStatusController.m_IsDrivingMechanism  )
            {
                Talker.DriveMotor( value ,Mechanism.MechanismSelection.GetTargetMechanism() );
            }

        }
        else if( arguments.length == 1 )
        {
            this.m_ShootSpeed[ Mechanism.MechanismSelection.GetTargetMechanismInString() ] = value;
            this.SetDisplayShootSpeed( value );
            
            if(  Mechanism.FireStatusController.m_IsDrivingMechanism  )
            {
                Talker.DriveMotor( value ,Mechanism.MechanismSelection.GetTargetMechanism() );
            }
    
        }
    },

    Stop : function()
    {
        var value = 0;

        Talker.DriveMotor( value ,Mechanism.MechanismSelection.GetTargetMechanism());
    },


    /**
     * set speed data to display to GUI
     * @param {int} value mm/s 
     */
    SetDisplayShootSpeed: function ( value ) 
    {
        if( arguments.length == 0 )
        {
            var TargetMechInString = Mechanism.MechanismSelection.GetTargetMechanism();

            document.getElementById("power_mechanism").innerHTML = this.m_ShootSpeed[ TargetMechInString ];
            document.getElementById("power_range").value = this.m_ShootSpeed[ TargetMechInString ];    
        }
        else
        {
            document.getElementById("power_mechanism").innerHTML = value;
            document.getElementById("power_range").value = value;    
        }
    },

    GetShootSpeed : function()
    {
        return this.m_ShootSpeed[ Mechanism.MechanismSelection.GetTargetMechanismInString() ];
    },


    IncrementShootSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        arguments.callee.count += depth * this.K_SPEED;

        if( arguments.callee.count > 1 )
        {
            var now = this.GetShootSpeed();
            if( now < document.getElementById( "power_range" ).max )
            {
                now += 50;
            }

            this.SetShootSpeed( now );
            arguments.callee.count = 0;
        }
    },

    DecrementShootSpeed : function( depth )
    {
        if ( !( 'count' in arguments.callee ) )
        {
            arguments.callee.count = parseFloat( 0 );
        }

        arguments.callee.count += depth * this.K_SPEED;

        if( arguments.callee.count < -1 )
        {
            var now = this.GetShootSpeed();
            if( now > document.getElementById( "power_range" ).min )
            {
                now -= 50;
            }

            this.SetShootSpeed( now );
            arguments.callee.count = 0;
        }
    },

    Init : function()
    {
        // this.SetShootSpeed( 10000 );
    }


}