EmergencyStopController =
{
    m_f_DrivePoweredOn : false,
    m_f_DrivePoweredOnByGPIO : false,
    

    /**
     * read m_f_DrivePoweredOn and change image
     */
    DoReverse : function()
    {

        if( this.m_f_DrivePoweredOnByGPIO )
        {
            Talker.EmergencyStop();
        }
        else
        {
            Talker.EmergencyStart();
        }
    },


    UpdateEmergencyParams : function()
    {
        Talker.GetDrivePowerStatus
        (
            function( param )
            {
                EmergencyStopController.m_f_DrivePoweredOn = param;
                if( EmergencyStopController.m_f_DrivePoweredOn ) 
                {
                    document.getElementById("emergency_stop").src = "../img/stop.png";
                    document.getElementById("machine_status").innerHTML = "true";  
                }
                else
                {
                    document.getElementById("emergency_stop").src = "../img/start.png";
                    document.getElementById("machine_status").innerHTML = " false";    
                }    
            }
        );
        
        Talker.GetDrivePowerStatusByGPIO
        ( 
            function( param )
            {
                EmergencyStopController.m_f_DrivePoweredOnByGPIO = param;
                if( param ) 
                {
                    document.getElementById("menu").src = "../img/controller_on.png";
                    GamePad.Enable();
                }
                else
                {
                    document.getElementById("menu").src = "../img/controller_off.png";
                    GamePad.Disable();
                }
            }
        );
    
    }


    
}

setInterval( 'EmergencyStopController.UpdateEmergencyParams()', 1000 );