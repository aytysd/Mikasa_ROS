var state               =    [];
var image               = false;
var attitude_angle_flag = false;
var control_mode       = false;
var L1_state            = false;
var PurePursuit_flag    = false;
var Emergency_state     = false;
var MemorizeOfParam     = false; 
var controller_usable   =  true;
var selected_pos = "a";
var select_spot = 0;

var shoot_speed_a = [8000,8000,8000];
var shoot_speed_b = [8000,8000,8000];
var shoot_speed_c = [8000,8000,8000];
var shoot_speed_d = [8000,8000,8000];
var shoot_speed_e = [8000,8000,8000];

var elevation_angle_a = [220,220,220];
var elevation_angle_b = [220,220,220];
var elevation_angle_c = [220,220,220];
var elevation_angle_d = [220,220,220];
var elevation_angle_e = [220,220,220];


var angle = 0;


var joystick_left_x  = 49.5;
var joystick_left_y  = 45.2;
var joystick_right_x = 67.5;
var joystick_right_y = 45.2;

var shot_route = 0;
var shot_point = 0;
var rotate     = 0;
var state_fire = false;
var zero_angle_flag = false;
var Speed = 15000;

var UI = null;

var GamePad = {
    ros : null,
    name : "",
    init : function(){
        this.ros = new ROSLIB.Ros();    
    },

    SetRotate:function(value){
        rotate = value;
    },

    getJoy : function(){
        var pads = navigator.getGamepads ? navigator.getGamepads() :
        (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

        var joy_data = new ROSLIB.Message({  axes:[], buttons:[]});
        pad = pads[0];
        if(pad) {
            document.getElementById("gamepad_status").innerHTML = "Connected";
            //buttons for display
            showed_buttons = []
            for(var i = 0 ; i < pad.buttons.length; i++) {
                showed_buttons.push(pad.buttons[i].value);
            }
            ChangeControllerButtons(
                showed_buttons[9],
                showed_buttons[0],
                showed_buttons[1],
                showed_buttons[2],
                showed_buttons[3],
                showed_buttons[4],
                showed_buttons[5],
                showed_buttons[6],
                showed_buttons[7],
                showed_buttons[12],
                showed_buttons[13],
                showed_buttons[15],
                showed_buttons[14]
            );

            
            //axes for display
            var ax = "";
            for(var i = 0 ; i < pad.axes.length-2; i++) {
                joy_stick_state[i]= pad.axes[i];
            }
            if(controller_usable){
                document.getElementById("joy_stick2").style.left =String(joystick_left_x+pad.axes[0]) +"%";
                document.getElementById("joy_stick2").style.top  =String(joystick_left_y+pad.axes[1]) +"%";
                document.getElementById("joy_stick1").style.left =String(joystick_right_x+pad.axes[2])+"%";
                document.getElementById("joy_stick1").style.top  =String(joystick_right_y+pad.axes[3])+"%";

                if(pad.axes[0]-pad.axes[1] == 0){
                    document.getElementById("joy_stick2").src = "../img/controller_off.png";
                }else document.getElementById("joy_stick2").src = "../img/controller_on.png";

                if(pad.axes[2]-pad.axes[3] == 0){
                    document.getElementById("joy_stick1").src = "../img/controller_off.png";
                }else document.getElementById("joy_stick1").src = "../img/controller_on.png";

                if(control_mode){
                    if(Math.abs(pad.axes[2])>0.5){
                        if(pad.axes[2]>0){
                            switch(selected_pos){
                                case "a":
                                    if(shoot_speed_a[select_spot]<document.getElementById("speed").max){
                                        shoot_speed_a[select_spot] = shoot_speed_a[select_spot] +10;
                                        Talker.SetShootSpeed(shoot_speed_a[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                            
                                        SetSpeed(shoot_speed_a[select_spot]);
                                    }
                                    break;
                                case "b":
                                    if(shoot_speed_b[select_spot]<document.getElementById("speed").max){
                                        shoot_speed_b[select_spot] = shoot_speed_b[select_spot] +10;
                                        Talker.SetShootSpeed(shoot_speed_b[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                            
                                        SetSpeed(shoot_speed_b[select_spot]);    
                                    }
                                    break;
                                case "c":
                                    if(shoot_speed_c[select_spot]<document.getElementById("speed").max){
                                        shoot_speed_c[select_spot] = shoot_speed_c[select_spot] +10;
                                        Talker.SetShootSpeed(shoot_speed_c[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_c[select_spot]);
                                    }
                                    break;
                                case "d":
                                    if(shoot_speed_d[select_spot]<document.getElementById("speed").max){
                                        shoot_speed_d[select_spot] = shoot_speed_d[select_spot] +10;
                                        Talker.SetShootSpeed(shoot_speed_d[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_d[select_spot]);
                                    }
                                    break;
                                case "e":
                                    if(shoot_speed_e[select_spot]<document.getElementById("speed").max){
                                        shoot_speed_e[select_spot] = shoot_speed_e[select_spot] +10;
                                        Talker.SetShootSpeed(shoot_speed_e[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_e[select_spot]);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        if(pad.axes[2]<0){
                            switch(selected_pos){
                                case "a":
                                    if(shoot_speed_a[select_spot]>document.getElementById("speed").min){
                                        shoot_speed_a[select_spot] = shoot_speed_a[select_spot] -10;
                                        Talker.SetShootSpeed(shoot_speed_a[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_a[select_spot]);    
                                    }
                                    break;
                                case "b":
                                    if(shoot_speed_b[select_spot]>document.getElementById("speed").min){
                                        shoot_speed_b[select_spot] = shoot_speed_b[select_spot] -10;
                                        Talker.SetShootSpeed(shoot_speed_b[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_b[select_spot]);    
                                    }
                                    break;
                                case "c":
                                    if(shoot_speed_c[select_spot]>document.getElementById("speed").min){
                                        shoot_speed_c[select_spot] = shoot_speed_c[select_spot] -10;
                                        Talker.SetShootSpeed(shoot_speed_c[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_c[select_spot]);    
                                    }
                                    break;
                                case "d":
                                    if(shoot_speed_d[select_spot]>document.getElementById("speed").min){
                                        shoot_speed_d[select_spot] = shoot_speed_d[select_spot] -10;
                                        Talker.SetShootSpeed(shoot_speed_d[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_d[select_spot]);    
                                    }
                                    break;
                                case "e":
                                    if(shoot_speed_e[select_spot]>document.getElementById("speed").min){
                                        shoot_speed_e[select_spot] = shoot_speed_e[select_spot] -10;
                                        Talker.SetShootSpeed(shoot_speed_e[select_spot],selected_pos,UI.GetSpot(selected_pos,select_spot));
                                        SetSpeed(shoot_speed_e[select_spot]);    
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    if(Math.abs(pad.axes[0])>0.5){
                        if(pad.axes[0]<0){
                            if(angle>document.getElementById("angle_range").min*3){
                                angle = angle -1;
                                if(angle%3 == 0){
                                    UI.SetAngleUI(angle/3);
                                    Talker.SetSteeringDev(angle/3,UI.GetSpot(selected_pos,select_spot));
                                }
                            }
                        }
                        if(pad.axes[0]>0){
                            if(angle<document.getElementById("angle_range").max*3){
                                angle = angle +1;
                                if(angle%3 == 0){
                                    UI.SetAngleUI(angle/3);
                                    Talker.SetSteeringDev(angle/3,UI.GetSpot(selected_pos,select_spot));
                                }
                            }
                        }
                    }
                }else{
                    Talker.ManualCommandSend(pad.axes[0],pad.axes[1]*-1,pad.axes[2]*(-1));
                }
            }else{
                document.getElementById("joy_stick2").style.left =String(joystick_left_x) +"%";
                document.getElementById("joy_stick2").style.top  =String(joystick_left_y) +"%";
                document.getElementById("joy_stick1").style.left =String(joystick_right_x)+"%";
                document.getElementById("joy_stick1").style.top  =String(joystick_right_y)+"%";
                document.getElementById("joy_stick1").src = "../img/controller_off.png";
                document.getElementById("joy_stick2").src = "../img/controller_off.png";

            }
            //for json
            for(var i = 0 ; i < pad.buttons.length; i++) {
                joy_data.buttons.push(Number(pad.buttons[i].pressed));      
            }
            for(var i = 0 ; i < pad.axes.length; i++) {
                joy_data.axes.push(pad.axes[i]);
            }    
            for(var i = 0 ; i < pad.buttons.length; i++) {
                joy_data.axes.push(pad.buttons[i].value);
            }
            return joy_data
            }
            else{
                document.getElementById("gamepad_status").innerHTML = "Disonnected";
                joy_data = null
            }
        }
    }
    GamePad.init();

if(!UI){
    UI = {
        

        /**
         * 
         * @param {string} pos shoo spot
         * @param {int} spot_num target button number
         * @returns 
         */
        GetSpot(pos,spot_num){
            
            switch (pos){
                case "a":
                    switch(spot_num){
                        case 0:
                            return "Ba_left";
                            break;
                        case 1:
                            return "Bb";
                            break;
                        case 2:
                            return null;
                            break;
                        default:
                            return spot_num;
                    }
                    break;
                case "b":
                    switch(spot_num){
                        case 0:
                            return "Bb";
                            break;
                        case 1:
                            return null;
                            break;
                        case 2:
                            return null;
                            break;
                        default:
                            return spot_num;
                    }
                    break;
                case "c":
                    switch(spot_num){
                        case 0:
                            return null;
                            break;
                        case 1:
                            return null;
                            break;
                        case 2:
                            return null;
                            break;
                        default:
                            return spot_num;
                    }
                    break;
                case "d":
                    switch(spot_num){
                        case 0:
                            return "Bb";
                            break;
                        case 1:
                            return null;
                            break;
                        case 2:
                            return null;
                            break;
                        default:
                            return spot_num;
                    }
                    break;
                case "e":
                    switch(spot_num){
                        case 0:
                            return "Ba_right";
                            break;
                        case 1:
                            return "Bb";
                            break;
                        case 2:
                            return null;
                            break;
                        default:
                            return spot_num;    
                    }
                    break;
            }
        },
        /**
         * 
         * @param {string} pos shoot point
         * @param {string} spot_name target name
         */
        SetSpot(pos,spot_name){
            switch (pos){
                case "a":
                    selected_pos = "a";
                    switch (spot_name){
                        case "Ba_right":
                            select_spot = 0;
                            break;
                        case "Bb":
                            select_spot = 1;
                            break;
                        default:
                            console.log("対象と名前が一致しません。");
                            break;
                    }
                    UI.SetAngleUI(angle);
                    UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
                    SetSpeed(shoot_speed_a[select_spot]);
                    break;
                case "b":
                    selected_pos = "b";
                    switch (pos){
                        case "Bb":
                            select_spot = 0;
                            break;
                        default:
                            console.log("対象と名前が一致しません。");
                            break;
                    }
                    UI.SetAngleUI(angle);
                    UI.SetElevationAngleUI(elevation_angle_b[select_spot]/10);
                    SetSpeed(shoot_speed_b[select_spot]);
                    break;
                case "c":
                    selected_pos = "c";
                    default:
                        console.log("posCでは選択できません。");
                        break;
                    break;
                case "d":
                    selected_pos = "d";
                    switch (pos){
                        case "Bb":
                            select_spot = 0;
                            break;
                        default:
                            console.log("posCでは選択できません。");
                    }
                    UI.SetAngleUI(angle);
                    UI.SetElevationAngleUI(parseInt(elevation_angle_d[select_spot]/10));
                    SetSpeed(shoot_speed_d[select_spot]);
                    break;
                case "e":
                    selected_pos = "e";
                    switch (pos){
                        case "Ba_left":
                            select_spot = 0;
                            break;
                        case "Bb":
                            select_spot = 1;
                            break;
                        default:
                            console.log("posCでは選択できません。");
                    }
                    UI.SetAngleUI(angle);
                    UI.SetElevationAngleUI(parseInt(elevation_angle_e[select_spot]/10));
                    SetSpeed(shoot_speed_e[select_spot]);
                    break;
            }
            ChangeSpot(select_spot);
        }
    }
}



function ChangeControllerButtons(menu,A,B,X,Y,L1,R1,L2,R2,up,down,right,left)
{

        if(Y != 0)
        {
            if(control_mode){
                switch(selected_pos){
                    case "a":
                        if(elevation_angle_a[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_a[select_spot] = elevation_angle_a[select_spot]+1;
                            if(elevation_angle_a[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
                                Talker.SetElevationAngle(elevation_angle_a[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "b":
                        if(elevation_angle_b[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_b[select_spot] = elevation_angle_b[select_spot]+1;
                            if(elevation_angle_b[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(elevation_angle_b[select_spot]/10);
                                Talker.SetElevationAngle(elevation_angle_b[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "c":
                        if(elevation_angle_c[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_c[select_spot] = elevation_angle_c[select_spot]+1;
                            if(elevation_angle_c[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(parseInt(elevation_angle_c[select_spot]/10));
                                Talker.SetElevationAngle(elevation_angle_c[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "d":
                        if(elevation_angle_d[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_d[select_spot] = elevation_angle_d[select_spot]+1;
                            if(elevation_angle_d[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(parseInt(elevation_angle_d[select_spot]/10));
                                Talker.SetElevationAngle(elevation_angle_d[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "e":
                        if(elevation_angle_e[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_e[select_spot] = elevation_angle_e[select_spot]+1;
                            if(elevation_angle_e[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(parseInt(elevation_angle_e[select_spot]/10));
                                Talker.SetElevationAngle(elevation_angle_e[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                }
                // if(elevation_angle<document.getElementById("elevation_angle").max*10){
                //     elevation_angle = elevation_angle+1;
                //     if(elevation_angle%10 == 0){
                //         UI.SetElevationAngleUI(elevation_angle/10);
                //         Talker.SetElevationAngle(elevation_angle/10,UI.GetSpot(selected_pos,select_spot));    
                //     }
                // }
            }
            if(Y_button_flag)
            {
                // Yボタンの処理
                if(!control_mode){
                    if(shot_route>0) shot_route--;
                    document.getElementsByName('upper_lower').item(shot_route).checked = true;
                }
                Y_button_flag = false;
                // 
            }
        }else{
            Y_button_flag = true;
        }

        


        if(R1 != 0)
        {

            if(R1_flag){
                // R1ボタンの処理
                ChangeFireStatus();
                R1_flag = false;
                // 
            }
            document.getElementById("R1").src = "../img/cross_on.png";
        }else{
            R1_flag = true;
            document.getElementById("R1").src = "../img/cross_off.png";
            }

        if(L2 != 0)
        {
            if( L2_flag )
            {
                L2_flag = false;
            }
            document.getElementById("L2").src = "../img/cross_on.png";
        }else{
            L2_flag = true;
            document.getElementById("L2").src = "../img/cross_off.png";
        }

        if(R2 != 0)
        {
            if(R2_flag)
            {
                // R2ボタンの処理
                R2_flag = false;
                control_mode = !control_mode;
                if(control_mode){
                    document.getElementById("mode").innerHTML = "PARAMETERS [操縦モード]";
                    document.body.style.backgroundColor = "#000080";
                    ChangeSpot(shot_point+1);
                }else{
                    document.body.style.backgroundColor = "black";
                    document.getElementById("mode").innerHTML = "PARAMETERS [足回りモード]";
                    // document.getElementById("target1").disabled = true;
                    // document.getElementById("target2").disabled = true;
                    // document.getElementById("target3").disabled = true;
                    // document.getElementById("target1_ui").innerHTML = "-"
                    // document.getElementById("target2_ui").innerHTML = "-"
                    // document.getElementById("target3_ui").innerHTML = "-"
        
                }
                // 
            }
            document.getElementById("R2").src = "../img/cross_on.png";
        }else{
            R2_flag = true;
            document.getElementById("R2").src = "../img/cross_off.png"
        }
        

        if(up > 0)
        {
            if(control_mode){
                switch(selected_pos){
                    case "a":
                        if(elevation_angle_a[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_a[select_spot] = elevation_angle_a[select_spot]+1;
                            if(elevation_angle_a[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
                                Talker.SetElevationAngle(elevation_angle_a[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "b":
                        if(elevation_angle_b[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_b[select_spot] = elevation_angle_b[select_spot]+1;
                            if(elevation_angle_b[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(elevation_angle_b[select_spot]/10);
                                Talker.SetElevationAngle(elevation_angle_b[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "c":
                        if(elevation_angle_c[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_c[select_spot] = elevation_angle_c[select_spot]+1;
                            if(elevation_angle_c[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(parseInt(elevation_angle_c[select_spot]/10));
                                Talker.SetElevationAngle(elevation_angle_c[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "d":
                        if(elevation_angle_d[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_d[select_spot] = elevation_angle_d[select_spot]+1;
                            if(elevation_angle_d[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(parseInt(elevation_angle_d[select_spot]/10));
                                Talker.SetElevationAngle(elevation_angle_d[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                    case "e":
                        if(elevation_angle_e[select_spot]<document.getElementById("elevation_angle").max*10){
                            elevation_angle_e[select_spot] = elevation_angle_e[select_spot]+1;
                            if(elevation_angle_e[select_spot]%10 == 0){
                                UI.SetElevationAngleUI(parseInt(elevation_angle_e[select_spot]/10));
                                Talker.SetElevationAngle(elevation_angle_e[select_spot]/10,selected_pos,UI.GetSpot(selected_pos,select_spot));    
                            }
                        }
                        break;
                }
            }
            document.getElementById("cross_up").src = "../img/cross_on.png";
        }else{
            // up_flag = true;
            document.getElementById("cross_up").src = "../img/cross_off.png"
    }
}


function loadState()
{
    const zone = document.getElementsByName("red_blue");
    if(zone.item(0).checked == true) state[0] = "Red"; 
    else                             state[0] = "Blue";

    const where = document.getElementsByName("where")
    for (let i = 0; i< 5; i++) {
        if(where.item(i).checked == true) 
        {
            state[1] = i;
        }
    }

    const route = document.getElementsByName('upper_lower');
    if(route.item(0).checked == true)
    {
        state[3] = "upper";
    }else if(route.item(1).checked == true)
    {
        state[3] = "fastest";
    }else state[3] = "lower";

}

function SetState(red_blue,where,route)
{
    /**
     * red_blue →0:red  1:blue
     * mode →0:go shootspot 1:return nomal
     * route →0:uppper 1:faster 2:lower
     */
    document.getElementsByName("red_blue").item(red_blue).checked = true;
    document.getElementsByName("where").item(where).checked = true;
    document.getElementsByName('upper_lower').item(route).checked = true;

}




function setParam()
{
    /*選択状態の更新*/
    loadState();

    // document.getElementById("ui_Speed").innerHTML = Speed+"mm/s";
    // document.getElementById("speed").value = Speed;

    joy_data = GamePad.getJoy();
}

function UpdateLate()
{

}
setInterval("UpdateLate()",1000);
setInterval('setParam()',7);
/* setPos関数を毎35msごとに呼び出し*/

function GetState()
{
    return state;
}

function Reload()
{

}

window.onload = function()
{   
    /*ロード時の初期化*/
    controller_usable = true;
    document.body.style.backgroundColor = "black";
    document.getElementById("red_zone").checked = true;
    document.getElementById("A1").checked = true;
    switch(selected_pos){
        case "a":
            Talker.GetSpeedFromParam( function( param ){
                shoot_speed_a[select_spot] = param*1000;
                SetSpeed(shoot_speed_a[select_spot]);
            }, "a", UI.GetSpot("a",select_spot) );

            Talker.GetElevationFromParam( function( param ){ 
                elevation_angle_a[select_spot] = parseInt(param*180/Math.PI)*10;
                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
            }, "a",UI.GetSpot("a",select_spot));
            break;

        case "b":
            Talker.GetSpeedFromParam( function( param ){ 
                shoot_speed_b[select_spot] = param*1000;
                SetSpeed(shoot_speed_b[select_spot]);
            }, "b", UI.GetSpot("b",select_spot) );

            Talker.GetElevationFromParam( function( param ){ 
                elevation_angle_b[select_spot] = parseInt(param*180/Math.PI)*10;
                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
            }, "b",UI.GetSpot("b",select_spot));

            break;
        case "c":
            Talker.GetSpeedFromParam( function( param ){
                shoot_speed_c[select_spot] = param*1000;
                SetSpeed(shoot_speed_c[select_spot]);
            }, "c", UI.GetSpot("c",select_spot) );

            Talker.GetElevationFromParam( function( param ){ 
                elevation_angle_c[select_spot] = parseInt(param*180/Math.PI)*10;
                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
            }, "c",UI.GetSpot("c",select_spot));

            break;
        case "d":
            Talker.GetSpeedFromParam( function( param ){
                shoot_speed_d[select_spot] = param*1000;
                SetSpeed(shoot_speed_d[select_spot]);
            }, "d", UI.GetSpot("d",select_spot) );
            Talker.GetElevationFromParam( function( param ){ 
                elevation_angle_d[select_spot] = parseInt(param*180/Math.PI)*10;
                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
            }, "d",UI.GetSpot("d",select_spot));

            break;
        case "e":
            Talker.GetSpeedFromParam( function( param ){
                shoot_speed_e[select_spot] = param*1000;
                SetSpeed(shoot_speed_e[select_spot]);
            }, "e", UI.GetSpot("e",select_spot) );
            Talker.GetElevationFromParam( function( param ){
                elevation_angle_e[select_spot] = parseInt(param*180/Math.PI)*10;
                UI.SetElevationAngleUI(elevation_angle_a[select_spot]/10);
            }, "e",UI.GetSpot("e",select_spot));

            break;
    }

    Talker.GetDrivePowerStatus(function(param){
        Emergency_state = param;
        MemorizeOfParam = param;
        image = Emergency_state
        if(Emergency_state){
            document.getElementById("emergency_stop").src = "../img/stop.png";
            document.getElementById("machine_status").innerHTML = " true";    
        }else{
            document.getElementById("emergency_stop").src = "../img/start.png";
            document.getElementById("machine_status").innerHTML = " false";    
        }    
    
    })
}


