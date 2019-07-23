<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xl12>
        <h1 class="text-xs-center display-1">Your sensors</h1>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex sm12 v-for="(sensor, index) in sensorList" :key="index" xl3>
        <listEdit :title="sensor.name" state="Down" stateText="red--text" :imgId="sensor.imgid"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import listEdit from "./listEdit";
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
    listEdit
  }
};
</script>