# This file is a template, and might need editing before it works on your project.
FROM node:lts

LABEL version="1.0.0" description="API Desafio Grupo A" maintainer="Welber <devopswell@gmail.com>"

RUN mkdir /back

WORKDIR /back

COPY . /back

COPY ./package.json /back/package.json
COPY ./start.sh /back/start.sh

RUN cd /back; chmod 777 start.sh;

RUN cd /back; npm install; 

EXPOSE 3000 

CMD ./start.sh
