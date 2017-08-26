#!/bin/bash
set -e
WORK_DIR=/home/node
TEST_ENV=${TEST_ENV:-}

case ${1} in
  app:e2e)
    echo "----------------------------------------------------------------"
    echo "---------------${1} PORTAL_UI e2e testing -------------------"
    echo "----------------------------------------------------------------" 
    echo "E2E Running @ ${TEST_ENV}"
    echo ""
    
    # Use provided environment url to test
    sed 's|{{TEST_ENV}}|'${TEST_ENV}'|g' -i ${WORK_DIR}/e2e/e2e.config.ts

    xvfb-run -a -e /home/node/stdout /home/node/node_modules/.bin/gulp e2e --env=production
    ;;
  app:test)
    echo "----------------------------------------------------------------"
    echo "---------------${1} PORTAL_UI $(cat VERSION)------------------------"
    echo "----------------------------------------------------------------"

    echo "Testing Portal-ui...."
    ${WORK_DIR}/node_modules/.bin/gulp test --env=testing
    ;;
  *)
    exec "$@"
    ;;
esac