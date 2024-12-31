ButtonsAction =
{
    A : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.A( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.A( depth );
        }

    }, 

    B : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.B( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.B( depth );
        }

    }, 

    X : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.X( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.X( depth );
        }

    }, 

    Y : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.Y( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.Y( depth ); 
        }

    }, 

    CSU : function( depth )
    {
        M4.ButtonsAction.CSU( depth );

        // if( GamePad.m_f_ActionMode == Shoot )
        // {
        //     M2.ButtonsAction.CSU( depth );
        // }
        // else if( GamePad.m_f_ActionMode == ShootDown )
        // {
        // }

    }, 

    CSR : function( depth )
    {
        M4.ButtonsAction.CSR( depth );

        // if( GamePad.m_f_ActionMode == Shoot )
        // {
        //     M2.ButtonsAction.CSR( depth );
        // }
        // else if( GamePad.m_f_ActionMode == ShootDown )
        // {
        // }

    }, 

    CSD : function( depth )
    {
        M4.ButtonsAction.CSD( depth );

        // if( GamePad.m_f_ActionMode == Shoot )
        // {
        //     M2.ButtonsAction.CSD( depth );
        // }
        // else if( GamePad.m_f_ActionMode == ShootDown )
        // {
        // }

    }, 

    CSL : function( depth )
    {
        M4.ButtonsAction.CSL( depth );

        // if( GamePad.m_f_ActionMode == Shoot )
        // {
        //     M2.ButtonsAction.CSL( depth );
        // }
        // else if( GamePad.m_f_ActionMode == ShootDown )
        // {
        // }

    }, 

    Menu : function( depth )
    {

    }, 

    L1 : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.L1( depth );

        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.L1( depth );
        }

    },
    
    L1NotPressed : function()
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.L1NotPressed();
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
        }


    },

    L2 : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.L2( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.L2( depth );
        }

    },
    
    L2NotPressed : function()
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.L2NotPressed();
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {

        }


    },


    R1 : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.ButtonsAction.R1( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.ButtonsAction.R1( depth );
        }
    }, 

    R2 : function( depth )
    {
        GamePad.ToggleActionMode();
    }, 


}