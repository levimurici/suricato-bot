const TelegramBot = require( 'node-telegram-bot-api' )
const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)

const TOKEN = config.get('bot.TOKEN')
const bot = new TelegramBot( TOKEN, { polling: true } )

console.log('Dirname: ' + __dirname);

bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, `✋Olá✋, seja bem vindo a nossa toca!😊\n\
    Eu sou o Suricato Jurubeba e estou aqui para te ajudar. \n\

    Para verificação de Status✅: \n\
        1. Escreva "/status_jardim", para ativar o suricato jardineiro e verificar o status do quintal. \n\
        2. Escreva "/status_alarmes", para o suricato vigilante e verificar os alarmes nas janelas. \n\
    
    Ativação de modos✅: \n\
        1. Escreva "/seguranca_on", para ativar o modo watcher \n\
        2. Escreva "/seguranca_off", para desativar o modo watcher \n\
    `)
 })

bot.onText(/\/ajuda/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, `
  ✋Olá✋, tá precisando de ajuda?🤓🤓

  Para verificação de Status✅: \n\
      1. Escreva "/status_jardim", para ativar o suricato jardineiro e verificar o status do quintal. \n\
      2. Escreva "/status_alarmes", para o suricato vigilante e verificar os alarmes nas janelas. \n\
  
  Ativação de modos✅: \n\
      1. Escreva "/seguranca_on", para ativar o modo watcher \n\
      2. Escreva "/seguranca_off", para desativar o modo watcher \n\
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