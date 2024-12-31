#!/bin/bash


rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/2022/route_planner/ ayato_prog:/home/ayato/catkin_ws/src/2022/route_planner/