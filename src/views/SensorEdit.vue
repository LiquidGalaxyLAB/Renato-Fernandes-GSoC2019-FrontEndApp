<template>
  <v-container grid-list-xs>
    <br />
    <br />
    <v-layout row wrap>
      <v-flex xs5>
        <v-text-field v-model="name" label="Name" placeholder="Sensor Name" outline></v-text-field>
        <v-textarea
          outline
          name="input-7-4"
          label="Description"
          placeholder="Description about the sensor"
          v-model="desc"
        ></v-textarea>
        <v-text-field v-model="unit"  label="Unit" outline></v-text-field>
        <v-text-field v-model="unitdesc"  label="Unit description" outline></v-text-field>
        <v-btn flat color="success" @click="edit">Edit</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12>
            <v-text-field v-model="imgid" label="Icon" placeholder="Icon url" outline></v-text-field>
          </v-flex>
          <v-flex xs3 >
            <v-img v-if="isFetching" :src="imgid"></v-img>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <gmap
          v-if="isFetching"
          :lng="parseFloat(lngaux)"
          :lat="parseFloat(lataux)"
          :editable="true"
          :setMark="true"
        />
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
      isFetching: false,
      imgid: null,
      unitdesc:null
    };
  },
  methods: {
    edit: function() {
      var store = this.$store.state.a;
      console.log(store);
      var vue = this;
      var data = {
        oldname: this.oldname,
        name: store.user,
        lat: store.latlng.lat(),
        lng: store.latlng.lng(),
        name: vue.name,
        desc: vue.desc,
        unit: vue.unit,
        img: vue.imgid,
        unitdesc:vue.unitdesc
      };
      console.log(data);

      this.axios
        .post(process.env.VUE_APP_backEnd + "/data/editsensor", data, {
          withCredentials: true
        })
        .then(result => {
          window.location.href = "/front/dashboard";
        })
        .catch(err => {});
    }
  },
  created() {
    var vm = this;
    this.axios
      .get(process.env.VUE_APP_backEnd + "/auth/check", {
        withCredentials: true
      })
      .then(result => {
        this.axios
          .get(
            process.env.VUE_APP_backEnd +
              "/getSensorInfo?name=" +
              vm.$options.propsData.nameOld
          )
          .then(result => {
            var data = result.data.result;
            console.log(data);

            let vm = this;
            this.unit = data.unit;
            this.name = data.name;
            this.oldname = data.name;
            this.desc = data.description;
            this.imgid = data.imgid;
            this.lataux = data.y;
            this.lngaux = data.x;
            this.unitdesc=data.unitdesd
            GoogleMapsLoader.load(function(google) {
              vm.$store.state.a.latlng = new google.maps.LatLng(data.y, data.x);
            });
            this.isFetching = true;
          })
          .catch(err => {});
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
