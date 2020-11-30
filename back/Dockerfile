# This file is a template, and might need editing before it works on your project.
FROM node:lts

LABEL version="1.0.0" description="API Desafio Grupo A" maintainer="Welber <devopswell@gmail.com>"

RUN mkdir /app/back

WORKDIR /app/back

COPY . /app/back

COPY ./package.json /app/back/package.json
COPY ./start.sh /app/back/start.sh

RUN cd /app/back; chmod 777 start.sh;

RUN cd /app/back; npm install; 

EXPOSE 3000 

CMD ./start.sh
