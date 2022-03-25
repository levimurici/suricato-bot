const http = require('http')

let date_ob = new Date();

module.exports = function(callback){
  const options = {
    hostname: process.env.API_ADDRESS, // "192.168.1.11"
    port: process.env.API_PORT, // "3000"
    path: `/garden/show/${process.env.SURICATO_GARDEN}`,
    agent: false,
    method: 'GET'
  }

  const req = http.request(options, res => {
    let dataOut;
    let data;
    let dataInc;

    /* console.log(`statusCode: ${res.statusCode}`) */
    res.setEncoding("UTF-8");

    res.on('data', (chunk) => {
      data += chunk;
    })

    res.on('end', () => {
      // dataInc = JSON.parse(data)
      // dataOut = 
      // `🌳Status do jardim🌳 \n\
      // Relatório do ${data.name} do(a) ${data.info.place} das ${date_ob.getHours()}:${date_ob.getMinutes()}: \n\
      // - Temperatura ambiente : ${data.data.temperature}ºC 🌡️ \n\
      // - Umidade relativa do ar: ${data.data.humidity}% 💧 `
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