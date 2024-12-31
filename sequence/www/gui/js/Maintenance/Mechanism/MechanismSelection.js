Mechanism.MechanismSelection = 
{
    TargetMachinism : 0,

    SelectMechanismNext : function()
    {
        Mechanism.FireStatusController.SetMechanismFireStatus( false );

        if( this.TargetMachinism < 4 )
        {
            this.TargetMachinism ++;
        }
        else
        {
            this.TargetMachinism = 0;
        }

        Mechanism.ElevationAngleController.SetElevationAngle( Mechanism.ElevationAngleController.Elevation_angle[ this.GetTargetMechanismInString() ] );
        Mechanism.SteeringAngleController.SetSteeringAngle( Mechanism.SteeringAngleController.m_SteeringAngleDev[ this.GetTargetMechanismInString() ] );
        document.getElementById("select_mechanism").innerHTML = "M"+this.TargetMachinism;
        Mechanism.ShootSpeedController.SetShootSpeed();
    },

    
    GetTargetMechanismInString : function()
    {
        return "M"+this.TargetMachinism;
    },

    GetTargetMechanism : function()
    {
        return this.TargetMachinism;
    },

    Init : function()
    {
        this.TargetMachinism = 0;
    }
}