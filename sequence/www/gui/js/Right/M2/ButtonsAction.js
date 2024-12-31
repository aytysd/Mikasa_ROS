M2.ButtonsAction =
{
    A : function( depth )
    {
    }, 


    B : function( depth )
    {
        M2.TargetSpotController.Next();
    }, 

    X : function( depth )
    {
        M2.TargetSpotController.Back();
    }, 

    Y : function( depth )
    {

    }, 

    R1 : function( depth )
    {
        M2.FireStatusController.ToggleFireStatus();
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
        M2.ElevationAngleController.IncrementElevationAngle( depth );
    },

    L1NotPressed : function()
    {
        M2.ElevationAngleController.IncrementElevationAngle( 0 );
    },

    L2 : function( depth )
    {
        M2.ElevationAngleController.DecrementElevationAngle( depth );
    },

    L2NotPressed : function()
    {
        M2.ElevationAngleController.DecrementElevationAngle( 0 );
    }


}