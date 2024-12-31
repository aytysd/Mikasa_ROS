
Mechanism.SticksAction = 
{
    LSV : function( depth )
    {
        if( depth > 0 )
        {
            Mechanism.ShootSpeedController.IncrementShootSpeed( depth );
        }
        else if( depth < 0 )
        {
            Mechanism.ShootSpeedController.DecrementShootSpeed( depth );
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
            Mechanism.SteeringAngleController.IncrementSteeringAngle( depth );
        }
        else if( depth < 0 )
        {
            Mechanism.SteeringAngleController.DecrementSteeringAngle( depth );
        }
    },


}