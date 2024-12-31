
const Movement = true;
const Shoot = false;
const TIME_INTERVAL = 50;

GamePad = 
{
    m_f_Enabled : true,
    m_f_ActionMode : Movement,
    init : function()
    {
        setInterval( 'GamePad.getJoy()', TIME_INTERVAL );
    },


    getJoy : function()
    {
        var pads = navigator.getGamepads ? navigator.getGamepads() :
        (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

        pad = pads[0];

        if( pad ) 
        {
            document.getElementById("gamepad_status").innerHTML = "Connected";
            //buttons for display
            showed_buttons = []
            for(var i = 0 ; i < pad.buttons.length; i++)
            {
                showed_buttons.push(pad.buttons[i].value);
            }

            this.CheckButtons
            (
                {
                    Menu : showed_buttons[9],
                    A : showed_buttons[0],
                    B : showed_buttons[1],
                    X : showed_buttons[2],
                    Y : showed_buttons[3],
                    L1 : showed_buttons[4],
                    R1 : showed_buttons[5],
                    L2 : showed_buttons[6],
                    R2 : showed_buttons[7],
                    CSU : showed_buttons[12],
                    CSD : showed_buttons[13],
                    CSR : showed_buttons[15],
                    CSL : showed_buttons[14]
                }
            );

            this.CheckSticks
            (
                {
                    LSV : pad.axes[ 1 ] * ( -1 ),
                    LSH : pad.axes[ 0 ],
                    RSV : pad.axes[ 3 ],
                    RSH : pad.axes[ 2 ]
                }
            );

        }
        else
        {
            document.getElementById("gamepad_status").innerHTML = "Disconnected";
        }
        
    },

    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckA : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }



        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.A( depth );
                document.getElementById("A_button").src = "../img/controller_on.png";
            }
            arguments.callee.accepting = false;
        }
        else
        {
            document.getElementById("A_button").src = "../img/controller_off.png";
            arguments.callee.accepting = true;
        }



    },

    /**
     * 
     * @param {float} depth 0 to 1 
     */
    CheckB : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.B( depth );
                document.getElementById("B_button").src = "../img/controller_on.png";

            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
            document.getElementById("B_button").src = "../img/controller_off.png";

        }
    },

    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckX : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.X( depth );
                document.getElementById("X_button").src = "../img/controller_on.png";
            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
            document.getElementById("X_button").src = "../img/controller_off.png";
        }

    },

    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckY : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.Y( depth );
                document.getElementById("Y_button").src = "../img/controller_on.png";
            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
            document.getElementById("Y_button").src = "../img/controller_off.png";
        }

    },

    /**
     * Cross Stick up
     * @param {float} depth 0 to 1
     */
    CheckCSU : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( !( 'continuous' in arguments.callee ) )
        {
            arguments.callee.continuous = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting || arguments.callee.continuous )
            {
                ButtonsAction.CSU( depth );
            }
            document.getElementById("cross_up").src = "../img/cross_on.png";
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
            document.getElementById("cross_up").src = "../img/cross_off.png";
        }

    },

    /**
     * Cross Stick Right
     * @param {float} depth 0 to 1
     */
    CheckCSR : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }


        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.CSR( depth );
            }
            document.getElementById("cross_right").src = "../img/cross_on.png";
            arguments.callee.accepting = false;
        }
        else
        {
            document.getElementById("cross_right").src = "../img/cross_off.png";
            arguments.callee.accepting = true;
        }

    },

    /**
     * Cross Stick Down
     * @param {float} depth 0 to 1
     */
    CheckCSD : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( !( 'continuous' in arguments.callee ) )
        {
            arguments.callee.continuous = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting || arguments.callee.continuous )
            {
                ButtonsAction.CSD( depth );
            }
            document.getElementById("cross_down").src = "../img/cross_on.png";
            arguments.callee.accepting = false;
        }
        else
        {
            document.getElementById("cross_down").src = "../img/cross_off.png";
            arguments.callee.accepting = true;
        }
    },

    /**
     * Cross Stick Right
     * @param {float} depth 0 to 1
     */
    CheckCSL : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }


        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.CSL( depth );
            }
            document.getElementById("cross_left").src = "../img/cross_on.png";
            arguments.callee.accepting = false;
        }
        else
        {
            document.getElementById("cross_left").src = "../img/cross_off.png";
            arguments.callee.accepting = true;
        }

    },

    /**
     * menu button
     * @param {float} depth 0 to 1
     */
    CheckMenu : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.Menu( depth );
            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
        }

    },

    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckL1 : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                ButtonsAction.L1( depth );
                document.getElementById("L1").src = "../img/cross_on.png";
            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
            document.getElementById("L1").src = "../img/cross_off.png";

        }

    },

    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckL2 : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                document.getElementById("L2").src = "../img/cross_on.png";
                ButtonsAction.L2( depth );
            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;7
            document.getElementById("L2").src = "../img/cross_off.png";
        }

    },

    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckR1 : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                document.getElementById("R1").src = "../img/cross_on.png";
                ButtonsAction.R1( depth );
            }
            arguments.callee.accepting = false;
        }
        else
        {
            arguments.callee.accepting = true;
            document.getElementById("R1").src = "../img/cross_off.png";

        }
    },


    /**
     * 
     * @param {float} depth 0 to 1
     */
    CheckR2 : function( depth )
    {
        if ( !( 'accepting' in arguments.callee ) )
        {
            arguments.callee.accepting = false;
        }

        if( depth > 0 )
        {
            if( arguments.callee.accepting )
            {
                document.getElementById("R2").src = "../img/cross_on.png";
                ButtonsAction.R2( depth );
            }
            arguments.callee.accepting = false;
        }
        else
        {
            document.getElementById("R2").src = "../img/cross_off.png";
            arguments.callee.accepting = true;
        }

    },

    /**
     * 
     * @param {bool} state  true:you can use controller.
     */
    SetEnableOrDisable( state )
    {
        
        this.m_f_Enabled = state;

        if( this.m_f_Enabled )
        {
            document.getElementById("ControlUsable").innerHTML = "Unlocked";
            document.body.style.backgroundColor = "black";
        }
        else
        {
            document.getElementById("ControlUsable").innerHTML = "Locked";
            document.body.style.backgroundColor = "#770000";
        }
    },
    

    CheckButtons : function
    (
        {
            Menu,
            A,
            B,
            X,
            Y,
            L1,
            R1,
            L2,
            R2,
            CSU,
            CSD,
            CSR,
            CSL    
        }
    )
    {
        this.CheckMenu( Menu );

        if( this.m_f_Enabled )
        {
            this.CheckA( A );
            this.CheckB( B );
            this.CheckX( X );
            this.CheckY( Y );
            this.CheckL1( L1 );
            this.CheckL2( L2 );
            this.CheckR1( R1 );
            this.CheckR2( R2 );
            this.CheckCSU( CSU );
            this.CheckCSR( CSR );
            this.CheckCSD( CSD );
            this.CheckCSL( CSL );    
        }
    },

    CheckSticks : function
    (
        {
            LSV,
            LSH,
            RSV,
            RSH
        }
    )
    {
        if( this.m_f_Enabled )
        {
            if( this.m_f_ActionMode == Movement )
            {
                MovementSticksAction.LSRS( LSV, LSH, RSV, RSH );
            }
            else if( this.m_f_ActionMode == Shoot )
            {
                SticksAction.LSV( LSV );
                SticksAction.LSH( LSH );
                SticksAction.RSV( RSV );
                SticksAction.RSH( RSH );    
    
            }

            document.getElementById("joy_stick1").style.top = (45.2+LSV*(-1))+"%";
            document.getElementById("joy_stick1").style.left = (49.5+LSH)+"%";
            document.getElementById("joy_stick2").style.top = (45.2+RSV)+"%";
            document.getElementById("joy_stick2").style.left = (67.5+RSH)+"%";

            if( ( LSH + LSV ) != 0 ) 
            {
                document.getElementById("joy_stick1").src = "../img/controller_on.png";
            }
            else
            {
                document.getElementById("joy_stick1").src = "../img/controller_off.png";
            }

            if( ( RSH + RSV ) != 0 )
            {
                document.getElementById("joy_stick2").src = "../img/controller_on.png";
            }
            else
            {
                document.getElementById("joy_stick2").src = "../img/controller_off.png";
            }

        }
    },

    Enable : function()
    {
        this.m_f_Enabled = true;
        document.getElementById("ControlUsable").innerHTML = "Unlocked";

        if( this.m_f_ActionMode == Movement )
        {
            document.body.style.backgroundColor = "black";

        }
        else if( this.m_f_ActionMode == Shoot )
        {
            document.body.style.backgroundColor = "#000080";

        }

    },
    
    Disable : function()
    {
        this.m_f_Enabled = false;
        document.getElementById("ControlUsable").innerHTML = "Locked";
        document.body.style.backgroundColor = "#770000";
    },

    Toggle : function()
    {
        this.m_f_Enabled = !this.m_f_Enabled;

        if( this.m_f_Enabled )
        {
            document.getElementById("ControlUsable").innerHTML = "Unlocked";
            document.body.style.backgroundColor = "black";
        }
        else
        {
            document.getElementById("ControlUsable").innerHTML = "Locked";
            document.body.style.backgroundColor = "#770000";
        }
    
    },

    ToggleActionMode : function()
    {
        this.m_f_ActionMode = !this.m_f_ActionMode;
        this.SetActionMode( this.m_f_ActionMode );
    },

    SetActionMode : function( mode )
    {
        this.m_f_ActionMode = mode;

        if( this.m_f_ActionMode == Movement )
        {
            document.body.style.backgroundColor = "black";
            document.getElementById("mode").innerHTML = "PARAMETERS [足回りモード]";


            this.CheckCSD.continuous = false;
            this.CheckCSU.continuous = false;
            this.CheckY.continuous = false;
            this.CheckA.continuous = false;
        }
        else if( this.m_f_ActionMode == Shoot )
        {
            document.getElementById("mode").innerHTML = "PARAMETERS [操縦モード]";
            document.body.style.backgroundColor = "#000080";

            this.CheckCSD.continuous = true;
            this.CheckCSU.continuous = true;
            this.CheckY.continuous = true;
            this.CheckA.continuous = true;

        }

    }

    
}

GamePad.init();
