var Initialize = function()
{
    GamePad.init();
    Talker.init();

    M4.SteeringAngleController.Init();

    M4.ShootSpeedController.Init();

    M2.FireStatusController.Init();
    M4.FireStatusController.Init();

    M4.TargetSpotController.Init();

    Talker.CurrentShootSpotParam.get
    (
        function( param )
        {
            var CurrentShootSpotInString = SHOOTSPOT_INDEX2STRING[ param ];
            Talker.m_CurrentShootSpotInString = CurrentShootSpotInString;
            M2.TargetSpotController.Init( CurrentShootSpotInString );
            M4.TargetSpotController.Init( CurrentShootSpotInString );
            M2.ElevationAngleController.Init( CurrentShootSpotInString );

        }
    )


}

Initialize();