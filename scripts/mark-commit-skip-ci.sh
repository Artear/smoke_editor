#!/usr/bin/env bash

set -ex

VERSION=$(node -e "console.log('v' + require('./package.json').version)")

# Delete generated tag and re-tag after ammend to prevent errors with
# changelog generated (a tag commit must be belong to the master branch)

git tag -d $VERSION
git commit --amend --no-verify -m "$VERSION [ci skip]"
git tag $VERSION
