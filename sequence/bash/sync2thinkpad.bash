#!/bin/bash

rsync -avh --exclude '.vscode/browse*' --exclude '.git' --delete /home/ayato/catkin_ws/src/sequence/ ayato_thinkpad:/home/ayato/catkin_ws/src/sequence/