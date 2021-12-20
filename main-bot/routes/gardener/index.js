const http = require('http')
const bodyParser = require('body-parser')
const config = require('config')
const config = require('../../config/default.json')

let date_ob = new Date();

module.exports = function(callback){
  const options = {
    hostname: config.get('api.address'),
    port: config.get('api.port'),
    path: '/mcu/alarm/data-garden-updated',
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
      dataInc = JSON.parse(data)
      /* dataOut = dataInc */
      dataOut = 
      `🌳Status do jardim em Construção🌳 \n\
      Relatório dos Suricatos jardineiros às ${date_ob.getHours()}:${date_ob.getMinutes()}: \n\
      1. Temperatura ambiente do jardim: ${dataInc.garden.suricatoEnv.temperature}🌡️ \n\
      2. Umidade relativa do ar: ${dataInc.garden.suricatoTemp.humidity}💧 \n\
      3. Temperatura rente ao solo: ${dataInc.garden.suricatoTemp.temperature}🌡️ \n\
      4. Umidade do solo: ${dataInc.garden.suricatoSoil.soil}💧 \n\ `
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