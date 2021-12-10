const Highcharts = require('highcharts');
const input  = require('./js/input.js');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/boost')(Highcharts);




Highcharts.chart('container', {

  chart: {
    zoomType: 'x',
    animation: false,
    events: {
      load: function () {
        let s =  this.series[0]
        setInterval(
          function(){
            let point = input.createDummyDataPoint(0)
            res = (s.data.length<=20) ? s.addPoint(point,true,false) : s.addPoint(point,true,true);

          }
          ,100)
        
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
    data: input.getECGDataJS(1),
    marker: {
      enabled: false,
    }
  }]

});

setTimeout(function listPorts() {
  input.listSerialPorts();
  setTimeout(listPorts, 2000);
}, 2000);
