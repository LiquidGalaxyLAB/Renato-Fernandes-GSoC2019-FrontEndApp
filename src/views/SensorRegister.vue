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
        <v-btn color="success" @click="register">Register</v-btn>
      </v-flex>
      <v-flex offset-xs1 xs6>
        <GridList />
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
      desc: null
    };
  },
  methods: {
    register: function() {
      var store = this.$store.state;
      var vue = this;
      var data = {
        name: store.user,
        lat: store.latlng.lat(),
        lng: store.latlng.lng(),
        name: vue.name,
        desc: vue.desc,
        unit: vue.unit,
        img: store.selectedimg
      };
      this.axios.post(process.env.VUE_APP_backEnd+"/data/registersensor",data,{withCredentials: true})
      .then(result=>{
        console.log("Sucess!");
        
        window.location.href='/sensorlist'
      }).catch(err=>{
        console.log(err);
        
      })
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_backEnd+"/auth/check", { withCredentials: true })
      .then(result => {
        console.log("ok");
      })
      .catch(err => {
        window.location.href = "/signin";
      });
  },
  components: {
    GridList,
    gmap
  }
};
</script>
