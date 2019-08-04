<template>
  <v-alert :value="true" color="white" >
    <v-layout align-center row wrap fill-height>
      <v-flex xs1>
        <v-img :src="imgId" />
      </v-flex>
      <v-flex xs1>
        <h3 class="text-xs-center black--text">{{title}}</h3>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn round color="orange" :href="'/front/'+title+'/editsensor'">Edit</v-btn>
      <v-btn round color="error" @click="deleteSensor">Delete</v-btn>
      <v-btn round color="success" :href="'/front/'+title+'/sensorDetail'">See Details</v-btn>
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
