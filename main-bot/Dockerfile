ARG BOT_TOKEN
ARG LOCALHOST
ARG LOCALPORT

FROM node:10

RUN mkdir -p /home/node/bot/node_modules && chown -R node:node /home/node/bot

WORKDIR /home/node/bot
COPY package*.json ./

WORKDIR /home/node/bot/config
RUN echo "{"api": {"address": "${LOCALHOST}","port": "${LOCALPORT}"},"bot": {"TOKEN": "${BOT_TOKEN}"}}" >> default.json

WORKDIR /home/node/bot/
RUN npm install

COPY . .
COPY --chown=node:node . .

USER node
EXPOSE 3000
CMD [ "node", "index.js" ]