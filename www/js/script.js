const Highcharts = require('highcharts');
const input  = require('./js/input.js');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/boost')(Highcharts);




Highcharts.chart('container', {

  chart: {
    zoomType: 'x',
    animation: false,
    events: {
      load: async function () {
        let s =  this.series[0]
        while(true){
          await input.addSinDataPoint(s).then((res,err) => {
              if(err){
                console.error(err.message)
              }
          })
        }
        
      }
    }
  
  },

  plotOptions: {
    line: {
        animation: false
    }
  },

  title: {
    text: 'ECG Chart'
  },

  subtitle: {
    text: 'Using the Boost module'
  },

  tooltip: {
    valueDecimals: 2
  },

  xAxis: {
    type: 'datetime'
  },
  series: [{
    name: 'Random data',
    data: [],
    marker: {
      enabled: false,
    }
  }]

});

setTimeout(function listPorts() {
  input.listSerialPorts();
  setTimeout(listPorts, 2000);
}, 2000);
