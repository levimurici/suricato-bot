const http = require('http')

function getting_json_data (callback){
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/mcu/alarm/data-updated',
    //agent: false,
    method: 'GET'
  };
  
  const req = http.request(options, res => {
    let data = '';
    let dataInc = '';
    let dataOut = '';
    /* console.log(`statusCode: ${res.statusCode}`) */
    res.setEncoding("UTF-8");

    res.on('data', (chunk) => {
      data += chunk;
    })

    res.on('end', () => {
      dataInc = JSON.parse(data)
      dataOut = `O alarme ${dataInc.alarms.suricato01.device} está ${dataInc.alarms.suricato01.control} 
      \rO alarme ${dataInc.alarms.suricato02.device} está ${dataInc.alarms.suricato02.control}`
      callback(dataOut);
    })
  });
  req.end();
}

module.exports.getting_json_data = 
getting_json_data(function(data_json) {
  //you will receive json here
  /* console.log(data_json); */
});