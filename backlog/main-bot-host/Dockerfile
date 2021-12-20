FROM node:10

RUN mkdir -p /home/node/bot/node_modules && chown -R node:node /home/node/bot
WORKDIR /home/node/bot
COPY package*.json ./

ARG BOT_TOKEN
ARG APILOCALHOST
ARG APILOCALPORT
WORKDIR /home/node/bot/config
# RUN echo "{"api": {"address": "${APILOCALHOST}","port": "${APILOCALPORT}"},"bot": {"TOKEN": "${BOT_TOKEN}"}}" >> default.json
RUN echo "{"api": {"address": "api","port": "3000"},"bot": {"TOKEN": "${BOT_TOKEN}"}}" >> default.json
RUN cat default.json

WORKDIR /home/node/bot
RUN npm install

COPY . .
COPY --chown=node:node . .

USER node
EXPOSE 6868
CMD [ "node", "index.js" ]