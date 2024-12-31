UnderCarriage.ButtonsAction =
{


    A : function( depth )
    {
    }, 

    B : function( depth )
    {
        UnderCarriage.SteeringTickController.StartSteeringRotate();
    }, 

    X : function( depth )
    {
    }, 

    Y : function( depth )
    {

    }, 


    R1 : function( depth )
    {
        UnderCarriage.FireStatusController.ToggleCarriageMoterStatus();
    }, 

    
    L1 : function( depth )
    {
    }, 

    L2 : function( depth )
    {
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