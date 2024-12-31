SticksAction = 
{
    LSV : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.SticksAction.LSV( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.SticksAction.LSV( depth );
        }

    },

    LSH : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.SticksAction.LSH( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.SticksAction.LSH( depth );
        }
    },

    RSV : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.SticksAction.RSV( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.SticksAction.RSV( depth );
        }


    },

    RSH : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M2.SticksAction.RSH( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M4.SticksAction.RSH( depth );
        }


    }

}