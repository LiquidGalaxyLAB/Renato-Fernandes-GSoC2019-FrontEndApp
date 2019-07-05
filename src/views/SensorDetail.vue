<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs6>
        <h1 class="font-weight-light">
          Sensor Name: {{sensor.name}}
          <br>
        </h1>
        <h3>Registered on: {{sensor.register}}</h3>
        <h3>Description: {{sensor.description}}</h3>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs6>
        <lineChart id="chart" :chart-data="datacol"/>
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
    <br>
    <br>
    <br>

    <v-layout row wrap>
      <v-flex xs12>
        <gmap :lat="sensor.location.x" :lng="sensor.location.y" :editable="false" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import lineChart from "../components/charts/lineChart";
import gmap from '../components/maps'
export default {
  data() {
    return {
      sensor: null,
      datacol: {},
      data: null,
      labels: null
    };
  },
  props: {
    name: String
  },
  methods: {
    getReading: function(dateSpan) {
      console.log(typeof dateSpan);
      
      var post = "http://localhost:8888/readSensor?name=" +this.$options.propsData.name
      if(dateSpan!="setup"){
      console.log("here!");
        
        post+="&datespan="+dateSpan
      }
      post = encodeURI(post)
      console.log(post);
      
      this.axios
        .get(post)
        .then(result => {
          var data = [];
          var labels = [];
          var j = 0;
          if(dateSpan=="setup"){
          for (var i = result.data.result.length; j < 10; i--, j++) {
            var aux = result.data.result[i - 1];
            data.push(aux.value);
            var date = new Date(aux.date);
            labels.push(
              date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear()
            );
          }}
          else{
          result.data.result.forEach(element => {
            data.push(element.value);
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
        })
        .finally(() => {
          this.axios
            .get(
              "http://localhost:8888/getSensorInfo?name=" +
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
              console.log(sensor.location.x);
              
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
    this.getReading('setup')
  },
  components: {
    lineChart,
    gmap
  }
};
</script>