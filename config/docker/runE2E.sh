#!/usr/bin/env bash

echo "*********************************************"
echo "* This script runs the e2e testing            *"
echo "* To run it on your own machine: gulp e2e  *"
echo "*********************************************"
PRODUCT=$3
BRANCH=$2
WORKSPACE=$4
WORK_DIR=/home/node

docker run --name e2e-${PRODUCT} -v /dev/shm:/dev/shm $1 app:e2e
docker cp e2e-${PRODUCT}:$WORK_DIR/reports/ $WORKSPACE
docker rm -f e2e-${PRODUCT}
