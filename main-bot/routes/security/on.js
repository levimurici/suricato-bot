const axios = require('axios')

module.exports = function (callback){
const  jsonSend = {
  "status": "true"
}

axios.post("http://192.168.1.2:3000/watchdog/security-mode/dump", jsonSend, {
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