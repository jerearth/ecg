const SerialPort = require('serialport');
const tableify = require('tableify')

SerialPort.parsers = {
    ByteLength: require('@serialport/parser-byte-length'),
    Delimiter: require('@serialport/parser-delimiter'),
    Readline: require('@serialport/parser-readline'),
  }

const Readline = SerialPort.parsers.Readline


module.exports =  {

    listSerialPorts : async function () {
        await SerialPort.list().then((ports, err) => {
          if(err) {
            document.getElementById('error').textContent = err.message
            return
          } else {
            document.getElementById('error').textContent = ''
          }
          console.log('ports', ports);
      
          if (ports.length === 0) {
            document.getElementById('error').textContent = 'No ports discovered'
          }
      
          tableHTML = tableify(ports)
          document.getElementById('ports').innerHTML = tableHTML
        })
      },
    
    getECGData : function(){
        const port = new SerialPort(path)
        const parser = new Readline({ delimiter: '\r\n' })
        port.pipe(parser)
        parser.on('data', console.log)
        port.write('ROBOT PLEASE RESPOND\n')
    },

    getECGDataJS : function(count){
        data  = []
        for (let index = 0; index < count; index++) {
            const point  = module.exports.createDummyDataPoint(index);
            data.push(point)
        }
        return data
    },

    createDummyDataPoint : function(offset){
        timestamp = Date.now() + 100*offset;
        frameType = 1;
        value  = Math.random()*1000
        return([timestamp,value])

    }
}

