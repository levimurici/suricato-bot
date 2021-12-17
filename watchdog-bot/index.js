const TelegramBot = require( 'node-telegram-bot-api' )
const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)

const TOKEN = config.get('bot.TOKEN')
const bot = new TelegramBot( TOKEN, { polling: true } )

function* entries(obj){
    for (let key of Object.keys(obj)){
        yield [key, obj[key]]
    }
}

let checkControl;
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Iniciando watchdog`)
    const getLoopModeON = require('./routes/looper/on.js')
    getLoopModeON(function(string_loop_status){
        console.log(`\nrequest from ${chatId}, apiResponse: ${string_loop_status}`)
    });
    
    const getLooperStatus = require('./routes/looper/mode.js');
        getLooperStatus(function(security_mode){
            if(security_mode == "false"){
                bot.sendMessage(msg.chat.id, `Modo de segurança desativado, favor verificar antes de iniciar o watchdog`)
            }
            else{
                if(security_mode == "true"){
                    setInterval(function(){
                        const getLooperStarter = require('./routes/looper/starter.js');
                        getLooperStarter(function(string_looper_start){
                            if(string_looper_start == "true"){
                                const getAlarmData = require('./routes/alarms/index.js');
                                getAlarmData(function(alarm_data){
                                    data = JSON.parse(alarm_data);
                                    var suricatos = data.alarms
                                    for (let [suricato, value] of entries(suricatos)){
                                        if(value.control === undefined){
                                            bot.sendMessage(chatId, `Se liga ${value.device} está desconectado!`);
                                            setTimeout(function() {}, 1000);
                                        }
                                        else {
                                            if(value.control == 'true')
                                                bot.sendMessage(chatId, `Se liga ${value.device} está aberta!`);
                                                setTimeout(function() {}, 1000);
                                            }
                                    }
                                });
                            }
                        })
                    }, 8000)
                }
            }
        })
})

bot.onText(/\/stop/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, `Desligando watchdog`)
    const getLoopModeOFF = require('./routes/looper/off.js')
    getLoopModeOFF(function(string_loop_status){
        console.log(`\nrequest from ${chatId}, apiResponse: ${string_loop_status}`)
    });
})