ShootButtonsAction =
{
    A : function( depth )
    {
    }, 

    B : function( depth )
    {
        TargetSpotController.ToggleTargetSpotSelection();
    }, 

    X : function( depth )
    {
        
    }, 

    Y : function( depth )
    {
        
    }, 

    CSU : function( depth )
    {
        ElevationAngleController.IncrementElevationAngle();
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSR : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSD : function( depth )
    {        
        ElevationAngleController.DecrementElevationAngle();
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSL : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    Menu : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    L1 : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    L2 : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    R1 : function( depth )
    {
        FireStatusController.ToggleFireStatus();
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    R2 : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 


}