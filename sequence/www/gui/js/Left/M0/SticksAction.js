M0.SticksAction = 
{

    LSH : function( depth )
    {

    },

    LSV : function( depth )
    {
        if( depth > 0 )
        {
            M0.ShootSpeedController.IncrementShootSpeed( depth );
        }
        else if( depth < 0 )
        {
            M0.ShootSpeedController.DecrementShootSpeed( depth );
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
            M0.SteeringAngleController.DecrementSteeringAngle( depth * ( -1 ) );
        }
        else if( depth < 0 )
        {
            M0.SteeringAngleController.IncrementSteeringAngle( depth * ( -1 ) );
        }
        else if( depth == 0 )
        { 
            M0.SteeringAngleController.ResetJoyData( depth );
        }
    }
}