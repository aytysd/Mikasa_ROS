ButtonsAction =
{


    A : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.A( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.A( depth );
        }
    }, 

    B : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.B( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.B( depth );
        }
    }, 

    X : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.X( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.X( depth );
        }
    }, 

    Y : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.Y( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.Y( depth );
        }

    }, 


    R1 : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.R1( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.R1( depth );
        }

    }, 

    R2 : function( depth )
    {
        GamePad.ToggleMode();
    }, 
    
    L1 : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.L1( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.L1( depth );
        }
    }, 

    L2 : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.L2( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.L2( depth );
        }
    }, 


    CSU : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.CSU( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.CSU( depth );
        }

    }, 

    CSR : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.CSR( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.CSR( depth );
        }
    }, 

    CSD : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.CSD( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.CSD( depth );
        }

    }, 

    CSL : function( depth )
    {
        if( GamePad.m_f_Mode == MechFlag )
        {
            Mechanism.ButtonsAction.CSL( depth );
        }
        else if( GamePad.m_f_Mode == UnderCarriageFlag )
        {
            UnderCarriage.ButtonsAction.CSL( depth )
        }

    }, 

}