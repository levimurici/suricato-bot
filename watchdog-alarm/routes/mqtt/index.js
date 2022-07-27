const http = require('http')

module.exports = function(callback){
  const options = {
    /* hostname: config.get('api.address'),
    port: config.get('api.port'), */
    hostname: "api",
    port: "3000",
    path: '/mcu/alarm/data-updated',
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
      dataOut = `${dataInc}`
      callback(dataOut);
      return dataOut;
    })
  });
  req.end();
}