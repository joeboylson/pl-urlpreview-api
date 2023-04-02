FROM node:18-alpine as base

WORKDIR /server

COPY ./package*.json /

RUN cd /server
RUN npm install -g nodemon
RUN npm install

ENV PORT=8000

CMD ["npm", "run", "start:dev"]
