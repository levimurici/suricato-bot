const axios = require('axios').default;
// const dataPath = 'http://'+process.env.API_ADDRESS+':'+process.env.API_PORT+'/'+'watchdog/loop'
const dataPath = "http://192.168.1.101:3000/watchdog/dump"
console.log("Datapath -->",dataPath)

module.exports = function (callback){
const  jsonSend = {
    "name": "loopMode",
    "data": 
    {
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