Updater = 
{
    UpdateFromROSParam : function
    (
        {
            ShootSpotInString,
            TargetSpotInString,
        }
    )
    {
        Talker.GetSpeedFromParam
        ( 
            function( param )
            {   
                ShootSpeedController.SetShootSpeed( param * 1000.0, ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );

        Talker.GetElevationFromParam
        ( 
            function( param )
            {   
                ElevationAngleController.SetElevationAngle( RAD2DEG( param ), ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );

        Talker.GetSteeringDevFromParam
        (
            function( param )
            {
                SteeringAngleController.SetSteeringAngle( RAD2DEG( param ), ShootSpotInString, TargetSpotInString );
            },
            ShootSpotInString,
            TargetSpotInString
        );

    },


}

