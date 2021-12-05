const http = require('http')
let date_ob = new Date();
const config = require('../../config/default.json')

module.exports = function(callback){
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/mcu/alarm/data-updated',
    agent: false,
    method: 'GET'
    /* hostname: config.get('api.address'),
    port: config.get('api.port'),
    path: '/mcu/alarm/data-updated',
    agent: false,
    method: 'GET' */
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
      dataInc = JSON.parse(data)
      dataOut = `Status dos Suricatos vigilantes às ${date_ob.getHours()}:${date_ob.getMinutes()}:
      1. O alarme ${dataInc.alarms.suricato01.device} está ${dataInc.alarms.suricato01.control} \n\
      2. O alarme ${dataInc.alarms.suricato02.device} está ${dataInc.alarms.suricato02.control}`
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