M0.Updater = 
{
    UpdateFromROSParam : function
    (
        {
            ShootSpotInString,
            TargetSpotInString,
        }
    )
    {
        Talker.M0.GetSpeedFromParam
        ( 
            function( param )
            {   
                M0.ShootSpeedController.SetShootSpeed( param * 1000.0, ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );

        Talker.M0.GetElevationFromParam
        ( 
            function( param )
            {   
                M0.ElevationAngleController.SetElevationAngle( RAD2DEG( param ), ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );

        Talker.M0.GetSteeringDevFromParam
        (
            function( param )
            {
                M0.SteeringAngleController.SetSteeringAngle( RAD2DEG( param ), ShootSpotInString, TargetSpotInString );
            },
            ShootSpotInString,
            TargetSpotInString
        );



    },


}

