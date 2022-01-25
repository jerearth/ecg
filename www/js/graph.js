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
        await input.startECGMeasure(s)
        
      }
    }
  
  },

  plotOptions: {
    line: {
        animation: false,
        enableMouseTracking: false,
    }
  },

  title: {
    text: 'ECG Chart'
  },


  tooltip: {
    valueDecimals: 2
  },

  xAxis: {
    type: 'integer'
  },
  series: [{
    name: 'ECG',
    color: 'red',
    data: [],
    marker: {
      enabled: false,
    }
  }]

});

// window.onclose = input.closePort()

