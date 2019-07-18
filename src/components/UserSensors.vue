<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xl12>
        <h1 class="text-xs-center display-1">Your sensors</h1>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex sm4 v-for="(sensor, index) in sensorList" :key="index" xl3>
        <cardSensor :title="sensor.name" state="Down" stateText="red--text" :imgId="sensor.imgid"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import cardSensor from "./cardEdit";
export default {
  data() {
    return {
      sensorList: null,
      error: null
    };
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_backEnd+"/getusersensors", { withCredentials: true })
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