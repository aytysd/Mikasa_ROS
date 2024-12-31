M3.Updater = 
{
    UpdateFromROSParam : function
    (
        {
            ShootSpotInString,
            TargetSpotInString,
        }
    )
    {
        Talker.M3.GetSpeedFromParam
        ( 
            function( param )
            {   
                // M0.ShootSpeedController.SetShootSpeed( param * 1000.0, ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );


    },


}

