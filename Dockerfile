FROM node:16

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install typescript -g
RUN npm install -g webpack

COPY . .

EXPOSE 80

CMD ["node", "index.js"]