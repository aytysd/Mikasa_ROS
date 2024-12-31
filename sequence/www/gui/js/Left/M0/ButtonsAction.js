M0.ButtonsAction =
{
    A : function( depth )
    {
    }, 


    B : function( depth )
    {
        M0.TargetSpotController.Next();
    }, 

    X : function( depth )
    {
        M0.TargetSpotController.Back();
    }, 

    Y : function( depth )
    {

    }, 

    R1 : function( depth )
    {
        M0.FireStatusController.ToggleFireStatus();
    }, 

    R2 : function( depth )
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


    L1 : function( depth )
    {
        M0.ElevationAngleController.IncrementElevationAngle( depth );
    },

    L1NotPressed : function()
    {
        M0.ElevationAngleController.IncrementElevationAngle( 0 );
    },

    L2 : function( depth )
    {
        M0.ElevationAngleController.DecrementElevationAngle( depth );
    },

    L2NotPressed : function()
    {
        M0.ElevationAngleController.DecrementElevationAngle( 0 );
    }


}