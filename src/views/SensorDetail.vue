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
  </v-container>
</template>

<script>
import lineChart from "../components/charts/lineChart";
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
  mounted() {
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
    this.axios
      .get(
        "http://localhost:8888/getSensorInfo?name=" +
          this.$options.propsData.name
      )
      .then(result => {
        console.log("Resultado axio 2:");
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
  },
  beforeUpdate() {},
  components: {
    lineChart
  }
};
</script>