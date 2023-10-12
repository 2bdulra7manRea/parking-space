FROM node:20.6.1-alpine3.18

WORKDIR /server

COPY package.json .

COPY tsconfig.json .

RUN npm install

COPY . .

CMD [ "npm","start" ]