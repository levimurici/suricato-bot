const CONFIG = require('../../config/config.js')
const axios = require('axios').default;
const dataPath = 'http://'+CONFIG.api.address+':'+CONFIG.api.port+'/'+'watchdog/dump'
console.log("Datapath -->",dataPath)
// const dataPath = "http://192.168.1.101:3000/watchdog/dump"

module.exports = function (callback){
const  jsonSend = {
  "name": "securityMode",
  "data": {
      "status": "OFF"
  }
}

axios.post(dataPath, jsonSend, {
  headers:{
    'content-type': 'application/json'
  }
})
.then(res => {
  callback(`${res.status}`)
})
.catch(error =>{
  console.error(error)
})
}