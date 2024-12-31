#!/bin/bash


rsync -avh --exclude '.vscode/browse*' --delete /home/ayato/catkin_ws/src/2022/route_planner/csv/ ayato_thinkpad:/home/ayato/catkin_ws/src/2022/pure_pursuit/csv/