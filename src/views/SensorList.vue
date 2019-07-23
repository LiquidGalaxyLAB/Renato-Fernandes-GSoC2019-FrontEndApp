<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xl12>
        <h1 class="text-xs-center display-1">Sensor list</h1>
      </v-flex>
    </v-layout>

    <v-layout align-space-around justify-space-around column fill-height>
      <v-flex sm4 v-for="(sensor, index) in sensorList" :key="index">
        <h1>{{sensor.name}}</h1>
        <v-divider></v-divider>
        <br />
        <v-flex xs12 v-for="(name, index) in sensor.sensors" :key="index">
          <list :title="name" />
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import cardSensor from "../components/cardSensor";
import list from "../components/list";
export default {
  data() {
    return {
      sensorList: null,
      error: null
    };
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_backEnd + "/getAllSensors")
      .then(response => {
        console.log(response.data.result);
        var sensorFormat = {};

        this.sensorList = response.data.result;
      })
      .catch(err => {
        this.error = err;
      });
  },
  components: {
    cardSensor,
    list
  }
};
</script>