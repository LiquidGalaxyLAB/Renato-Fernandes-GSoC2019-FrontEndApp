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
      markers: [],
      lat: -23.4698745,
      lng: -47.4319803,
      info: [],
      markers: []
    };
  },
  watch: {
    latLng() {}
  },
  mounted: function() {
    var vm = this;
    let contentString;

    GoogleMapsLoader.load(function(google) {
      let sensors = [];
      let i = 0;
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: {
          lat: vm.lat,
          lng: vm.lng
        }
      });
      vm.axios
        .get(process.env.VUE_APP_backEnd + "/getfullsensors")
        .then(response => {
          response = response.data.result;
          response.forEach(element => {
            vm.markers.push(
              new google.maps.Marker({
                position: {
                  lat: parseFloat(element.y),
                  lng: parseFloat(element.x)
                },
                map: map,
                animation: google.maps.Animation.DROP
              })
            );
            contentString =
              '<div id="content">' +
              '<div id="siteNotice">' +
              "</div>" +
              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
              '<div id="bodyContent">' +
              "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
              "sandstone rock formation in the southern part of the " +
              "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
              "south west of the nearest large town, Alice Springs; 450&#160;km " +
              "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
              "features of the Uluru - Kata Tjuta National Park. Uluru is " +
              "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
              "Aboriginal people of the area. It has many springs, waterholes, " +
              "rock caves and ancient paintings. Uluru is listed as a World " +
              "Heritage Site.</p>" +
              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
              "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
              "(last visited June 22, 2009).</p>" +
              "</div>" +
              "</div>";
            vm.info.push(
              new google.maps.InfoWindow({
                content: "Renato"
              })
            );
            i++;
            contentString += "aaaaaaaaaaaaaaaaa";
          });
        })
        .catch(err => {
        });
    });
    
    let i=0
    this.markers.forEach(element => {
      this.markers[i].addListener("click", function() {
        this.info[i].open(map, markers[i]);
      });
      i++
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