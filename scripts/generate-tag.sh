#!/bin/sh
#
# Builds the project and generates a new commit tag, including the
# the distribution folder 'dist'. After that creates a new tag and pushes
# to origin. The source branch isn't modified.
#

set -e

VERSION=$(node -p -e "require('./package.json').version")

git tag -d "v$VERSION" || true # Delete just created tag if exists
yarn run build
git add -f dist
git commit -m "Version $VERSION"
git tag "v$VERSION"
git push origin "v$VERSION":"v$VERSION"
git reset --hard HEAD~
