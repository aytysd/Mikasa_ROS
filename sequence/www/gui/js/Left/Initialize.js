var Initialize = function()
{
    GamePad.init();
    Talker.init();

    M3.SteeringAngleController.Init();

    M3.ShootSpeedController.Init();

    M0.FireStatusController.Init();
    M3.FireStatusController.Init();

    M3.TargetSpotController.Init();

    Talker.CurrentShootSpotParam.get
    (
        function( param )
        {
            var CurrentShootSpotInString = SHOOTSPOT_INDEX2STRING[ param ];
            Talker.m_CurrentShootSpotInString = CurrentShootSpotInString;
            M0.TargetSpotController.Init( CurrentShootSpotInString );
            M0.ElevationAngleController.Init( CurrentShootSpotInString );
            M0.SteeringAngleController.Init( CurrentShootSpotInString );
        }
    )

}

Initialize();