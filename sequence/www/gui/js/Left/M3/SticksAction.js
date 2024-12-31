
M3.SticksAction = 
{
    LSV : function( depth )
    {
        if( depth > 0 ) 
        {
            M3.ShootSpeedController.IncrementShootDownSpeed( depth );
        }
        else if( depth < 0 )
        {
            M3.ShootSpeedController.DecrementShootDownSpeed( depth );
        }
        else if( depth == 0 )
        {

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
            M3.SteeringAngleController.DecrementSteeringAngle( depth * ( -1 ) );
        }
        else if( depth < 0 )
        {
            M3.SteeringAngleController.IncrementSteeringAngle( depth * ( -1 ) );
        }
        else if( depth == 0 )
        {
            M3.SteeringAngleController.ResetJoyData();
        }
    }


}