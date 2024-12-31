
const  UPPER = 0;
const FASTEST = 1;
const  LOWER = 2;

const MIDDLE = 1;

PurePursuitController = 
{

    AutoReturn : function()
    {
        document.getElementById("AutoControl").innerHTML = "有効";
        document.getElementById("ManualControl").innerHTML = "無効";

        FireStatusController.SetFireStatus( false );

        var route = this.GetWhichRoute();
        var where = ShootSpotController.GetCurrentShootSpotSelectionInInt();
        Talker.AutoReturn( { route : route, where : where } );

        document.getElementsByName('upper_lower').item( MIDDLE ).checked = true;


    },

    AutoOutward : function()
    {
        document.getElementById("AutoControl").innerHTML = "有効";
        document.getElementById("ManualControl").innerHTML = "無効";

        FireStatusController.SetFireStatus( false );

        var route = this.GetWhichRoute();
        var where = ShootSpotController.GetCurrentShootSpotSelectionInInt();
        Talker.AutoOutward( { route : route, where : where } );

        document.getElementsByName('upper_lower').item( MIDDLE ).checked = true;

    },

    GetWhichRoute : function()
    {
        var CheckedNum = FASTEST;

        let elements = document.getElementsByName( 'upper_lower' );

        for( let i = 0; i < elements.length; i++ )
        {
            if( elements.item( i ).checked )
            {
                CheckedNum = i;
            }
        }

        return CheckedNum;
    },

    SetWhichRoute : function( route )
    {
        document.getElementsByName('upper_lower').item( route ).checked = true;
    },

    SelectUp : function()
    {
        var CheckedNum = this.GetWhichRoute();

        if( CheckedNum <= 0 )
        {

        }
        else
        {
            CheckedNum--;
            this.SetWhichRoute( CheckedNum );
        }
    },

    SelectDown : function()
    {
        var CheckedNum = this.GetWhichRoute();

        if( CheckedNum >= 2 )
        {

        }
        else
        {
            CheckedNum++;
            this.SetWhichRoute( CheckedNum );
        }
    },

    TogglePurePursuitEnable : function()
    {
        Talker.TogglePurePursuitEnabled
        (
            function( param )
            {
                if( param )
                {
                    document.getElementById("AutoControl").innerHTML = "有効";
                    document.getElementById("ManualControl").innerHTML = "無効";
                }
                else
                {
                    document.getElementById("AutoControl").innerHTML = "無効";
                    document.getElementById("ManualControl").innerHTML = "有効";
        
                }


        
            }
        );

        
    }

}