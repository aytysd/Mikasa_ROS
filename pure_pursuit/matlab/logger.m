clear;
clear global;
sub = rossubscriber("/Speed","std_msgs/Float32", @callback, "DataFormat","struct")


global speed
global count
global count_array
global acceleration_array;
global acc;

global prev_speed;
prev_speed = 0;

% speed = [];
% count_array = [];

count = 0;

function callback( obj, msg, src )
    global speed
    global acceleration_array;
    global prev_speed;
    global acc;
    data = msg.Data
    speed = [speed data]

    acc = ( data - prev_speed ) / 0.1;
    acceleration_array = [ acceleration_array acc ];

    prev_speed = data;

    global count
    global count_array

    count_array = [ count_array count ]
    count = count + 1;


end
