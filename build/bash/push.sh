#!/usr/bin/env bash

set -e
echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."

#build
npm run build

# commit
cd dist
git init
git add -A
git commit -m "$MESSAGE"

# push
git push --force --quiet git@github.com:raiyee/EasyHi.git master:gh-pages
git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:coding-pages

# back to root
cd ..
