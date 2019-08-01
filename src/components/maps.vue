<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <div id="map"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = "AIzaSyCX0EVea8pRdiSdso5s78fahE7VTm0YtaA";
GoogleMapsLoader.LIBRARIES = ["places"];
export default {
  data() {
    return {
      latLng: "",
      localizationName: null,
      markers: []
    };
  },
  props: {
    lat: Number,
    lng: Number,
    editable: Boolean,
    setMark: Boolean,
    img: String
  },
  watch: {
    latLng() {}
  },
  mounted: function() {
    var vm = this;
    var markers = [];
    var marker;
    console.log(vm.$options.propsData);

    GoogleMapsLoader.load(function(google) {
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: {
          lat: vm.$options.propsData.lat,
          lng: vm.$options.propsData.lng
        }
      });
      if (vm.$options.propsData.editable) {
        map.addListener("click", function(e) {
          if (marker != null) {
            marker.setMap(null);
          }

          marker = new google.maps.Marker({
            position: e.latLng,
            map: map,
          });
          vm.latLng = e.latLng;
          vm.$store.dispatch("setCoord", e.latLng);
        });
        if (vm.$options.propsData.setMark) {
          marker = new google.maps.Marker({
            position: {
              lat: vm.$options.propsData.lat,
              lng: vm.$options.propsData.lng
            },
            map: map,
          });
        }
      } else {
        marker = new google.maps.Marker({
          position: {
            lat: vm.$options.propsData.lat,
            lng: vm.$options.propsData.lng,
          },
          map: map,

        });
      }
    });
  }
};
</script>
  <style>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
#map {
  height: 400px;
  width: 100%;
}
dow-content .title {
  font-weight: bold;
}
#infowindow-content {
  display: none;
}
#map #infowindow-content {
  display: inline;
}
</style>