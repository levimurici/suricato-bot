const CONFIG = require('../../config/config.js')
const axios = require('axios').default;
const dataPath = 'http://'+CONFIG.api.address+':'+CONFIG.api.port+'/'+'garden/show/suricato11'
console.log("Datapath -->",dataPath)
// const dataPath = "http://192.168.1.101:3000/garden/show/suricato11"

let date_ob = new Date();
var dataObject;
var messageOut = 'Getting data try again'

async function getData() {
    try {
      const response = await axios.get(dataPath);
      dataObject = response.data
      // console.log(dataObject)
      // console.log(`ESP: ${dataObject.name} ambiente: ${dataObject.info.place} status: ${dataObject.data.control}`)

       messageOut = `🌳Status do jardim🌳 \n\
       Relatório do ${dataObject.name} do ${dataObject.info.place} das ${date_ob.getHours()}:${date_ob.getMinutes()}: \n\
       - Temperatura ambiente : ${dataObject.data.temperature}ºC 🌡️ \n\
       - Umidade relativa do ar: ${dataObject.data.humidity}% 💧 `
    } catch (error) {
      console.error(error);
    }
    console.log(messageOut)
}

module.exports = async function(callback){
    getData();
    // SetTimeout(() => callback(messageOut), 500);
    callback(messageOut)
    messageOut = ''
}