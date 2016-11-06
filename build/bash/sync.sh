#!/usr/bin/env bash

set -e

(git log -1 --pretty=%B | cat) |
if read -r MESSAGE
then
  echo "last commit message:"
  echo "$MESSAGE"

  cd dist
  cp ../*.md .

  git init
  git add -A
  git commit -m "$MESSAGE"
  git push --force --quiet git@github.com:Raiyee/EasyHi.git master:gh-pages
  git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git master:coding-pages
fi
