FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 6000

CMD ["npm", "start"]