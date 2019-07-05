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
        <v-btn flat color="success" @click="edit">Register</v-btn>
      </v-flex>
      <v-flex offset-xs1 xs6>
        <GridList />
      </v-flex>
      <v-flex xs12>
        <gmap v-if="isFetching" :lat="lataux" :lng="lngaux" :editable="true" :setMark="true" />
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
      lataux:null,
      lngaux:null,
      isFetching:false
    };
  },
  methods: {
    edit: function() {
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
      this.axios.post("http://localhost:8888/data/registersensor",data,{withCredentials: true})
      .then(result=>{
        console.log("Sucess!");
        
        window.location.href='/sensorlist'
      }).catch(err=>{
        console.log(err);
        
      })
    }
  },
  created() {
    var vm = this
    this.axios
      .get("http://localhost:8888/auth/check", { withCredentials: true })
      .then(result => {
        console.log(this.$options.propsData.nameOld);
            this.axios.get('http://localhost:8888/getSensorInfo?name='+vm.$options.propsData.nameOld)
            .then(result=>{
                var data = result.data.result
                this.unit=data.unit
                this.name=data.name
                this.desc=data.description
                this.img=data.imgId
                this.lataux=data.location.x
                this.lngaux=data.location.y
                console.log(result);
                console.log(typeof this.lataux);
                this.isFetching=true
                
                
            }).catch(err=>{
                console.log(err);
                
            })
      })
      .catch(err => {
          console.log('Erro');
          
          console.log(err);
          
        window.location.href = "/signin";
      });
  },
  components: {
    GridList,
    gmap
  },
  props:{
      nameOld:String
  }
};
</script>
