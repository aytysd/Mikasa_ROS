Mechanism.FireStatusController = 
{
    DEFAULT : 10000,
    /**
     * status for firing or not
     */
    m_IsDrivingMechanism : false,
    
    /**
     * 
     * @param {boo} state fire or not
     */
    SetMechanismFireStatus : function( state )
    {
        this.m_IsDrivingMechanism = state;

        if( this.m_IsDrivingMechanism )
        {
            document.getElementById("status_mechanism").innerHTML = "ON";
            // Talker.ShootStart();
            Mechanism.ShootSpeedController.SetShootSpeed( Mechanism.ShootSpeedController.m_ShootSpeed[ Mechanism.MechanismSelection.GetTargetMechanismInString() ] );
            Talker.DriveSendOutServo( 180, Mechanism.MechanismSelection.GetTargetMechanism() );
        }
        else
        {
            document.getElementById("status_mechanism").innerHTML = "OFF";
            // Talker.ShootStop();
            Mechanism.ShootSpeedController.Stop();
            Talker.StopSendOutServo( Mechanism.MechanismSelection.GetTargetMechanism() );
 
        }
    },


    /**
     * toggle firing status
     */
    ToggleMechanismFireStatus : function()
    {
        this.m_IsDrivingMechanism = !this.m_IsDrivingMechanism;
        this.SetMechanismFireStatus( this.m_IsDrivingMechanism );
    },

    Stop : function()
    {
        this.m_IsDrivingMechanism = false;
        this.SetMechanismFireStatus( this.m_IsDrivingMechanism );
    },


    Init : function()
    {
        this.m_IsDrivingMechanism = false;
    }

};