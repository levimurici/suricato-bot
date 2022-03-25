const axios = require('axios').default;
// const dataPath = process.env.API_ADDRESS+':'+process.env.API_PORT+'/'+'alarm/getAllData/type/Alarm'
const dataPath = "http://192.168.1.6:3000/alarm/getAllData/type/Alarm"
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