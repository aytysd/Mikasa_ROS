
SticksAction = 
{
    LSV : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.SticksAction.LSV( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.SticksAction.LSV( depth );
        }

    },

    LSH : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.SticksAction.LSH( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.SticksAction.LSH( depth );
        }

    },

    RSV : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.SticksAction.RSV( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.SticksAction.RSV( depth );
        }

    },

    RSH : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.SticksAction.RSH( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.SticksAction.RSH( depth );
        }
    },


}