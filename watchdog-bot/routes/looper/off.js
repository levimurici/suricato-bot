const axios = require('axios')
const config = require('config')

/* const api_url = config.get('api.address')
const api_port = config.get('api.port')
const api_url = "api"
const api_port = "3000" */
const route = "/watchdog/security-loop/dump"

module.exports = function (callback){
const  jsonSend = {
  "loop": "false"
}

/* axios.post("https://"+api_url+":"+api_port+route, jsonSend, {
  headers:{
    'content-type': 'application/json'
  } */

axios.post("https://api:3000"+route, jsonSend, {
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