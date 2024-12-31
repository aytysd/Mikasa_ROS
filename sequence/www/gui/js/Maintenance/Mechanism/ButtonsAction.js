Mechanism.ButtonsAction =
{


    A : function( depth )
    {
    }, 

    B : function( depth )
    {
        Mechanism.MechanismSelection.SelectMechanismNext();
    }, 

    X : function( depth )
    {
    }, 

    Y : function( depth )
    {

    }, 


    R1 : function( depth )
    {
        Mechanism.FireStatusController.ToggleMechanismFireStatus();
    }, 

    
    L1 : function( depth )
    {
        Mechanism.ElevationAngleController.IncrementElevationAngle();

    }, 

    L2 : function( depth )
    {
        Mechanism.ElevationAngleController.DecrementElevationAngle();
    }, 


    CSU : function( depth )
    {

    }, 

    CSR : function( depth )
    {
    }, 

    CSD : function( depth )
    {

    }, 

    CSL : function( depth )
    {

    }, 

}