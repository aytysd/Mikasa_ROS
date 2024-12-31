ButtonsAction =
{
    A : function( depth )
    {
        MovementButtonsAction.A( depth );
    }, 

    B : function( depth )
    {
        if( GamePad.m_f_ActionMode == Movement )
        {
            MovementButtonsAction.B( depth );
        }
        else if( GamePad.m_f_ActionMode == Shoot )
        {
            ShootButtonsAction.B( depth );
        }

        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    X : function( depth )
    {
        MovementButtonsAction.X( depth );
        GamePad.SetActionMode( Movement );
    }, 

    Y : function( depth )
    {
        MovementButtonsAction.Y( depth );
    }, 

    CSU : function( depth )
    {
        if( GamePad.m_f_ActionMode == Movement )
        {
            MovementButtonsAction.CSU( depth );
        }
        else if( GamePad.m_f_ActionMode == Shoot )
        {
            ShootButtonsAction.CSU( depth );
        }

        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSR : function( depth )
    {
        MovementButtonsAction.CSR( depth );
    }, 

    CSD : function( depth )
    {
        if( GamePad.m_f_ActionMode == Movement )
        {
            MovementButtonsAction.CSD( depth );
        }
        else if( GamePad.m_f_ActionMode == Shoot )
        {
            ShootButtonsAction.CSD( depth );
        }

        console.log( arguments.callee.name + 'processing' + depth );
    }, 

    CSL : function( depth )
    {
        MovementButtonsAction.CSL( depth );
    }, 

    Menu : function( depth )
    {
        MovementButtonsAction.Menu( depth );
    }, 

    L1 : function( depth )
    {
        MovementButtonsAction.L1( depth );
    }, 

    L2 : function( depth )
    {
        MovementButtonsAction.L2( depth );
    }, 

    R1 : function( depth )
    {
        ShootButtonsAction.R1( depth );
    }, 

    R2 : function( depth )
    {
        GamePad.ToggleActionMode();
    }, 


}