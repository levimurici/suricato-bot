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

var suricatoObject;
var suricatos;
var value;
var loopControl = false;

function* entries(obj){
    for (let key of Object.keys(obj)){
        yield [key, obj[key]]
    }
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}

function getData(chatId){
    const getLooperStatus = require('./routes/looper/mode.js');
        getLooperStatus(function(security_mode){
            // console.log(`Security-Mode: ${security_mode}`)
            if(security_mode == "false" || security_mode == "Getting data try again" || security_mode == null){
                // bot.sendMessage(msg.chat.id, `Modo de segurança desativado ou em carregamento`)
            }
            else{
                if(security_mode == "true"){
                    const getAlarmData = require('./routes/alarms/getAllAlarms.js');
                    getAlarmData(function(alarm_data){
                        suricatos = alarm_data
                        suricatoObject = toObject(suricatos)                                  
                    
                        if (Object.keys(suricatoObject).length === 0 && suricatoObject.constructor === Object ){
                            // console.log("empty object")
                        }
                        else{
                            console.log(suricatoObject)
                            for (let key of entries(suricatoObject)){
                                value = key[1]
                                if(value.status == "OFF"){
                                    bot.sendMessage(chatId, `Se liga ${value.name} está desconectado!`);
                                    setTimeout(function() {}, 5000);
                                }
                                else {
                                    if(value.status == 'LOW')
                                        bot.sendMessage(chatId, `${value.name}: ${value.type} do/a ${value.place} está alarmando!`);
                                        setTimeout(function() {}, 5000);
                                    }
                            }
                        }
                    });
                }
            }
        })
}

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    loopControl = true;
    // const getLoopModeON = require('./routes/looper/on.js')
    // getLoopModeON(function(string_loop_status){
    //     console.log(`request from ${chatId}, apiResponse: ${string_loop_status}`)
    // });
    bot.sendMessage(chatId, `Watchdog iniciado`)
    setInterval(function(){
        if(loopControl == true){
            getData(chatId)
        }
    }, 10000);
})

bot.onText(/\/stop/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    loopControl = false;
    // const getLoopModeOFF = require('./routes/looper/off.js')
    // getLoopModeOFF(function(string_loop_status){
    //     console.log(`request from ${chatId}, apiResponse: ${string_loop_status}`)
    // });
    bot.sendMessage(chatId, `Watchdog desligado`)
})

