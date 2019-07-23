<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs6>
        <h1 class="font-weight-light">
          Sensor Name: {{sensor.name}}
          <br />
        </h1>
        <h3>Registered on: {{sensor.register}}</h3>
        <h3>Description: {{sensor.description}}</h3>
        <v-divider></v-divider>
        <br />
        <br />
        <br />
        <v-flex xs12 v-if="hasRead">
          <h3>Min reading:{{min}}</h3>
          <h3>Max reading:{{max}}</h3>
          <h3>Average: {{avg}}</h3>
        </v-flex>
        <v-flex xs12 v-else>
          <h3>The sensor has no reading for the time</h3>
        </v-flex>
        <v-btn flat v-on:click="closeSite()">
          <span>Close site</span>
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <lineChart id="chart" :chart-data="datacol" />
        <v-layout row wrap align-center justify-center>
          <v-btn-toggle v-model="toggle_exclusive" justify-center>
            <v-btn flat v-on:click="getReading('setup')">
              <span>all</span>
            </v-btn>
            <v-btn flat v-on:click="getReading('1y')">
              <span>1y</span>
            </v-btn>
            <v-btn flat v-on:click="getReading('6m')">
              <span>6m</span>
            </v-btn>
            <v-btn flat v-on:click="getReading('1m')">
              <span>1m</span>
            </v-btn>
            <v-btn flat v-on:click="getReading('1w')">
              <span>1w</span>
            </v-btn>
            <v-btn flat v-on:click="getReading('1d')">
              <span>1d</span>
            </v-btn>
          </v-btn-toggle>
        </v-layout>
      </v-flex>
    </v-layout>
    <br />
    <br />
    <br />

    <v-layout row wrap>
      <v-flex xs12>
        <gmap :lat="parseFloat(sensor.y)" :lng="parseFloat(sensor.x)" :editable="false" />
      </v-flex>
    </v-layout>
  </v-container>
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
    getReading(dateSpan) {
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

          this.min =
            Math.min(...data) +
            " on " +
            labels[data.indexOf(Math.min(...data))];
          this.max =
            Math.max(...data) +
            " on " +
            labels[data.indexOf(Math.max(...data))];

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
              this.axios
                .post(process.env.VUE_APP_backEnd + "/movelg", {
                  lat: sensor.y,
                  lng: sensor.x,
                  host: process.env.VUE_APP_masterIp,
                  username: process.env.VUE_APP_user,
                  password: process.env.VUE_APP_key
                })
                .then(() => {
                  console.log("ue");
                  console.log(window.location.pathname);
                  console.log(
                    encodeURI(
                      process.env.VUE_APP_localip +
                        "/front/" +
                        this.sensor.name +
                        "lgDetail"
                    )
                  );
                  var env = process.env;
                  this.axios
                    .post(env.VUE_APP_backEnd + "/opensite", {
                      serverurl: encodeURI(
                        env.VUE_APP_localip +
                          "/front/" +
                          this.sensor.name +
                          "/lgDetail"
                      ),
                      lgurl: env.VUE_APP_slaveIp,
                      lguser: env.VUE_APP_user,
                      lgkey: env.VUE_APP_key
                    })
                    .then(() => {
                      console.log("finally");
                    });
                })
                .catch(err => {
                  console.log("here");

                  console.log(err);
                });
            });
        });
    },
    closeSite() {
      window.alert("que");
      this.axios
        .post(process.env.VUE_APP_backEnd + "/closesite", {
          lgurl: process.env.VUE_APP_slaveIp,
          lguser: process.env.VUE_APP_user,
          lgkey: process.env.VUE_APP_key
        })
        .then(() => {
          console.log("finally");
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