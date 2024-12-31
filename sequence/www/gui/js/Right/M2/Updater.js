M2.Updater = 
{
    UpdateFromROSParam : function
    (
        {
            ShootSpotInString,
            TargetSpotInString,
        }
    )
    {
        Talker.M2.GetSpeedFromParam
        ( 
            function( param )
            {   
                M2.ShootSpeedController.SetShootSpeed( param * 1000.0, ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );

        Talker.M2.GetElevationFromParam
        ( 
            function( param )
            {   
                M2.ElevationAngleController.SetElevationAngle( RAD2DEG( param ), ShootSpotInString, TargetSpotInString );
            }, 
            ShootSpotInString,
            TargetSpotInString
        );

        Talker.M2.GetSteeringDevFromParam
        (
            function( param )
            {
                M2.SteeringAngleController.SetSteeringAngle( RAD2DEG( param ), ShootSpotInString, TargetSpotInString );
            },
            ShootSpotInString,
            TargetSpotInString
        );



    },


}

