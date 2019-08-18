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
        <h3>Unit description: {{sensor.unitdesd}}</h3>
        <v-divider></v-divider>
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
        <v-btn flat v-on:click="openballon()">
          <span>Open ballon</span>
        </v-btn>
        <v-btn flat v-on:click="closeBallon()">
          <span>Close Ballon</span>
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <lineChart id="chart" :chart-data="datacol" :key="redender" />
        <v-layout row wrap align-center justify-center>
          <v-btn-toggle v-model="toggle_exclusive" justify-center>
            <v-btn flat v-on:click="getReading('setup')">
              <span>all</span>
            </v-btn>
            <v-btn flat v-on:click="getReading('1y')">
              <span>1y</span>
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
      hasRead: false,
      redender: 0,
      realdata: [],
      realdatamin: [],
      realdatamax: [],
      datamin: [],
      datamax: []
    };
  },
  props: {
    name: String
  },
  methods: {
    async getReading(dateSpan) {
      this.realdata = [];
      this.realdatamin = [];
      this.realdatamax = [];
      this.datamin = [];
      this.datamax = [];
      let post =
        process.env.VUE_APP_backEnd +
        "/readSensor?name=" +
        this.$options.propsData.name;
      if (dateSpan != "setup") {
        post += "&datespan=" + dateSpan;
      }
      post = encodeURI(post);
      let r = await this.axios.get(
        process.env.VUE_APP_backEnd +
          "/getSensorInfo?name=" +
          this.$options.propsData.name
      );
      console.log(r);

      var data = [];
      var labels = [];
      let readings;
      let result
      console.log(!r.data.result.mock);

      if (!r.data.result.mock) {
        result = await this.axios.get(post);
        console.log("data result", result);
        readings = result.data.result;
      } else {
        readings = await this.generatedatapack(dateSpan);
        this.$store.dispatch('setMockData',readings)
        console.log("Store",this.$store);
        
      }
      console.log("Readings", readings);

      var j = 0;
      const groupBy = key => array =>
        array.reduce(
          (objectsByKeyValue, obj) => ({
            ...objectsByKeyValue,
            [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
          }),
          {}
        );
      const format = (by, format) => {
        var hour = groupBy(by);
        var hourset = hour(readings);
        const sortByDate = (a, b) => {
          var ad = new Date();
          var bd = new Date();
          var as = a.split("/");
          var bs = b.split("/");

          ad.setDate(as[0]);
          ad.setMonth(as[1] - 1);
          bd.setDate(bs[0]);
          bd.setMonth(bs[1] - 1);

          return ad - bd;
        };

        for (let [key, value] of Object.entries(hourset)) {
          var values = [];
          value.forEach(element => {
            values.push(parseFloat(element.value));
          });

          var sum = values.reduce(function(a, b) {
            return a + b;
          });
          sum = sum / value.length;
          this.realdata.push(sum);
          this.realdatamin.push(Math.min(...values));
          this.realdatamax.push(Math.max(...values));
        }

        if (dateSpan == "1d") {
          for (let index = 0; index < 24; index++) {
            if (!hourset.hasOwnProperty(index)) {
              hourset[index] = [{ value: 0 }];
            }
          }
        }
        if (dateSpan == "1w") {
          for (let index = 0; index < 7; index++) {
            var d = new Date();
            d.setDate(d.getDate() - index);
            if (
              !hourset.hasOwnProperty(d.getDate() + "/" + (d.getMonth() + 1))
            ) {
              hourset[d.getDate() + "/" + (d.getMonth() + 1)] = [{ value: 0 }];
            }
          }
          var un = hourset;
          hourset = {};
          Object.keys(un)
            .sort(sortByDate)
            .forEach(function(key) {
              hourset[key] = un[key];
            });
        }
        if (dateSpan == "1m") {
          for (let index = 0; index < 30; index++) {
            var d = new Date();
            d.setDate(d.getDate() - index);
            if (
              !hourset.hasOwnProperty(d.getDate() + "/" + (d.getMonth() + 1))
            ) {
              hourset[d.getDate() + "/" + (d.getMonth() + 1)] = [{ value: 0 }];
            }
          }
          var un = hourset;
          hourset = {};
          Object.keys(un)
            .sort(sortByDate)
            .forEach(function(key) {
              hourset[key] = un[key];
            });
        }
        if (dateSpan == "1y") {
          for (let index = 0; index < 12; index++) {
            if (!hourset.hasOwnProperty(index + 1)) {
              hourset[index + 1] = [{ value: 0 }];
            }
          }
        }

        for (let [key, value] of Object.entries(hourset)) {
          var values = [];
          value.forEach(element => {
            values.push(parseFloat(element.value));
          });

          var sum = values.reduce(function(a, b) {
            return a + b;
          });
          sum = sum / value.length;

          format(key, sum, data, labels, value);
          this.datamin.push(Math.min(...values));
          this.datamax.push(Math.max(...values));
        }
      };
      readings.forEach(element => {
        var date = new Date(element.date);
        element.day = date.getDate() + "/" + (date.getMonth() + 1);
        element.month = date.getMonth() + 1;
        element.year = date.getFullYear();
        element.hour = date.getHours() - 3;
        element.minute = date.getMinutes();
        element.second = date.getSeconds();
      });
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
          this.realdata.push(parseFloat(aux.value));
          var date = new Date(aux.date);
          labels.push(
            date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear()
          );
        }
      } else if (dateSpan == "1d") {
        format("hour", (key, sum, data, labels) => {
          data.push(sum);
          labels.push(key + "h");
        });
      } else if (dateSpan == "1w" || dateSpan == "1m") {
        format("day", (key, sum, data, labels, values) => {
          data.push(sum);
          labels.push(key);
        });
      } else {
        format("month", (key, sum, data, labels, values) => {
          data.push(sum);
          labels.push(key);
        });
      }
      this.data = data;
      this.labels = labels;
      console.log("Real data", this.realdata);

      if (this.realdata.length != 0) {
        var sum = this.realdata.reduce(function(a, b) {
          return a + b;
        });
      } else {
        sum = 0;
      }
      var avg = sum / this.realdata.length;
      this.avg = Math.round(avg * 10) / 10;
      this.min = Math.round(Math.min(...this.realdatamin) * 10) / 10;
      this.max = Math.round(Math.max(...this.realdata) * 10) / 10;
      result = await this.axios.get(
        process.env.VUE_APP_backEnd +
          "/getSensorInfo?name=" +
          this.$options.propsData.name
      );
      var sensor = result.data.result;
      var date = new Date(sensor.register);
      var formatDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      sensor.register = formatDate;
      this.sensor = sensor;

      this.datacol = {
        labels: this.labels,
        datasets: [
          {
            label: "Avarage",
            backgroundColor: "rgba(0, 0, 0, 1)",
            borderColor: "rgba(0, 0, 0, 0.3)",

            data: this.data,
            fill: false,
            stack: "1"
          },
          {
            label: "Maximum",
            backgroundColor: "rgba(255, 31, 31, 1)",
            borderColor: "rgba(255, 31, 31, 0.3)",
            data: this.datamax,
            fill: false,
            stack: "1"
          },
          {
            label: "Minimum",
            backgroundColor: "rgba(31, 87, 255, 1)",
            borderColor: "rgba(31, 87, 255, 0.3)",
            data: this.datamin,
            fill: false,
            stack: "1"
          }
        ]
      };
      this.redender += 1;
      this.axios
        .post(process.env.VUE_APP_backEnd + "/movelg", {
          lat: sensor.y,
          lng: sensor.x,
          host: process.env.VUE_APP_masterIp,
          username: process.env.VUE_APP_user,
          password: process.env.VUE_APP_key
        })
        .then(() => {})
        .catch(err => {})
        .finally(() => {});

      var env = process.env;
      this.axios
        .post(env.VUE_APP_backEnd + "/opensite", {
          serverurl: encodeURI(
            "/front/" + this.sensor.name + "/lgDetail/" + dateSpan
          ),
          lgurl: env.VUE_APP_slaveIp,
          lguser: env.VUE_APP_user,
          lgkey: env.VUE_APP_key
        })
        .then(() => {})
        .catch(err => {});
    },
    closeSite() {
      this.axios
        .post(process.env.VUE_APP_backEnd + "/closesite", {
          lgurl: process.env.VUE_APP_slaveIp,
          lguser: process.env.VUE_APP_user,
          lgkey: process.env.VUE_APP_key
        })
        .then(() => {});
    },
    closeBallon() {
      this.axios.get(
        process.env.VUE_APP_ericbe +
          "/kml/manage/balloon/" +
          this.sensor.sensorid +
          "/0"
      );
    },
    openballon() {
      this.axios.get(
        process.env.VUE_APP_ericbe +
          "/kml/manage/balloon/" +
          this.sensor.sensorid +
          "/1"
      );
    },
    generatedatapack(span) {
      return new Promise(async (resolve, reject) => {
        let data = [];
        let date = new Date();
        let datedefault = new Date();

        for (let i = 0; i < 12; i++) {
          if (i != 0) date.setMonth(date.getMonth() - 1);

          if (span == "1d" || span == "1m" || span == "1w") {
            i = 12;
          }
          if (date.getFullYear() == datedefault.getFullYear()) {
            var daysIM = new Date(
              date.getFullYear(),
              date.getMonth(),
              0
            ).getDate();
            if (span == "1w") daysIM = 7;
            for (let k = 0; k < daysIM; k++) {
              if (k != 0) {
                date.setDate(date.getDate() - 1);
                date.setHours(0);
              }

              console.log("Date", date.getDate());

              let hours;
              hours = datedefault.getHours() + 1;

              if (span == "1d") {
                k = 100;
              }
              for (let j = 0; j < hours; j++) {
                date.setHours(j + 3);
                await console.log("date", date.toISOString());
                data.push({
                  date: date.toISOString(),
                  value: Math.random() * (30 - 10) + 10
                });
              }
            }
          }
        }
        console.log("generated", data);
        resolve(data);
      });
    },
    generatedata(obj) {}
  },
  mounted() {
    this.getReading("1d");
  },
  components: {
    lineChart,
    gmap
  }
};
</script>