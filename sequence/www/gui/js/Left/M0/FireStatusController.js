M0.FireStatusController = 
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
            document.getElementById("fire_button_shoot").value = "STOP";
            document.getElementById("fire_button_shoot").style.backgroundColor = "lightgreen";

            document.getElementById("shoot_status_shoot").innerHTML = "発射中";
            document.getElementById("shoot_status_shoot").style.color = "lightgreen";
            
            Talker.M0.ShootStart();
        }
        else
        {
            document.getElementById("fire_button_shoot").value = "FIRE";
            document.getElementById("fire_button_shoot").style.backgroundColor = "red";

            document.getElementById("shoot_status_shoot").innerHTML = "停止中";
            document.getElementById("shoot_status_shoot").style.color = "red"

            Talker.M0.ShootStop();
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