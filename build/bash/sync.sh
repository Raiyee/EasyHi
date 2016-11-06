#!/usr/bin/env bash

set -e

(git log -1 --pretty=%B | cat) |
while read -r MESSAGE
do
  echo "last commit message:"
  echo "$MESSAGE"

  cd dist
  cp ../*.md .

  git init
  git add -A
  git commit -m "$MESSAGE"
  git push --force --quiet git@github.com:Raiyee/EasyHi.git master:gh-pages
  git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:coding-pages

  exit 0
done
