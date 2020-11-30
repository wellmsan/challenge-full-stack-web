#!/bin/sh

cd /back

touch .env

echo APP_NAME=${APP_NAME} >> .env
echo NODE_ENV=${NODE_ENV} >> .env
echo SECRET=${SECRET} >> .env
echo BASE_PATH=${BASE_PATH} >> .env
echo TZ=${TZ} >> .env
echo DB_DIALECT=${DB_DIALECT} >> .env
echo DB_USER=${DB_USER} >> .env
echo DB_PASS=${DB_PASS} >> .env
echo DB_DATA=${DB_DATA} >> .env
echo DB_HOST=${DB_HOST} >> .env

NODE_ENV=production npm run start