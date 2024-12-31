#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --exclude '.git' /home/ayato/catkin_ws/src/stm32interface/ ayato_arrow:/home/ayato/catkin_ws/src/stm32interface/
