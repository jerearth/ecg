const SerialPort = require('serialport');

// SerialPort.parsers = {
//     ByteLength: require('@serialport/parser-byte-length'),
//     Delimiter: require('@serialport/parser-delimiter'),
//     Readline: require('@serialport/parser-readline'),
//   }

// const Readline = SerialPort.parsers.Readline


module.exports =  {

    // getECGData : function(){
    //     const port = new SerialPort(path)
    //     const parser = new Readline({ delimiter: '\r\n' })
    //     port.pipe(parser)
    //     parser.on('data', console.log)
    //     port.write('ROBOT PLEASE RESPOND\n')
    // },

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

