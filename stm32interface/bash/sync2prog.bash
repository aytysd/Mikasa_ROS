#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/stm32interface/ ayato_prog:/home/ayato/catkin_ws/src/stm32interface/
