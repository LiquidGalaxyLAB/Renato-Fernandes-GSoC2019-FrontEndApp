<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["options"],
  mounted() {
    console.log(this.chartData.datasets[0].data);
    var min=Math.round(Math.min(...this.chartData.datasets[0].data)-10)
    var max=Math.round(Math.max(...this.chartData.datasets[0].data)+10)
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
              max:max
            }
          }
        ]
      }
    };
    this.renderChart(this.chartData, op);
  }
};
</script>