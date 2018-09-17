FROM node:carbon-alpine

RUN npm i npm@latest -g
WORKDIR /usr/src/app
COPY package*.json ./
COPY plugins ./plugins
COPY index.js ./
RUN npm install --only=production && npm audit fix
CMD [ "npm", "start" ]
