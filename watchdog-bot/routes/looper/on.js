const axios = require('axios')

module.exports = function (callback){
const  jsonSend = {
  "loop": "true"
}

axios.post("http://192.168.1.10:3000/watchdog/security-loop/dump", jsonSend, {
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