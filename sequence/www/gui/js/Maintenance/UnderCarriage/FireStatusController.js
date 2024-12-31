UnderCarriage.FireStatusController = 
{
    /**
     * status for firing or not
     */
    m_IsDriving : false,
    
    /**
     * 
     * @param {boo} state fire or not
     */
    SetCarriageMoterStatus : function( state )
    {
        this.m_IsDriving = state;

        if( this.m_IsDriving )
        {
            document.getElementById("state_steering_drive").innerHTML = "ON";
            UnderCarriage.DriveSpeedController.Start();
        }
        else
        {
            document.getElementById("state_steering_drive").innerHTML = "OFF";
            UnderCarriage.DriveSpeedController.Stop();
        }
    },

    /**
     * toggle firing status
     */
    ToggleCarriageMoterStatus : function()
    {
        this.m_IsDriving = !this.m_IsDriving;
        this.SetCarriageMoterStatus( this.m_IsDriving );
    },

    Stop : function()
    {
        this.m_IsDriving = false;
        this.SetCarriageMoterStatus( this.m_IsDriving );
    },

    Init : function()
    {
        this.m_IsDriving = false;
    }

};

