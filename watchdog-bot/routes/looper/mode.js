const http = require('http')
/* const bodyParser = require('body-parser')
const config = require('config')
const config = require('../../config/default.json') */

module.exports = function(callback){
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/watchdog/security-mode/update',
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
    let dataChunk = '';
    let dataInc = '';

    /* console.log(`statusCode: ${res.statusCode}`) */
    res.setEncoding("UTF-8");

    res.on('data', (chunk) => {
        dataChunk += chunk;
    })

    res.on('end', () => {
      dataInc = JSON.parse(dataChunk)
      if(dataInc.securityStatus.data.status == "true"){
        dataOut = `true`
      }

      if(dataInc.securityStatus.data.status == "false"){
        dataOut = `false`
      }
      callback(dataOut);
      return dataOut;
    })
  });
  req.end();
}