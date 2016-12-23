#!/usr/bin/env bash

set -e

git log -1 --pretty=%B | cat |
if read -r MESSAGE
then
  echo "last commit message:"
  echo "$MESSAGE"

  git clone ssh://git@gitlab.raiyee.cn:10022/easyhi/yoga-vision.git sync -b pages
  rm -rf sync/*

  cd sync
  cp -rf ../dist/* .
  cp ../*.md .

  git add -A
  git status -s |
  if read
  then
    git commit -m "$MESSAGE"
    git push --force --quiet ssh://git@gitlab.raiyee.cn:10022/easyhi/yoga-vision.git pages:pages

    yarn add -D coveralls codecov
    yarn coveralls && yarn codecov
  else
    echo "there is nothing changed and to commit"
  fi
fi
