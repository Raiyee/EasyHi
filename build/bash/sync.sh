#!/usr/bin/env bash

set -e

git log -1 --pretty=%B | cat |
if read -r MESSAGE
then
  echo "last commit message:"
  echo "$MESSAGE"

  git clone git@github.com:Raiyee/EasyHi.git sync -b gh-pages
  rm -rf sync/*

  cd sync
  cp -rf ../dist/* .
  cp ../*.md ../circle.yml .
  touch .nojekyll

  git add -A
  git status -s |
  if read
  then
    git commit -m "$MESSAGE"
    git push --force --quiet git@github.com:Raiyee/EasyHi.git gh-pages:gh-pages
    git push --force --quiet git@git.coding.net:Raiyee/EasyHi.git gh-pages:coding-pages
  else
    echo "there is nothing changed and to commit"
  fi
fi
