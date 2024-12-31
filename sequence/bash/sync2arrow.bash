#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/sequence/ ayato_arrow:/home/ayato/catkin_ws/src/sequence/
