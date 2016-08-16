set -e
echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."

# run eslint
npm run lint

# run unit tests
npm run unit

# commit
git add -A
git commit -m "$MESSAGE"

# push
git push
