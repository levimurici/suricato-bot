const http = require('http')

module.exports = function(callback){
  const options = {
    hostname: "192.168.1.10",
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
      dataInc = data
      dataOut = `${dataInc}`
      callback(dataOut);
      return dataOut;
    })
  });
  req.end();
}