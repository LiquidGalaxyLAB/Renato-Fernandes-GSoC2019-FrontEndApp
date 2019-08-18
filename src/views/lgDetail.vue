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
            <h3 class="font-weight-light display-4 blue--text">
              {{min}}
              <span class="display-1 blue--text">{{sensor.unit}}</span>
            </h3>
          </v-flex>
          <v-flex xs4>
            <h3 class="font-weight-light display-4 text-center">
              {{avg}}
              <span class="display-1">{{sensor.unit}}</span>
            </h3>
          </v-flex>
          <v-flex xs4>
            <h3 class="font-weight-light display-4 red--text darken-4 text-center">
              {{max}}
              <span class="display-1 red--text darken-4">{{sensor.unit}}</span>
            </h3>
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
      <lineChart id="chart" :chart-data="datacol" :fontSize="40" />
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
.sup {
  vertical-align: super !important;
  font-size: smaller !important;
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
      owner: null,
      realdata: [],
      realdatamin: [],
      realdatamax: [],
      datamin: [],
      datamax: []
    };
  },
  props: {
    name: String,
    time: String
  },
  methods: {
    async getReading(dateSpan) {
      this.realdata = [];
      this.realdatamin = [];
      this.realdatamax = [];
      this.datamin = [];
      this.datamax = [];
      var post =
        process.env.VUE_APP_backEnd +
        "/readSensor?name=" +
        this.$options.propsData.name;
      if (dateSpan != "setup") {
        post += "&datespan=" + dateSpan;
      }
      post = encodeURI(post);
      let sen = await this.axios.get(
        process.env.VUE_APP_backEnd +
          "/getSensorInfo?name=" +
          this.$options.propsData.name
      );
      let readings;
      let result
      var data = [];
      var labels = [];
      var j = 0;
      if (!sen.data.result.mock) {
        result = await this.axios.get(post);
        readings = result.data.result;
      }
      else{
        readings=this.$store.state.a.mockdata
        console.log("strore",this.$store);
        
        console.log(readings);
        
      }

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

      var sum = this.realdata.reduce(function(a, b) {
        return a + b;
      });
      var avg = sum / this.realdata.length;
      this.avg = Math.round(avg * 10) / 10;
      this.min = Math.round(Math.min(...this.realdatamin) * 10) / 10;
      this.max = Math.round(Math.max(...this.realdatamax) * 10) / 10;
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
      var vm = this;
      let r = await this.axios.get(
        process.env.VUE_APP_backEnd + "/getAllSensors"
      );
      r.data.result.forEach(owner => {
        owner.sensors.forEach(sensor => {
          if (sensor.name == vm.sensor.name) {
            vm.owner = owner.name;
          }
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