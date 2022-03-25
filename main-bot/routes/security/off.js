const axios = require('axios').default;
// const dataPath = process.env.API_ADDRESS+':'+process.env.API_PORT+'/'+'alarm/getAllData/type/Alarm'
const dataPath = "http://192.168.1.6:3000/watchdog/dump"

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