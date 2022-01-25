const input  = require('./js/input.js');

//init local storage with nulls
localStorage.setItem('portpath',null)
localStorage.setItem('port',null)

setInterval(function listPorts() {
  input.listSerialPorts();
//   setTimeout(listPorts, 2000);
}, 2000);
