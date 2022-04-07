const TelegramBot = require( 'node-telegram-bot-api' )
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const CONFIG = require('./config/config.js')

const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)

console.log("Token -->",CONFIG.bot.token)
const TOKEN = CONFIG.bot.token
const bot = new TelegramBot( TOKEN, { polling: true } )

console.log('Dirname: ' + __dirname);
console.log("Ip da API -->",CONFIG.api.address)
console.log("Porta da API -->",CONFIG.api.port)
console.log("Suricato_Garden -->",CONFIG.garden.suricato)

bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, `Ahoy!✋, seja bem vindo a nossa toca!😊\n\
    Sou o Suricato Jurubeba e estou aqui para te ajudar. \n\
    Mande um "/ajuda" pra começar!
    `)
 })

bot.onText(/\/ajuda/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, `
  ✋Olá✋, tá precisando de ajuda?🤓🤓

    Para verificação de status✅: \n\
      /status_jardim, ativa o suricato jardineiro e verifica o quintal. \n\
      /status_alarmes, pergunta ao suricato vigilante sobre os alarmes de travas. \n\

    Ativação de modos✅: \n\
      /seguranca_on, para ativar o modo watcher \n\
      /seguranca_off, para desativar o modo watcher \n\
`);
})

bot.onText(/\/status_alarmes/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  let sendData = '';
  
  const getData_alarm = require('./routes/alarms/index.js');
  getData_alarm(function(string_alarm){
    sendData = string_alarm;
    console.log(string_alarm)
    if (sendData === undefined) {
      bot.sendMessage(chatId, "data_undefined");
      console.log(`request from ${chatId} and ${sendData}`)
    }
    else {
      bot.sendMessage(chatId, sendData);
      console.log(`request from ${chatId}`)
    }  
  });    
});
  
bot.onText(/\/status_jardim/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  let sendData = '';
  
  const getData_garden = require('./routes/gardener/index.js');
  getData_garden(function(string_garden){
    sendData = string_garden;
    console.log(string_garden)
    if (sendData === undefined) {
      bot.sendMessage(chatId, "data_undefined");
      console.log(`request from ${chatId} and ${sendData}`)
    }
    else {
      bot.sendMessage(chatId, sendData);
      console.log(`request from ${chatId}`)
    }  
  }); 
});

bot.onText(/\/seguranca_on/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  const getSecurityMode = require('./routes/security/on')
  getSecurityMode(function(string_security){
    console.log(`\nrequest from ${chatId}, apiResponse: ${string_security}`)
    console.log("Security ON")
  });
  bot.sendMessage(chatId, `Modo de segurança ON`);
});

bot.onText(/\/seguranca_off/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  
  const getSecurityMode = require('./routes/security/off')
  getSecurityMode(function(string_security){
    console.log(`\nrequest from ${chatId}, apiResponse: ${string_security}`)
    console.log("Security OFF")
  });
  bot.sendMessage(chatId, `Modo de segurança OFF`);
});


/* bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});
 */