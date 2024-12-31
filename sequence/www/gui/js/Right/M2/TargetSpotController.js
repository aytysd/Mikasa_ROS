const DEFAULT = 0;


M2.TargetSpotController = 
{
    TARGET_SPOT_ASSIGN :
    {
        'a' : [ 'S_K2', 'Sb2', 'Sa3', 'Sa2', 'Sa1', 'Sb1', 'S_K1', 'Ba_left','Bb' ],
        'b' : [ 'S_K2', 'Sb2', 'Sa3', 'Sa2', 'Sa1', 'Sb1', 'S_K1', 'Ba_left','Bb' ],
        'c' : [ 'S_K2', 'Sb2', 'Sa3', 'Sa2', 'Sa1', 'Sb1', 'S_K1', '-', '-' ],
        'd' : [ 'S_K2', 'Sb2', 'Sa3', 'Sa2', 'Sa1', 'Sb1', 'S_K1', 'Ba_right', 'Bb'],
        'e' : [ 'S_K2', 'Sb2', 'Sa3', 'Sa2', 'Sa1', 'Sb1', 'S_K1', 'Ba_right', 'Bb']
    },

    m_CurrentSelectableChoices : { 0 :'Sa2', 1 : 'Sa3', 2 : 'Sb2' },

    SetTargetSpot : function( ShootSpotInString )
    {
        this.m_CurrentSelectableChoices = {};
        
        TargetSpotList = this.TARGET_SPOT_ASSIGN[ ShootSpotInString ];

        document.getElementById("SelectButton1_shoot").value = ME2OTHERS [ TargetSpotList[ 0 ] ];
        document.getElementById("SelectButton2_shoot").value = ME2OTHERS [ TargetSpotList[ 1 ] ];
        document.getElementById("SelectButton3_shoot").value = ME2OTHERS [ TargetSpotList[ 2 ] ];
        document.getElementById("SelectButton4_shoot").value = ME2OTHERS [ TargetSpotList[ 3 ] ];
        document.getElementById("SelectButton5_shoot").value = ME2OTHERS [ TargetSpotList[ 4 ] ];
        document.getElementById("SelectButton6_shoot").value = ME2OTHERS [ TargetSpotList[ 5 ] ];
        document.getElementById("SelectButton7_shoot").value = ME2OTHERS [ TargetSpotList[ 6 ] ];
        document.getElementById("SelectButton8_shoot").value = ME2OTHERS [ TargetSpotList[ 7 ] ];
        document.getElementById("SelectButton9_shoot").value = ME2OTHERS [ TargetSpotList[ 8 ] ];


        var target1 = TargetSpotList[ 0 ];
        var target2 = TargetSpotList[ 1 ];
        var target3 = TargetSpotList[ 2 ];
        var target4 = TargetSpotList[ 3 ];
        var target5 = TargetSpotList[ 4 ];
        var target6 = TargetSpotList[ 5 ];
        var target7 = TargetSpotList[ 6 ];
        var target8 = TargetSpotList[ 7 ];
        var target9 = TargetSpotList[ 8 ];


        var DefaultTargetSpotSelectionInString = null;
        if( target1 == '-' )
        {

        }
        else
        {
            DefaultTargetSpotSelectionInString = target1;
        }


        if( target1 == '-' )
        {
            document.getElementById("target1_shoot").disabled = true;
        }
        else
        {
            this.m_CurrentSelectableChoices[ 0 ] = target1;
            document.getElementById("target1_shoot").disabled = false;
        }

        if( target2 == '-' )
        {
            document.getElementById("target2_shoot").disabled = true;
        }
        else
        {
            this.m_CurrentSelectableChoices[ 1 ] = target2;
            document.getElementById("target2_shoot").disabled = false;
        }


        if( target3 == '-' )
        {
            document.getElementById("target3_shoot").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 2 ] = target3;
            document.getElementById("target3_shoot").disabled = false;
        }

        if( target4 == '-' )
        {
            document.getElementById("target4_shoot").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 3 ] = target4;
            document.getElementById("target4_shoot").disabled = false;
        }

        if( target5 == '-' )
        {
            document.getElementById("target5_shoot").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 4 ] = target5;
            document.getElementById("target5_shoot").disabled = false;
        }

        if( target6 == '-' )
        {
            document.getElementById("target6_shoot").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 5 ] = target6;
            document.getElementById("target6_shoot").disabled = false;
        }

        if( target7 == '-' )
        {
            document.getElementById("target7_shoot").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 6 ] = target7;
            document.getElementById("target7_shoot").disabled = false;
        }

        if( target8 == '-' )
        {
            document.getElementById("target8_shoot").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 7 ] = target8;
            document.getElementById("target8_shoot").disabled = false;
        }

        if( target9 == '-' )
        {
            document.getElementById("target9_shoot").disabled = true;
        }
        else
        {
            this.m_CurrentSelectableChoices[ 8 ] = target9;
            document.getElementById("target9_shoot").disabled = false;
        }


        this.SetShootSpotChecked( DEFAULT );


        return DefaultTargetSpotSelectionInString;

    },

    /**
     * 
     * @param {int} spot_num 0 to 1
     */
    SetShootSpotChecked : function( spot_num )
    {
        var CurrentShootSpotSelectionInString = Talker.GetCurrentShootSpotInString();
        var CurrentTargetSpotSelectionInString = M2.TargetSpotController.m_CurrentSelectableChoices[ spot_num ];

        if( CurrentTargetSpotSelectionInString != undefined )
        {
            M2.Updater.UpdateFromROSParam( { ShootSpotInString : CurrentShootSpotSelectionInString, TargetSpotInString : CurrentTargetSpotSelectionInString } );
            Talker.M2.SetTargetSpot( CurrentTargetSpotSelectionInString );
        }

        switch(spot_num){
            case 0:
            {
                document.getElementById("target1_shoot").checked = true;
                break;
            }
            case 1:
            {
                document.getElementById("target2_shoot").checked = true;
                break;
            }
            case 2:
            {
                document.getElementById("target3_shoot").checked = true;
                break;
            }
            case 3:
            {
                document.getElementById("target4_shoot").checked = true;
                break;
            }
            case 4:
            {
                document.getElementById("target5_shoot").checked = true;
                break;
            }
            case 5:
            {
                document.getElementById("target6_shoot").checked = true;
                break;
            }
            case 6:
            {
                document.getElementById("target7_shoot").checked = true;
                break;
            }
            case 7:
            {
                document.getElementById("target8_shoot").checked = true;
                break;
            }
            case 8:
            {
                document.getElementById("target9_shoot").checked = true;
                break;
            }
            default:
                break;
        }


    },

    GetCurrentTargetSpotSelection : function()
    {
        var CheckedNum = 0;

        var elements = document.getElementsByName( 'target_shoot' );

        for( let i = 0; i < elements.length; i++ )
        {
            if( elements.item( i ).checked )
            {
                CheckedNum = i;
            }
        }

        return this.m_CurrentSelectableChoices[ CheckedNum ];

    },

    GetCurrentTargetSpotSelectionInInt : function()
    {
        var CheckedNum = 0;

        var elements = document.getElementsByName( 'target_shoot' );

        for( let i = 0; i < elements.length; i++ )
        {
            if( elements.item( i ).checked )
            {
                CheckedNum = i;
            }
        }

        return CheckedNum;

    },


    Next : function()
    {
        var CheckedNum = this.GetCurrentTargetSpotSelectionInInt();

        if( CheckedNum >= Object.keys( this.m_CurrentSelectableChoices ).length - 1 )
        {
            CheckedNum = 0;
        }
        else
        {
            CheckedNum++;
        }

        this.SetShootSpotChecked( CheckedNum );
    },

    Back : function()
    {
        var CheckedNum = this.GetCurrentTargetSpotSelectionInInt();

        if( CheckedNum == 0 )
        {
            CheckedNum = Object.keys( this.m_CurrentSelectableChoices ).length - 1;
        }
        else
        {
            CheckedNum--;
        }

        this.SetShootSpotChecked( CheckedNum );
    },

    Init : function( CurrentShootSpotInString )
    {
        this.SetTargetSpot( CurrentShootSpotInString );
    }

}
