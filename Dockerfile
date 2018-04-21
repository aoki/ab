FROM node:carbon-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY plugins ./plugins
COPY index.js ./
RUN npm install --only=production
CMD [ "npm", "start" ]
