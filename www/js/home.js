const input  = require('./js/input.js');

setInterval(function listPorts() {
  input.listSerialPorts();
//   setTimeout(listPorts, 2000);
}, 2000);
