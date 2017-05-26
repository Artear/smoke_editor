FROM node:6.10.3-alpine

WORKDIR /data

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile
