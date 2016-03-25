#!/bin/bash

rsync -avz --exclude=.git --exclude=src --exclude=test --delete ./ root@60devs.com:/apps/gena-data/