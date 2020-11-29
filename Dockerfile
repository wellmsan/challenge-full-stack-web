# This file is a template, and might need editing before it works on your project.
FROM node:lts

LABEL version="1.0.0" description="Desafio Grupo A" maintainer="Welber <devopswell@gmail.com>"

RUN mkdir /back
RUN mkdir /front

WORKDIR /back

COPY ./back /back

COPY ./back/package.json /back/package.json
COPY ./back/start.sh /back/start.sh

WORKDIR /front

COPY ./front /front

COPY ./front/package.json /front/package.json
COPY ./front/start.sh /front/start.sh


