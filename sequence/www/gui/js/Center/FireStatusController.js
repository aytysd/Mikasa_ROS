FireStatusController = 
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
            document.getElementById("fire_button").value = "STOP";
            document.getElementById("shoot_status").innerHTML = "発射中";

            var ShootPointInString = ShootSpotController.GetCurrentShootSpotSelection();
            var TargetSpotInString = TargetSpotController.GetCurrentTargetSpotSelection();
            var Speed = ShootSpeedController.GetSelectedShootSpeed( ShootPointInString, TargetSpotInString );
            Talker.ShootStart( Speed, TargetSpotInString );
        }
        else
        {
            document.getElementById("fire_button").value = "FIRE";
            document.getElementById("shoot_status").innerHTML = "停止中";
            Talker.ShootStop();
        }
    },

    /**
     * toggle firing status
     */
    ToggleFireStatus : function()
    {
        this.SetFireStatus( !this.m_f_IsFiring );
    }
};