FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN node ./util/databaseRebuild.js

EXPOSE 3000

CMD ["node", "server.js"]