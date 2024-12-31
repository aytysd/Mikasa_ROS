ButtonsAction =
{
    A : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.A( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.A( depth );
        }

    }, 

    B : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.B( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.B( depth );
        }

    }, 

    X : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.X( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.X( depth );
        }

    }, 

    Y : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.Y( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.Y( depth ); 
        }

    }, 

    CSU : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.CSU( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.CSU( depth );
        }

    }, 

    CSR : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.CSR( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.CSR( depth );
        }

    }, 

    CSD : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.CSD( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.CSD( depth );
        }

    }, 

    CSL : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.CSL( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.CSL( depth );
        }

    }, 

    Menu : function( depth )
    {

    }, 

    L1 : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.L1( depth );

        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.L1( depth );
        }

    },
    
    L1NotPressed : function()
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.L1NotPressed();
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
        }


    },

    L2 : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.L2( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.L2( depth );
        }

    },
    
    L2NotPressed : function()
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.L2NotPressed();
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {

        }


    },


    R1 : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.ButtonsAction.R1( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.ButtonsAction.R1( depth );
        }
    }, 

    R2 : function( depth )
    {
        GamePad.ToggleActionMode();
    }, 


}