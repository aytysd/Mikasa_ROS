rosnode kill /serial_handler
source retry.bash &
rosrun stm32interface serial_node __name:=serial_handler 
