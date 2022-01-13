const http = require('http')

let date_ob = new Date();

module.exports = function(callback){
  const options = {
    /* hostname: config.get('api.address'),
    port: config.get('api.port'), */
    hostname: "api",
    port: "3000",
    path: '/mcu/garden/data-garden-updated',
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
      `🌳Status do jardim🌳 \n\
      Relatório dos Suricatos jardineiros às ${date_ob.getHours()}:${date_ob.getMinutes()}: \n\
      1. Temperatura ambiente : ${dataInc.garden.suricatoTemp.temperature} 🌡️ \n\
      2. Umidade relativa do ar: ${dataInc.garden.suricatoTemp.humidity} 💧
      Até a próxima! 🐻 
      `
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