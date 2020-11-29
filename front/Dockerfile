# This file is a template, and might need editing before it works on your project.
FROM node:lts

LABEL version="1.0.0" description="FRONT Desafio Grupo A" maintainer="Welber <devopswell@gmail.com>"

RUN mkdir /front

WORKDIR /front

COPY . /front

COPY ./package.json /front/package.json
COPY ./start.sh /front/start.sh

RUN chmod 777 /front/start.sh;

RUN cd /front; npm install; npm install -g serve;

EXPOSE 5000 

CMD ./start.sh
