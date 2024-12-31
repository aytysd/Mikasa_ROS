clear all;


target_speed = 10;
t_num = 100;

accacc = 0.01;
acc = 0;
speed = 0;


speed_array = [];
acc_array = [];
t_array = [];

for t = 0:0.01:pi
    speed = speed + acc;
    accacc = 0.01 * sin( t );
    acc = acc + accacc;
    speed_array = [ speed_array speed ];
    acc_array = [ acc_array acc ];
    t_array = [ t_array t ];

    
end

for t2 = pi:0.01:2*pi
    speed = speed + acc;
    accacc = 0.01 * sin( t2 );
    acc = acc + accacc;
   
    speed_array = [ speed_array speed ];
    acc_array = [ acc_array acc ];
    t_array = [ t_array t2 ];
end

subplot( 2, 1, 1 )
plot( t_array, speed_array )

subplot( 2, 1, 2 )
plot( t_array, acc_array )