#!/bin/sh
#
# Verifies that the active branch is named 'master'
# Otherwise exits with 1
#

set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" != "master" ]; then
  echo "Can't release a new version from a non-master branch!";
  exit 1;
fi
