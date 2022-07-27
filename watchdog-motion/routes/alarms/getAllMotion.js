const CONFIG = require('../../config/config.js')
const axios = require('axios').default;
const dataPath = 'http://'+CONFIG.api.address+':'+CONFIG.api.port+'/'+'alarm/getAllData/type/Motion'
console.log("Datapath -->",dataPath)
// const dataPath = "http://192.168.1.101:3000/alarm/getAllData/type/Motion"
var dataObject;
var messageOut = []

async function getData() {
  try {
    const response = await axios.get(dataPath);
    dataObject = response.data
    var i = 0;
    var messageInc = ""
    for (let key in dataObject){
      if(dataObject[key].name != 'suricato11'){
      // console.log(`- ESP: ${dataObject[key].name} ambiente: ${dataObject[key].info.place} status: ${dataObject[key].data.control}`)
      messageOut.push(JSON.parse(`{"name":"${dataObject[key].name}", "type":"${dataObject[key].info.type}", "place":"${dataObject[key].info.place}", "status":"${dataObject[key].data.status}"}`))
      i++
      }
    }
  } catch (error) {
    console.error(error);
  }  
}

module.exports = async function(callback){
    getData();
    callback(messageOut)
    messageOut = []
}