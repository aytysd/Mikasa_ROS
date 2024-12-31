M2.SticksAction = 
{

    LSH : function( depth )
    {

    },

    LSV : function( depth )
    {
        if( depth > 0 )
        {
            M2.ShootSpeedController.IncrementShootSpeed( depth );
        }
        else if( depth < 0 )
        {
            M2.ShootSpeedController.DecrementShootSpeed( depth );
        }
        else if( depth == 0 )
        {

        }
    },

    RSV : function( depth )
    {

    },

    RSH : function( depth )
    {
        if( depth > 0 )
        {
            M2.SteeringAngleController.DecrementSteeringAngle( depth * ( -1 ) );
        }
        else if( depth < 0 )
        {
            M2.SteeringAngleController.IncrementSteeringAngle( depth * ( -1 ) );

        }
        else if( depth == 0 )
        { 
            M2.SteeringAngleController.ResetJoyData();
        }
    }
}