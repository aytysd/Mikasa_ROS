ShootSticksAction = 
{
    LSV : function( depth )
    {
        if( depth > 0 )
        {
            ShootSpeedController.IncrementShootSpeed( depth );
        }
        else if( depth < 0 )
        {
            ShootSpeedController.DecrementShootSpeed( depth );
        }


    },

    LSH : function( depth )
    {

    },

    RSV : function( depth )
    {

    },

    RSH : function( depth )
    {
        if( depth > 0 )
        {
            SteeringAngleController.IncrementSteeringAngle( depth );
        }
        else if( depth < 0 )
        {
            SteeringAngleController.DecrementSteeringAngle( depth );
        }
        else if( depth == 0 )
        {
            SteeringAngleController.ResetJoyData();
        }

    }

}