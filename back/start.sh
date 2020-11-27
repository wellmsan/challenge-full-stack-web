#!/bin/sh

cd /app

touch .env

echo APP_NAME=${SYSTEM_NAME} >> .env
echo BASE_PATH=${BASE_PATH} >> .env
echo DATABASE_MONGO_CONNECTION_STRING=mongodb://${MONGODB_USER}:${MONGODB_PASS}${MONGODB_URL}:27017/${MONGODB_DB} >> .env
echo DB_HOST=${DB_HOST} >> .env
echo DB_PASS=${DB_PASS} >> .env
echo DB_USER=${DB_USER} >> .env
echo DB_DATA=${DB_DATA} >> .env
echo DB_INST=${DB_INST} >> .env
echo SECRET=${SECRET_TOKEN} >> .env
echo PORT=${PORT_API} >> .env
echo SENTRY_KEY=${SENTRY_KEY} >> .env
echo SENTRY_PROJECT_ID=${SENTRY_PROJECT_ID} >> .env
echo HTTP_HEALTH_CHECK_URL=${HTTP_HEALTH_CHECK_URL} >> .env
echo LDAP_HOST=${LDAP_HOST} >> .env
echo LDAP_PORT=${LDAP_PORT} >> .env
echo LDAP_USER=${LDAP_USER} >> .env
echo LDAP_PASS=${LDAP_PASS} >> .env
echo LDAP_DN=${LDAP_DN} >> .env
echo AD_DN=${AD_DN} >> .env
echo LDAP_URI=${LDAP_URI} >> .env
echo NODE_ENV=${ENVIRONMENT} >> .env
echo LIMIT_MEM=${LIMIT_MEM} >> .env
echo CERTIFICADO_KEY=${CERTIFICADO_KEY} >> .env
echo CERTIFICADO_CRT=${CERTIFICADO_CRT} >> .env
echo TZ=${TZ} >> .env
echo PORT=${PORT} >> .env

NODE_ENV=production TZ=${TZ} npm run start