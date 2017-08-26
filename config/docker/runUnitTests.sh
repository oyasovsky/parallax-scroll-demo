#!/usr/bin/env bash

echo "*********************************************"
echo "* This script runs the unit test            *"
echo "* To run it on your own machine: gulp test  *"
echo "*********************************************"
PRODUCT=$3
BRANCH=$2
WORKSPACE=$4
WORK_DIR=/home/node

docker run --name tests-${PRODUCT} -v /dev/shm:/dev/shm $1 app:test
docker cp tests-${PRODUCT}:$WORK_DIR/reports/ $WORKSPACE
docker rm -f tests-${PRODUCT}
