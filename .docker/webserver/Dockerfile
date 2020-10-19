ARG PORT
ARG NODE_ENV

FROM node:lts-alpine AS base

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

EXPOSE ${PORT}

COPY [".", "/usr/src/app"]

CMD npm run build:dev
