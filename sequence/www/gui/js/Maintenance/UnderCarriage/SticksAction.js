
UnderCarriage.SticksAction = 
{
    LSV : function( depth )
    {

    },

    LSH : function( depth )
    {

    },

    RSV : function( depth )
    {

    },

    RSH : function( depth )
    {
        //change steering power
        if( depth > 0 )
        {
            UnderCarriage.DriveSpeedController.IncrementUnderCarriageSpeed( depth );
        }
        else if( depth < 0 )
        {
            UnderCarriage.DriveSpeedController.DecrementUnderCarriageSpeed( depth );
        }
    },


}