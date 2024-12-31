UnderCarriage.SteeringTickController = {

    Steering_TIM_INTERVAL : 250,
    Steering_drive        : true,
    RunStatus             : false,
    state                 : false,
    CountUP               : true,
    NumberOfTimes         : 10,
    AnglePerOneTime       : 36,
    count                 : 0,
    finish                : false,

    StartSteeringRotate : function()
    {
        this.Steering_drive = !this.Steering_drive; 
        this.ChangeSteeringDrive( this.Steering_drive )
        this.RunStatus = true;
    },

    SendSteeringMotor : function()
    {
        if( this.state )
        {
            if( this.count != this.NumberOfTimes )
            {
                if( this.finish )
                {
                    this.RunStatus = false;

                    this.Steering_drive = true;

                    this.ChangeSteeringDrive( true )

                    // this.NumberOfTimes = 0;
                    Talker.StopMotor( 1 );
                    document.getElementById( "state_steering" ).innerHTML = "OFF";
                    console.log( "finish" );
                    this.finish = false;
                    this.state = false

                }else{
                    if( this.CountUP )
                    {

                        document.getElementById( "state_steering" ).innerHTML = "ON";
                        this.count++;
                        console.log( "count :" + this.count );

                        for ( let i = 1; i < 5; i++ )
                        {
                            Talker.DriveUnderCarriageSteeringMotor( this.AnglePerOneTime * this.count, i );
                        }

                        if( this.count == this.NumberOfTimes )
                        {
                            this.CountUP = false;
                            console.log( "debug:折返し" )
                        }

                    }else if( !this.CountUP )
                    {
                        document.getElementById( "state_steering" ).innerHTML = "ON";
                        this.count--;
                        console.log( "count :" + this.count) ;
                        
                        for ( let i = 1; i < 5; i++ )
                        {
                            Talker.DriveUnderCarriageSteeringMotor( this.AnglePerOneTime * this.NumberOfTimes - this.AnglePerOneTime * ( this.NumberOfTimes - this.count ) ,i );
                        }

                        if( this.count == 0 )
                        {
                            this.finish = true
                            this.CountUP = true;
                        }

                    }
                }
            }else if( !this.CountUP )
            {
                document.getElementById( "state_steering" ).innerHTML = "ON";
                this.count--;
                console.log( "count :" + this.count );

                for ( let i = 1; i < 5; i++ )
                {
                    Talker.DriveUnderCarriageSteeringMotor( this.AnglePerOneTime * this.NumberOfTimes - this.AnglePerOneTime * ( this.NumberOfTimes - this.count ), i );
                }

                if( this.count == 0 )
                {
                    this.finish = true
                    this.CountUP = true;
                }
                
            }
        }
    },

    ChangeSteeringDrive : function ( state )
    {
        if( this.RunStatus == false )
        {
            if( this.state )
            {
                document.getElementById( "M1D" ).checked = true;
            }else{

                document.getElementById( "M1M" ).checked = true;
                this.state = true;
            }
        
        }
    },

    Init : function()
    {
        setInterval("UnderCarriage.SteeringTickController.SendSteeringMotor()",this.Steering_TIM_INTERVAL);
    }

}