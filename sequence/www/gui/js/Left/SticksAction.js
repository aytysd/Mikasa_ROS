SticksAction = 
{
    LSV : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.SticksAction.LSV( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.SticksAction.LSV( depth );
        }

    },

    LSH : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.SticksAction.LSH( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.SticksAction.LSH( depth );
        }
    },

    RSV : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.SticksAction.RSV( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.SticksAction.RSV( depth );
        }


    },

    RSH : function( depth )
    {
        if( GamePad.m_f_ActionMode == Shoot )
        {
            M0.SticksAction.RSH( depth );
        }
        else if( GamePad.m_f_ActionMode == ShootDown )
        {
            M3.SticksAction.RSH( depth );
        }


    }

}