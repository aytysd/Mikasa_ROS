M4.Updater = 
{
    UpdateFromROSParam : function
    (
        {
            ShootSpotInString,
            TargetSpotInString,
        }
    )
    {
        Talker.M4.GetSpeedFromParam
        ( 
            function( param )
            {   
                M4.ShootSpeedController.SetShootDownSpeed( param * 1000.0, ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );


    },


}

