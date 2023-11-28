FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

WORKDIR /usr/src/app/src

COPY . .

WORKDIR /usr/src/app

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
