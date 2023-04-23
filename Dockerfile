FROM node:19-alpine3.16

WORKDIR /backend/server.js

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node","backend/server.js" ]