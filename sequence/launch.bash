#!/bin/bash

roslaunch sequence Main.launch & rosbag record -a -O /home/ayato/catkin_ws/src/sequence/bag/robot_bag
