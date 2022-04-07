const CONFIG = require('../../config/config.js')
const axios = require('axios').default;
const dataPath = 'http://'+CONFIG.api.address+':'+CONFIG.api.port+'/'+'alarm/getAllData/type/Alarm'
console.log("Datapath -->",dataPath)
// const dataPath = "http://192.168.1.101:3000/alarm/getAllData/type/Alarm"
var dataObject;
var messageOut = 'Getting data try again'

async function getData() {
  try {
    const response = await axios.get(dataPath);
    dataObject = response.data
    for (let key in dataObject){
      // console.log(`- ESP: ${dataObject[key].name} ambiente: ${dataObject[key].info.place} status: ${dataObject[key].data.control}`)
      messageOut = messageOut + `- ESP: ${dataObject[key].name}, ambiente: ${dataObject[key].info.place}, status: ${dataObject[key].data.control} \n`
  }
  } catch (error) {
    console.error(error);
  }
  // console.log(messageOut)
}

module.exports = async function(callback){
    getData();
    // SetTimeout(() => callback(messageOut), 500);
    callback('Status dos alarmes :\n'+messageOut)
    messageOut = ''
}