#!/usr/bin/env bash

set -e

#build
npm run build

echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."

git commit -a -m "$MESSAGE"
git push

# commit
cd dist
cp ../README.md .
cp ../CONTRIBUTING.md .
git init
git add -A
git commit -m "$MESSAGE"

# push
git push --force --quiet git@github.com:Raiyee/EasyHi.git master:gh-pages
git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:coding-pages

# back to root
cd ..
