<template>
  <v-container grid-list-xs>
    <br />
    <br />
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field v-model="name" label="Name" placeholder="Sensor Name" outline></v-text-field>

        <v-textarea
          outline
          name="input-7-4"
          label="Description"
          placeholder="Description about the sensor"
          v-model="desc"
        ></v-textarea>
        <v-btn color="success" @click="register">Register</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12>
            <v-text-field v-model="imgid" label="Icon" placeholder="Icon url" outline></v-text-field>
            <v-text-field v-model="unit" label="Unit" outline></v-text-field>
            <v-text-field v-model="unitdesc" label="Unit description" outline></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-img v-if="imgid!=null" :src="imgid"></v-img>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <gmap :lat="-23.4698745" :lng="-47.4319803" :editable="true" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GridList from "../components/ImageGrid";
import gmap from "../components/maps";
export default {
  data() {
    return {
      units: ["Celcius", "Farenheit", "Kelvin", "KM/h"],
      imagelist: null,
      name: null,
      unit: null,
      desc: null,
      imgid: "",
      unitdesc: null
    };
  },
  methods: {
    register: function() {
      var store = this.$store.state.a;
      var vue = this;
      var data = {
        name: store.user,
        lat: store.latlng.lat(),
        lng: store.latlng.lng(),
        name: vue.name,
        desc: vue.desc,
        unit: vue.unit,
        img: vue.imgid,
        unitdesc:vue.unitdesc
      };
      this.axios
        .post(process.env.VUE_APP_backEnd + "/data/registersensor", data, {
          withCredentials: true
        })
        .then(result => {
          window.location.href = "/front/dashboard";
        });
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_backEnd + "/auth/check", {
        withCredentials: true
      })
      .then(result => {})
      .catch(err => {
        window.location.href = "/front/signin";
      });
  },
  components: {
    GridList,
    gmap
  }
};
</script>
