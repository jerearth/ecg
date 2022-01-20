const { time } = require('highcharts');
const SerialPort = require('serialport');
const tableify = require('tableify')

SerialPort.parsers = {
    ByteLength: require('@serialport/parser-byte-length'),
    Delimiter: require('@serialport/parser-delimiter'),
    Readline: require('@serialport/parser-readline'),
  }

const Readline = SerialPort.parsers.Readline
let Port = null;


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports =  {
  //open serial port communication on provided path and return readline parser
  getPort : function(path){
    if (Port === null){
      Port = new SerialPort(path)
      Port.write('1')//signal for device to start measurig
    }
    return Port.pipe(new Readline({delimiter:'\r\n'}));
  },
  //list serial devices into html document
  listSerialPorts : async function () {
        await SerialPort.list().then((ports, err) => {
          if(err) {
            document.getElementById('error').textContent = err.message
            return
          } else {
            document.getElementById('error').textContent = ''
          }
      
          if (ports.length === 0) {
            document.getElementById('error').textContent = 'No ports discovered'
          }
      
          document.getElementById('ports').innerHTML = ""
          for (let index = 0; index < ports.length; index++) {
            const port = ports[index];
            if (typeof port.pnpId != "undefined"){
            console.log("discovered:",port.pnpId)
            let div = document.createElement('div')
            div.className = "centered"

            let path = document.createElement('div')
            path.style.visibility = "hidden"
            path.style.width = "0px"
            path.innerText = port.path
            div.append(path)

            let pnpId = document.createElement('div')
            pnpId.className ="centered"
            pnpId.innerText = port.pnpId
            div.append(pnpId)

            document.getElementById('ports').append(div)
            }
          }
        })
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
    },

    addEcgDataPoint : async function(series) {
      const path  = document.getElementById('port-path').textContent
      const parser = module.exports.getPort(path)
      const point = [timestamp,value]
      let res = (series.data.length<=100) ? series.addPoint(point,true,false) : series.addPoint(point,true,true);
      return res
    }

}

