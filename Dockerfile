FROM node:14.18.2

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production
RUN npm i -g sequelize-cli

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]