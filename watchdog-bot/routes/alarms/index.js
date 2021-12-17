const http = require('http')
/* const bodyParser = require('body-parser')
const config = require('config')
const config = require('../../config/default.json') */

module.exports = function(callback){
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/mcu/alarm/show',
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
      dataInc = data
      dataOut = `${dataInc}`
      callback(dataOut);
      return dataOut;
    })
  });
  req.end();
}