<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="imgpath">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{title}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title>
      <div>
        <span :class="stateText">{{state}}</span>
        <br>
        <span class="grey--text">{{desc}}</span>
        <br>
        <span class="grey--text">{{lastData}}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange" :href="'/front/'+title+'/sensorDetail'">See Details</v-btn>
    </v-card-actions>
  </v-card>
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
  beforeCreate() {
    var id = this.$options.propsData.imgId;
    var path=require("../assets/sensorimg/"+ id+".jpg");

    this.$options.propsData.imgpath = path;
  }
};
</script>