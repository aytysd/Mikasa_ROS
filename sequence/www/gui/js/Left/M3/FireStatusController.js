M3.FireStatusController = 
{
    /**
     * status for firing or not
     */
    m_f_IsFiring : false,

    /**
     * 
     * @param {boo} state fire or not
     */
    SetFireStatus : function( state )
    {
        this.m_f_IsFiring = state;

        if( this.m_f_IsFiring )
        {
            document.getElementById("fire_button_shootdown").value = "STOP";
            document.getElementById("fire_button_shootdown").style.backgroundColor = "lightgreen";

            document.getElementById("shoot_status_shootdown").innerHTML = "発射中";
            document.getElementById("shoot_status_shootdown").style.color = "lightgreen";

            Talker.M3.ShootStart();
        }
        else
        {
            document.getElementById("fire_button_shootdown").value = "FIRE";
            document.getElementById("fire_button_shootdown").style.backgroundColor = "red";

            document.getElementById("shoot_status_shootdown").innerHTML = "停止中";
            document.getElementById("shoot_status_shootdown").style.color = "red";

            Talker.M3.ShootStop();
        }
    },

    /**
     * toggle firing status
     */
    ToggleFireStatus : function()
    {
        this.SetFireStatus( !this.m_f_IsFiring );
    },

    Init : function()
    {
        this.m_f_IsFiring = false;
    }

};