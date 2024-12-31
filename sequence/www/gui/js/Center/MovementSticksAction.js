MovementSticksAction = 
{

    LSRS : function( LS_V_depth, LS_H_depth, RS_V_depth, RS_H_depth )
    {

        if( ManualController.m_f_Enabled )
        {
            var scalar = Math.sqrt( Math.abs( Math.pow( LS_H_depth, 5 ) ) + Math.abs( Math.pow( LS_V_depth, 5 ) ) );
            var theta = Math.atan2( LS_V_depth, LS_H_depth );
            if( LS_H_depth == 0 )
            {
                if( LS_V_depth > 0 )
                {
                    theta = Math.PI / 2.0;
                }
                else if( LS_V_depth < 0 )
                {
                    theta = Math.PI * 3.0 / 2.0;
                }
            }
    
            RS_H_depth *= ( -1 );
    
            ManualController.ManualControl_x = Math.cos( theta ) * scalar;
            ManualController.ManualControl_y = Math.sin( theta ) * scalar;
            ManualController.ManualControl_angle = Math.pow( RS_H_depth, 3 );
    
            Talker.ManualCommandSend( ManualController.ManualControl_x, ManualController.ManualControl_y, ManualController.ManualControl_angle );
    
        }



    },



}