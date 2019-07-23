<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h1 class="font-weight-light display-3">
        Sensor Name: {{sensor.name}}
        <br />
      </h1>
      <v-divider></v-divider>
      <br />
      <br />
      <br />

      <v-flex xs12 v-if="hasRead">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <h3 class="font-weight-light display-3 blue--text text-xs-center">Min {{min}}</h3>
          </v-flex>
          <v-flex xs4>
            <h3 class="font-weight-light display-3">Average: {{avg}}</h3>
          </v-flex>
          <v-flex xs4>
            <h3 class="font-weight-light display-3 red--text darken-4">Max reading: {{max}}</h3>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-else>
        <h3 class="font-weight-light display-3">The sensor has no reading for the time</h3>
      </v-flex>
    </v-flex>
    <v-layout row wrap align-center>
      <v-flex xs10 offset-xs1>
        <lineChart id="chart" :chart-data="datacol" />
      </v-flex>
    </v-layout>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs3>
          <v-img :src="require('../assets/inno4agro-logo.jpg')" />
        </v-flex>
        <v-flex xs3>
          <v-img :src="require('../assets/gsoc.png')" />
        </v-flex>
        <v-flex xs3>
          <v-img :src="require('../assets/LogoFACENS-1210x642.png')" />
        </v-flex>
        <v-flex xs3>
          <v-img :src="require('../assets/LOGO LIQUID GALAXY.jpg')" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import lineChart from "../components/charts/lineChart";
import gmap from "../components/maps";
export default {
  data() {
    return {
      sensor: null,
      datacol: {},
      data: null,
      labels: null,
      max: null,
      min: null,
      avg: null,
      hasRead: false
    };
  },
  props: {
    name: String
  },
  methods: {
    getReading: function(dateSpan) {
      var post =
        process.env.VUE_APP_backEnd +
        "/readSensor?name=" +
        this.$options.propsData.name;
      if (dateSpan != "setup") {
        post += "&datespan=" + dateSpan;
      }
      post = encodeURI(post);

      this.axios
        .get(post)
        .then(result => {
          var data = [];
          var labels = [];
          let readings = result.data.result;
          var j = 0;

          if (readings.length == 0) {
            this.hasRead = false;
          } else {
            this.hasRead = true;
          }
          if (dateSpan == "setup") {
            readings.reverse();
            for (var i = readings.length; j < 10 && i != 0; i--, j++) {
              var aux = readings[i - 1];

              data.push(parseFloat(aux.value));
              var date = new Date(aux.date);
              labels.push(
                date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear()
              );
            }
          } else {
            readings.forEach(element => {
              data.push(parseFloat(element.value));
              var date = new Date(element.date);
              labels.push(
                date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear()
              );
            });
          }
          this.data = data;
          this.labels = labels;

          this.min = Math.min(...data);
          this.max = Math.max(...data);

          var sum = data.reduce(function(a, b) {
            return a + b;
          });
          var avg = sum / data.length;

          this.avg = avg;
        })
        .finally(() => {
          this.axios
            .get(
              process.env.VUE_APP_backEnd +
                "/getSensorInfo?name=" +
                this.$options.propsData.name
            )
            .then(result => {
              var sensor = result.data.result;
              var date = new Date(sensor.register);
              var formatDate =
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear();
              sensor.register = formatDate;
              this.sensor = sensor;

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

              this.datacol = {
                labels: this.labels,
                datasets: [
                  {
                    label: this.sensor.unit,
                    backgroundColor: color,
                    data: this.data
                  }
                ]
              };
            });
        });
    }
  },
  mounted() {
    this.getReading("setup");
  },
  components: {
    lineChart,
    gmap
  }
};
</script>