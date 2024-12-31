MovementButtonsAction =
{
    A : function( depth )
    {
        PurePursuitController.SelectDown();
    }, 

    B : function( depth )
    {
        PurePursuitController.AutoOutward();
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    X : function( depth )
    {
        PurePursuitController.AutoReturn();
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    Y : function( depth )
    {
        PurePursuitController.SelectUp();
    }, 

    CSU : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSR : function( depth )
    {
        ShootSpotController.SetNext();
    }, 

    CSD : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSL : function( depth )
    {
        ShootSpotController.SetPrev();
    }, 

    Menu : function( depth )
    {
        // GamePad.Toggle();
        EmergencyStopController.DoReverse();

    }, 

    L1 : function( depth )
    {

    }, 

    L2 : function( depth )
    {
        PurePursuitController.TogglePurePursuitEnable();
    }, 

    R1 : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    R2 : function( depth )
    {
        console.log( arguments.callee.name + 'processing' + depth );
    }, 


}