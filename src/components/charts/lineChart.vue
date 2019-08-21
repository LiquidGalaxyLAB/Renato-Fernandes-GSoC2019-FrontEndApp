<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  props:{
    fontSize:Number
  },
  extends: Line,
  mixins: [reactiveProp],
  props:  {
    chartdata:Object,
    options:Object,
    fontSize:Number
    },
  mounted() {
    console.log('chart data',this.chartData.datasets[2].data);
    
    var min=Math.floor(Math.min(...this.chartData.datasets[2].data))
    var max=Math.ceil(Math.max(...this.chartData.datasets[1].data))
    
    
    var vm=this
    
    var op = {
      responsive: true,
      title: {
        display: true,
        text: "Data from sensor"
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Read date"
            },
            ticks:{
              fontSize: vm.$options.propsData.fontSize
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value"
            },
            ticks:{
              min:min,
              max:max,
              fontSize: vm.$options.propsData.fontSize
            }
          }
        ]
      }
    };
    this.renderChart(this.chartData, op);
  }
};
</script>