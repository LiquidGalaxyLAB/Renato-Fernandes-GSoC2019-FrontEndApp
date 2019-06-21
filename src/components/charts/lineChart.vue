<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    data: Array,
    labels: Array,
    unit:String 
  },
  mounted(){
    var o = Math.round,
      r = Math.random,
      s = 255;
    var color =
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")";

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
            }
          }
        ]
      }
    };
    this.renderChart(
      {
        labels: this.$options.propsData.labels,
        datasets: [
          {
            label: this.$options.propsData.unit,
            backgroundColor: color,
            data: this.$options.propsData.data
          }
        ]
      },
      op
    );
  }
};
</script>