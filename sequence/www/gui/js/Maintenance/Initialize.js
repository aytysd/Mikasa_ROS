var Initialize = function()
{
    GamePad.init();
    Talker.init();
    
    UnderCarriage.DriveSpeedController.Init();
    UnderCarriage.FireStatusController.Init();
    Mechanism.ShootSpeedController.Init();
    Mechanism.MechanismSelection.Init();
    UnderCarriage.SteeringTickController.Init();
}

Initialize();