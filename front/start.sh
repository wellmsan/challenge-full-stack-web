#!/bin/sh

cd /front

touch .env

echo VUE_APP_API_HOST=${API_HOST} >> .env
echo VUE_APP_PROJECT_NAME=${PROJECT_NAME} >> .env

npm run build

serve -s dist
