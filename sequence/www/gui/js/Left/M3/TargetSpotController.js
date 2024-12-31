
M3.TargetSpotController = 
{

    DEFAULT : 0,
    
    m_CurrentSelectableChoices : { 0 : 'Sa1', 1 : 'Sa2', 2 : 'Sa3' },

    m_DefaultTargetSpotTable :
    {
        1 : "Sa1",
        2 : "Sa1",
        3 : "Sa2",
        4 : "Sa2",
        5 : "Sa3"
    },

    /**
     * 
     * @param {int} spot_num 0 to 1
     */
    SetShootSpotChecked : function( spot_num )
    {
        var CurrentTargetSpotSelectionInString = M3.TargetSpotController.m_CurrentSelectableChoices[ spot_num ];

        if( CurrentTargetSpotSelectionInString != undefined )
        {
            Talker.M3.SetTargetSpot( CurrentTargetSpotSelectionInString );
        }

        switch(spot_num){
            case 0:
            {
                document.getElementById("target1_shootdown").checked = true;
                break;
            }
            case 1:
            {
                document.getElementById("target2_shootdown").checked = true;
                break;

            }
            case 2:
            {
                document.getElementById("target3_shootdown").checked = true;
                break;
            }
            default:
                break;
        }

        M3.SteeringAngleController.ResetSteeringAngle();
	    M3.ShootSpeedController.SetShootDownSpeedFromParam();

    },
    
        /**
     * 
     * @param {int} spot_num 0 to 1
     */
        SetDefaultShootSpotChecked : function( shoot_spot )
        {

            var CurrentTargetSpotSelectionInString = M3.TargetSpotController.m_DefaultTargetSpotTable[ shoot_spot ];
    
            if( CurrentTargetSpotSelectionInString != undefined )
            {
                Talker.M3.SetTargetSpot( CurrentTargetSpotSelectionInString );
            }
    
            switch( CurrentTargetSpotSelectionInString ){
                case 'Sa1':
                {
                    document.getElementById("target1_shootdown").checked = true;
                    break;
                }
                case 'Sa2':
                {
                    document.getElementById("target2_shootdown").checked = true;
                    break;
    
                }
                case 'Sa3':
                {
                    document.getElementById("target3_shootdown").checked = true;
                    break;
                }
                default:
                    break;
            }
    
            M3.SteeringAngleController.ResetSteeringAngle();
            M3.ShootSpeedController.SetShootDownSpeedFromParam();
    
        },
    

    GetCurrentTargetSpotSelection : function()
    {
        var CheckedNum = 0;

        var elements = document.getElementsByName( 'target_shootdown' );

        for( let i = 0; i < elements.length; i++ )
        {
            if( elements.item( i ).checked )
            {
                CheckedNum = i;
            }
        }

        return M3.TargetSpotController.m_CurrentSelectableChoices[ CheckedNum ];

    },

    GetCurrentTargetSpotSelectionInInt : function()
    {
        var CheckedNum = 0;

        var elements = document.getElementsByName( 'target_shootdown' );

        for( let i = 0; i < elements.length; i++ )
        {
            if( elements.item( i ).checked )
            {
                CheckedNum = i;
            }
        }

        return CheckedNum;

    },

    CSL : function()
    {
        M3.TargetSpotController.SetShootSpotChecked( 0 )
    },

    CSU : function()
    {
        M3.TargetSpotController.SetShootSpotChecked( 1 );
    },

    CSR : function()
    {
        M3.TargetSpotController.SetShootSpotChecked( 2 );
    },

    Init : function()
    {
        var RedZone = Talker.GetRedZone();

        if( RedZone )
        {
            M3.TargetSpotController.SetShootSpotChecked( 0 );
        }
        else
        {
            M3.TargetSpotController.SetShootSpotChecked( 2 );
        }
    }


}
