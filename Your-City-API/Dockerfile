# The Dockerfile creates the environment for the code to be run in and will be deployed to the server.
FROM node:14.16

COPY ./build /usr/src/app
COPY ./package.json /usr/src/app

WORKDIR /usr/src/app

RUN npm install --only=production

EXPOSE 3000

CMD node server.js
