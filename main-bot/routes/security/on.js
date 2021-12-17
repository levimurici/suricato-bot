const axios = require('axios')
const config = require('config')

const api_url = config.get('api.address')
const api_port = config.get('api.port')
const route = "/watchdog/security-mode/dump"

module.exports = function (callback){
const  jsonSend = {
  "status": "true"
}

axios.post(api_url+":"+api_port+route, jsonSend, {
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