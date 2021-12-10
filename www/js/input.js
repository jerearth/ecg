const { time } = require('highcharts');
const SerialPort = require('serialport');
const tableify = require('tableify')

SerialPort.parsers = {
    ByteLength: require('@serialport/parser-byte-length'),
    Delimiter: require('@serialport/parser-delimiter'),
    Readline: require('@serialport/parser-readline'),
  }

const Readline = SerialPort.parsers.Readline


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
        let timestamp = Date.now() + 100*offset;
        let frameType = 1;
        let value  = Math.random()*1000
        return([timestamp,value])

    },

    addSinDataPoint : async function(series) {
      let timestamp = Date.now();
      let value =  Math.sin(timestamp/200)
      const point = [timestamp,value]
      let res = (series.data.length<=100) ? series.addPoint(point,true,false) : series.addPoint(point,true,true);
      await sleep(25);
      return res
    }

}

