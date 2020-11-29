# This file is a template, and might need editing before it works on your project.
FROM node:13.2.0-alpine3.10

LABEL version="1.0.0" description="API Desafio Grupo A" maintainer="Welber <devopswell@gmail.com>"

RUN mkdir /app

WORKDIR /app

COPY . /app

COPY ./package.json /app/package.json
COPY ./start.sh /app/start.sh

RUN cd /app; chmod 777 start.sh;

RUN cd /app; npm install; 

EXPOSE 3000 

CMD ./start.sh
