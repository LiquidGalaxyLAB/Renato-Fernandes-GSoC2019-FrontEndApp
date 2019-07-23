<template>
  <v-alert :value="true" type="info">
    <v-layout align-center row wrap fill-height>
      <v-flex xs1>
        <h3 class="text-xs-center">{{title}}</h3>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn flat color="orange" :href="'/front/'+title+'/sensorDetail'">See Details</v-btn>
      <v-btn flat color="success" :href="'/front/'+title+'/editsensor'">Edit</v-btn>
      <v-btn flat color="error" @click="deleteSensor">Delete</v-btn>
    </v-layout>
  </v-alert>
</template>

<script>
export default {
  props: {
    title: String,
    state: String,
    stateText: String,
    desc: String,
    lastData: String,
    imgId: Number,
    imgpath: String
  },
  methods: {
    detail() {
      let test = window;
      this.axios.get(process.env.VUE_APP_backEnd + "/beurl").then(re => {
        console.log(re.data.result);
        //todo get url to eric to be open in a liquid galaxy
        test.location.href =
          "/front/" + this.$options.propsData.title + "/sensorDetail";
      });
    },
    deleteSensor() {
      this.axios.delete(process.env.VUE_APP_backEnd + "/data/deletesensor", {
        data: { name: this.title },
        withCredentials: true
      });
      this.$router.go();
    }
  }
};
</script>
