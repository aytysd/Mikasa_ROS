ShootSpotController =
{
    m_c_String2Index : { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4 },
    m_c_Index2String : { 0 : 'a', 1 : 'b', 2 : 'c', 3 : 'd', 4 : 'e' },
    m_CurrentShootPointSelection : 'a',
    
    /**
     * 
     * @param {string} num a b c d e
     */
    SetCurrentShootPointSelection : function( ShootSpotInString )
    {
        this.m_CurrentShootPointSelection = ShootSpotInString

        var ShootSpotInInt = this.m_c_String2Index[ ShootSpotInString ];

        document.getElementsByName("where").item( ShootSpotInInt ).checked = true;

        var DefaultTargetSpotSelectionInString;

        switch( ShootSpotInString )
        {
        case 'a':
            DefaultTargetSpotSelectionInString = TargetSpotController.SetTargetSpot( 'Ba_left', 'Bb' );
            break;
        case 'b':
            DefaultTargetSpotSelectionInString = TargetSpotController.SetTargetSpot( 'Ba_left', 'Bb' );
            break;
        case 'c':
            DefaultTargetSpotSelectionInString = TargetSpotController.SetTargetSpot();
            break;
        case 'd':
            DefaultTargetSpotSelectionInString = TargetSpotController.SetTargetSpot( 'Ba_right', 'Bb' );
            break;
        case 'e':
            DefaultTargetSpotSelectionInString = TargetSpotController.SetTargetSpot( 'Ba_right', 'Bb' );
            break;

        }

        if( DefaultTargetSpotSelectionInString )
        {
            Updater.UpdateFromROSParam( { ShootSpotInString : ShootSpotInString, TargetSpotInString : DefaultTargetSpotSelectionInString } );  
            Talker.SetTargetSpot( DefaultTargetSpotSelectionInString );
        
        }

        if( Talker.ManualShootSpotServer )
        {
            let pub = new ROSLIB.Topic({
                ros : Talker.ros,
                name : '/ManualControl/ActivateManualShootSpotServer',
                messageType : 'std_msgs/UInt8'
            });

            var CurrentShootSpot = ShootSpotInInt + 1;
            let movement_command = new ROSLIB.Message( { data : CurrentShootSpot } );
            
            pub.publish( movement_command );

            

        }


    },

    GetCurrentShootSpotSelection : function()
    {
        return this.m_CurrentShootPointSelection;
    },

    GetCurrentShootSpotSelectionInInt : function()
    {
        return this.m_c_String2Index[ this.m_CurrentShootPointSelection ] + 1;
    },


    SetNext : function()
    {
        var CurrentShootSpotInInt = this.m_c_String2Index[ this.m_CurrentShootPointSelection ];

        if( CurrentShootSpotInInt >= 4 )
        {

        }
        else
        {
            CurrentShootSpotInInt++;
        }

        var NextCurrentShootSpotInString = this.m_c_Index2String[ CurrentShootSpotInInt ];

        this.SetCurrentShootPointSelection( NextCurrentShootSpotInString );
    },

    SetPrev : function()
    {
        var CurrentShootSpotInInt = this.m_c_String2Index[ this.m_CurrentShootPointSelection ];

        if( CurrentShootSpotInInt <= 0 )
        {

        }
        else
        {
            CurrentShootSpotInInt--;
        }

        var PrevCurrentShootSpotInString = this.m_c_Index2String[ CurrentShootSpotInInt ];

        this.SetCurrentShootPointSelection( PrevCurrentShootSpotInString );

    }


}