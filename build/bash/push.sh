#!/usr/bin/env bash

npm run lint

set -e
echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."

npm run clean
npm run build

cd dist

git init

# commit
git add -A
git commit -m "$MESSAGE"

# push
git push --force --quiet git@github.com:raiyee/EasyHi.git master:gh-pages
git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:coding-pages
