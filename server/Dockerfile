FROM node:14

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . .

CMD ["node", "app.js"]

EXPOSE 3000
