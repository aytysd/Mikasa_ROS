#!/bin/bash


rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/2022/pure_pursuit/csv/ ayato_thinkpad:/home/ayato/catkin_ws/src/2022/pure_pursuit/csv/