
var Talker = {
  ros : null,
  name : "",
  init : function(){
    this.ros = new ROSLIB.Ros();
    this.ros.on('error', function(error) {
        document.getElementById('rosbridge_status').innerHTML = "Error";
    });
    this.ros.on('connection', function(error) {
        document.getElementById('rosbridge_status').innerHTML = "Connect";
    });
    this.ros.on('close', function(error) {
        document.getElementById('rosbridge_status').innerHTML = "Close";
    });
    this.ros.connect('ws://' + location.hostname + ':9090');
  },
  send : function(joy_data){
    if(joy_data != null){
      var pub = new ROSLIB.Topic({
          ros : this.ros,
          name : '/web/joy',
          messageType : 'sensor_msgs/Joy'
      });
      pub.publish(joy_data);
    }
  },
  getJoy : function() {
    var pads = navigator.getGamepads ? navigator.getGamepads() :
                    (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    var joy_data = new ROSLIB.Message({  axes:[], buttons:[]});
    pad = pads[0];
    if(pad) {
      document.getElementById("gamepad_status").innerHTML = "Connected";

      //buttons for display
      var but = "";
      for(var i = 0 ; i < pad.buttons.length; i++) {
        but += "but" + i + ":" + pad.buttons[i].value + "<br>";//or .pressed
      }
      document.getElementById("gamepad_buttons").innerHTML = but;

      //axes for display
      var ax = "";
      for(var i = 0 ; i < pad.axes.length; i++) {
        ax += pad.axes[i] + '<br>';
      }
      document.getElementById("gamepad_axes").innerHTML = ax;

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
      console.log(joy_data);
      return joy_data
    }
    else{
      document.getElementById("gamepad_status").innerHTML = "Disonnected";
      joy_data = null
    }
  }
}
Talker.init();

window.onload = function(){
};
window.onunload = function(){
  Talker.ros.close();
};

function update(){
  joy_data = Talker.getJoy();
  Talker.send(joy_data);
}
setInterval("update()",10);
