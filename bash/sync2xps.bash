#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/2022/ ayato_xps:/home/ayato/catkin_ws/src/2022/
