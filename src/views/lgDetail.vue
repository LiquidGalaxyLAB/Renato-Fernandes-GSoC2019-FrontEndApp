<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 :v-if="sensor != null">
      <h1 class="font-weight-light display-3 text-xs-center">
        Sensor Name: {{sensor.name}}
        <br />
      </h1>
      <h1 class="font-weight-light display-3 text-xs-center">Register: {{sensor.register}}</h1>
      <h1 class="font-weight-light display-3 text-xs-center">Unit description : {{sensor.unitdesd}}</h1>
      <h1 class="font-weight-light display-3 text-xs-center">Owner : {{owner}}</h1>
      <v-divider></v-divider>
      <br />
      <br />
      <br />

      <v-flex xs12 v-if="hasRead" text-xs-center>
        <v-layout row wrap align-center>
          <v-flex xs4>
            <h3 class="text-xs-center font-weight-light display-3 blue--text font-weight-black">MIN</h3>
          </v-flex>
          <v-flex xs4>
            <h3 class="font-weight-light display-3 text-center font-weight-black">AVG</h3>
          </v-flex>
          <v-flex xs4>
            <h3
              class="font-weight-light display-3 red--text darken-4 text-center font-weight-black"
            >MAX</h3>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-if="hasRead" text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <h3 class="font-weight-light display-4 blue--text text-center">{{min}} {{sensor.unit}}</h3>
          </v-flex>
          <v-flex xs4>
            <h3 class="font-weight-light display-4 text-center">{{avg}} {{sensor.unit}}</h3>
          </v-flex>
          <v-flex xs4>
            <h3
              class="font-weight-light display-4 red--text darken-4 text-center"
            >{{max}} {{sensor.unit}}</h3>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 v-else>
        <h3 class="font-weight-light display-3">The sensor has no reading for the time</h3>
      </v-flex>
    </v-flex>
    <br />
    <br />

    <v-flex xs10 offset-xs1>
      <lineChart id="chart" :chart-data="datacol" fontSize="40" />
      <v-spacer></v-spacer>
    </v-flex>
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

<style>
.teste {
  display: fixed !important;
  bottom: 0 !important;
}
</style>


<script>
import lineChart from "../components/charts/lineChart";
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
      hasRead: false,
      minlbl: null,
      maxlbl: null,
      owner: null
    };
  },
  props: {
    name: String,
    time: String
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
          this.minlbl = labels[data.indexOf(Math.min(...data))];
          this.maxlbl = labels[data.indexOf(Math.max(...data))];
          var sum = data.reduce(function(a, b) {
            return a + b;
          });
          var avg = sum / data.length;

          this.avg = Math.round(avg * 10) / 10;
          this.min=Math.round(this.min * 10) /10
          this.max=Math.round(this.max * 10)/10
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
              var vm = this;
              this.axios
                .get(process.env.VUE_APP_backEnd + "/getAllSensors")
                .then(r => {
                  console.log(r);
                  r.data.result.forEach(owner => {
                    owner.sensors.forEach(sensor => {
                      if ((sensor.name == vm.sensor.name)) {
                        vm.owner = owner.name;
                      }
                    });
                  });
                });
            });
        });
    }
  },
  mounted() {
    this.getReading(this.$options.propsData.time);
  },
  components: {
    lineChart
  }
};
</script>