<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs5>
        <br />
        <br />
        <v-text-field v-model="name" label="Name" placeholder="Sensor Name" outline></v-text-field>
        <v-textarea
          outline
          name="input-7-4"
          label="Description"
          placeholder="Description about the sensor"
          v-model="desc"
        ></v-textarea>
        <v-overflow-btn v-model="unit" :items="units" label="Unit" target="#dropdown-example"></v-overflow-btn>
        <v-btn flat color="success" @click="edit">Edit</v-btn>
      </v-flex>
      <v-flex offset-xs1 xs6>
        <GridList />
      </v-flex>
      <v-flex xs12>
        <gmap v-if="isFetching" :lng="parseFloat(lataux)" :lat="parseFloat(lngaux)" :editable="true" :setMark="true" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GridList from "../components/ImageGrid";
import gmap from "../components/maps";
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = "AIzaSyCX0EVea8pRdiSdso5s78fahE7VTm0YtaA";
GoogleMapsLoader.LIBRARIES = ["places"];
export default {
  data() {
    return {
      units: ["Celcius", "Farenheit", "Kelvin", "KM/h"],
      imagelist: null,
      name: null,
      unit: null,
      desc: null,
      lataux: null,
      lngaux: null,
      oldname: null,
      isFetching: false
    };
  },
  methods: {
    edit: function() {
      var store = this.$store.state;
      var vue = this;
      var data = {
        oldname: this.oldname,
        name: store.user,
        lat: store.latlng.lat(),
        lng: store.latlng.lng(),
        name: vue.name,
        desc: vue.desc,
        unit: vue.unit,
        img: store.selectedimg
      };

      this.axios
        .post(process.env.VUE_APP_backEnd+"/data/editsensor", data, {
          withCredentials: true
        })
        .then(result => {

          window.location.href='/front/sensorlist'
        })
        .catch(err => {
        });
    }
  },
  created() {
    var vm = this;
    this.axios
      .get(process.env.VUE_APP_backEnd+"/auth/check", { withCredentials: true })
      .then(result => {
        this.axios
          .get(
            process.env.VUE_APP_backEnd+"/getSensorInfo?name=" +
              vm.$options.propsData.nameOld
          )
          .then(result => {
            var data = result.data.result;
            let vm = this;
            this.unit = data.unit;
            this.name = data.name;
            this.oldname = data.name;
            this.desc = data.description;
            this.img = data.imgId;
            this.lataux = data.x;
            this.lngaux = data.y;
            GoogleMapsLoader.load(function(google) {
              vm.$store.state.latlng = new google.maps.LatLng(
                data.x,
                data.y
              );
            });
            setInterval(() => {
            }, 1000);

            this.isFetching = true;
          })
          .catch(err => {
          });
      })
      .catch(err => {

        window.location.href = "/front/signin";
      });
  },
  components: {
    GridList,
    gmap
  },
  props: {
    nameOld: String
  }
};
</script>
