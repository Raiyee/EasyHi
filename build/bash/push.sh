#!/usr/bin/env bash

set -e

# pull
echo "Pulling from origin/master"

git pull

#build
#yarn outdated
#npm run build

(git log -1 --pretty=%B | cat) |
while read -r MESSAGE
do
  echo "Pushing $MESSAGE ..."

  git commit -a -m "$MESSAGE"
  git push --force --quiet git@github.com:Raiyee/EasyHi.git master:master
  git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:master

  # commit
  cd dist
  #cp ../README.md .
  cp ../*.md .
  git init
  git add -A
  git commit -m "$MESSAGE"

  # push
  git push --force --quiet git@github.com:Raiyee/EasyHi.git master:gh-pages
  git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:coding-pages

  # back to root
  cd ..
done
