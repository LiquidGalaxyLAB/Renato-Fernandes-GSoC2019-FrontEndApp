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
        <lineChart :data="data" :labels="labels" :unit="sensor.unit"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <GmapMap
          :center="{lat:sensor.location.y, lng:sensor.location.x}"
          :zoom="17"
          map-type-id="satellite"
          style="width: 100%; height: 300px"
        >
          <GmapMarker ref="myMarker" :position="google && new google.maps.LatLng(sensor.location.y, sensor.location.x)" title="asd"/>
        </GmapMap>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import lineChart from "../components/charts/lineChart";
import { gmapApi } from "vue2-google-maps";
export default {
  data() {
    return {
      sensor: null,
      data: null,
      labels: null
    };
  },
  props: {
    name: String
  },
  beforeCreate() {
    this.axios
      .get(
        "http://localhost:8888/readSensor?name=" + this.$options.propsData.name
      )
      .then(result => {
        console.log("Resultado axio 1:");

        console.log(result);

        var data = [];
        var labels = [];
        result.data.result.forEach(element => {
          data.push(element.value);
          labels.push(element.date);
        });
        console.log(data);

        this.data = data;
        this.labels = labels;
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        this.axios
          .get(
            "http://localhost:8888/getSensorInfo?name=" +
              this.$options.propsData.name
          )
          .then(result => {
            console.log("Resultado axio 2:");
            console.log(result);

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

            console.log(this.sensor);
          });
      });
  },
  beforeUpdate() {},
  components: {
    lineChart
  },
  computed: {
    google: gmapApi
  }
};
</script>