const DEFAULT = 0;

TargetSpotController = 
{
    m_CurrentSelectableChoices : { 0 : 'Ba_left'},

    SetTargetSpot : function( target1 = '-', target2 = '-', target3 = '-' )
    {
        this.m_CurrentSelectableChoices = {};

        document.getElementById("target1_ui").innerHTML = ME2OTHERS[ target1 ];
        document.getElementById("target2_ui").innerHTML = ME2OTHERS[ target2 ];
        document.getElementById("target3_ui").innerHTML = ME2OTHERS[ target3 ];


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
            document.getElementById("target1").disabled = true;
        }
        else
        {
            this.m_CurrentSelectableChoices[ 0 ] = target1;
            document.getElementById("target1").disabled = false;
        }

        if( target2 == '-' )
        {
            document.getElementById("target2").disabled = true;
        }
        else
        {
            this.m_CurrentSelectableChoices[ 1 ] = target2;
            document.getElementById("target2").disabled = false;
        }


        if( target3 == '-' )
        {
            document.getElementById("target3").disabled = true;

        }
        else
        {
            this.m_CurrentSelectableChoices[ 2 ] = target3;
            document.getElementById("target3").disabled = false;
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
        var CurrentShootSpotSelectionInString = ShootSpotController.GetCurrentShootSpotSelection();
        var CurrentTargetSpotSelectionInString = this.m_CurrentSelectableChoices[ spot_num ];

        if( CurrentTargetSpotSelectionInString != undefined )
        {
            Updater.UpdateFromROSParam( { ShootSpotInString : CurrentShootSpotSelectionInString, TargetSpotInString : CurrentTargetSpotSelectionInString } );
            Talker.SetTargetSpot( CurrentTargetSpotSelectionInString );
        }

        switch(spot_num){
            case 0:
            {
                document.getElementById("target1").checked = true;
                break;
            }
            case 1:
            {
                document.getElementById("target2").checked = true;
                break;

            }
            case 2:
            {
                document.getElementById("target3").checked = true;
                break;
            }
            default:
                break;
        }


    },

    GetCurrentTargetSpotSelection : function()
    {
        var CheckedNum = 0;

        var elements = document.getElementsByName( 'target' );

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

        var elements = document.getElementsByName( 'target' );

        for( let i = 0; i < elements.length; i++ )
        {
            if( elements.item( i ).checked )
            {
                CheckedNum = i;
            }
        }

        return CheckedNum;

    },


    ToggleTargetSpotSelection : function()
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
    }

}
