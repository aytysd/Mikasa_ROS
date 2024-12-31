#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/pure_pursuit/ ayato_xps:/home/ayato/catkin_ws/src/pure_pursuit/
