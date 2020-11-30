# This file is a template, and might need editing before it works on your project.
FROM node:lts

LABEL version="1.0.0" description="FRONT Desafio Grupo A" maintainer="Welber <devopswell@gmail.com>"

RUN mkdir /app
RUN mkdir /app/front

WORKDIR /app/front

COPY ./front /app/front

COPY ./front/package.json /app/front/package.json
COPY ./front/start.sh /app/front/start.sh

RUN cd /app/front; chmod 777 start.sh;
RUN cd /app/front; npm install; 
RUN cd /app/front; npm install; npm install -g serve;

EXPOSE 5000 

CMD ./front/start.sh
