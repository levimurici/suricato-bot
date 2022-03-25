const http = require('http')

let date_ob = new Date();

module.exports = function(callback){
  const options = {
    /* hostname: config.get('api.address'),
    port: config.get('api.port'), */
    hostname: process.env.API_ADDRESS, // "192.168.1.6"
    port: process.env.API_PORT, // "3000"
    path: 'alarm/getAllData/type/Alarm',
    agent: false,
    method: 'GET'
  }

  const req = http.request(options, res => {
    let dataOut = '';
    let data = '';
    let dataInc = '';

    /* console.log(`statusCode: ${res.statusCode}`) */
    res.setEncoding("UTF-8");

    res.on('data', (chunk) => {
      data += chunk;
    })

    res.on('end', () => {
      dataInc = data
      
      // dataOut = `Relatório do Suricato vigilante às ${date_ob.getHours()}:${date_ob.getMinutes()}:
      // 1. O alarme ${dataInc.alarms.suricato01.device} está ${dataInc.alarms.suricato01.control} \n\
      // 2. O alarme ${dataInc.alarms.suricato02.device} está ${dataInc.alarms.suricato02.control}`

      callback(dataOut);
      return dataOut;
    })
  });
  req.end();
}

/* module.exports.getting_json_data = 
getting_json_data(function(out_json) {
  console.log(dataOut)
}) */