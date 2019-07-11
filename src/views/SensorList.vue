<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xl12>
        <h1 class="text-xs-center display-1">Sensor list</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex sm4 v-for="(sensor, index) in sensorList" :key="index">
        <cardSensor :title="sensor.name" state="Down" stateText="red--text" :imgId="sensor.imgid"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import cardSensor from "../components/cardSensor";
export default {
  data() {
    return {
      sensorList: null,
      error: null
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_backEnd);
    
    this.axios
      .get(process.env.VUE_APP_backEnd+"/getAllSensors")
      .then(response => {
        this.sensorList = response.data.result;
      })
      .catch(err => {
        this.error = err;
      });
  },
  components: {
    cardSensor
  }
};
</script>