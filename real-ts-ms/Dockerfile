FROM node:14.2.0-alpine3.10

EXPOSE 4100

WORKDIR /node

COPY package*.json ./
RUN mkdir app && chown -R node:node .
USER node
RUN npm install && npm cache clean --force

WORKDIR /node/app

COPY --chown=node:node . .

CMD ["node", "ts-ms-real.js"]
