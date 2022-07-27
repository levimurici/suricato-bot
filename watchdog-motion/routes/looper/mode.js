const axios = require('axios').default;
// const dataPath = 'http://'+process.env.API_ADDRESS+':'+process.env.API_PORT+'/'+'alarm/getAllData/type/Alarm'
const dataPath = "http://192.168.1.101:3000/watchdog/securityMode"
var dataObject;
var messageOut = 'Getting data try again'

async function getData() {
    try {
      const response = await axios.get(dataPath);
      dataObject = response.data

    if(dataObject.data.status == "ON"){
      messageOut = `true`
    }

    if(dataObject.data.status == "OFF"){
      messageOut = `false`
    }

    } catch (error) {
      console.error(error);
    }
    // console.log(messageOut)
}

module.exports = async function(callback){
    getData();
    // SetTimeout(() => callback(messageOut), 500);
    callback(messageOut)
    messageOut = ''
}