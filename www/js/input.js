const { time } = require('highcharts');
const SerialPort = require('serialport');
const tableify = require('tableify')

SerialPort.parsers = {
    ByteLength: require('@serialport/parser-byte-length'),
    Delimiter: require('@serialport/parser-delimiter'),
    Readline: require('@serialport/parser-readline'),
  }

const Readline = SerialPort.parsers.Readline
let Parser = null;
let ECGseries

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

module.exports =  {
  //open serial port communication on provided path and return readline parser
  initPort : async function(){
    const path  = localStorage.getItem('portpath')
    let Port = new SerialPort(path, {autoOpen:false,baudRate:9600,dataBits: 8,stopBits: 1})
    localStorage.setItem('port',Port)
    if (Parser === null){
      Parser = Port.pipe(new Readline({delimiter:'\r\n'}));
      Parser.on('data',data =>
      {
        this.addEcgDataPoint(data.split(','))
      })
      Port.open()
      Port.write('1')//signal for device to start measurig
      
    }
    
  },
  closePort: function(){
    let port = localStorage.getItem('port');
    if (port != null){
        port.close();
    }
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
            div.className = "port"

            let path = document.createElement('div')
            path.style.visibility = "hidden"
            path.style.width = "0px"
            path.innerText = port.path
            div.append(path)

            let pnpId = document.createElement('div')
            pnpId.className ="centered"
            pnpId.innerText = port.pnpId
            div.append(pnpId)


            div.onclick = function(event)
            {
              localStorage.setItem('portpath', port.path)
              window.location = 'graph.html'
            }


            document.getElementById('ports').append(div)
            }
          }
        })
      },

    getECGDataJS : function(count){
        data  = []
        for (let index = 0; index < count; index++) {
            const point  = module.exports.createDummyDataPoint(index)
            data.push(point)
        }
        return data
    },


    addSinDataPoint : async function(series) {
      let timestamp = Date.now()
      let value =  Math.sin(timestamp/200)
      const point = [timestamp,value]
      let res = (series.data.length<=100) ? series.addPoint(point,true,false) : series.addPoint(point,true,true)
      await sleep(25)
      return res
    },

    startECGMeasure : async function(series){
      ECGseries = series;
      await this.initPort()
    },

    addEcgDataPoint : function(data) {
      const point = [parseInt(data[0]),parseInt(data[1])]
      let res = (ECGseries.data.length<=500) ? ECGseries.addPoint(point,true,false) : ECGseries.addPoint(point,true,true)
      return res
    }

}

