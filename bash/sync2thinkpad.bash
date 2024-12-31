#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --delete /home/ayato/catkin_ws/src/2022/ ayato_thinkpad:/home/ayato/catkin_ws/src/2022/

