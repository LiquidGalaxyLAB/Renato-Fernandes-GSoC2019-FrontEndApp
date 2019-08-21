<template>
  <v-container fluid>
    <v-layout align-center justify-space-around row wrap fill-height>
      <v-flex xs12>
        <h1 class="text-xs-center display-3 font-weight-thin">Home page</h1>
        <h3 class="font-weight-regular text-xs-center">
          This project aims to integrate liquid galaxy with sensor
          tecnology available in the market, making possible
          to make the information about them ready and easy to read.
        </h3>
        <br />
        <v-flex xs12>
          <v-layout row wrap align-center justify-space-around fill-height>
            <v-flex xs8>
              <v-img :src="require('../assets/liquidsensors.png')" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap align-center justify-space-around fill-height>
            <v-flex xs3>
              <v-img :src="require('../assets/LOGO LIQUID GALAXY.jpg')" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap align-center justify-space-around fill-height>
            <v-flex xs4>
              <v-img :src="require('../assets/lglab.png')" />
            </v-flex>
            <v-flex xs4>
              <v-img :src="require('../assets/LOGO LABORATORIS TIC.png')" />
            </v-flex>
            <v-flex xs4>
              <v-img :src="require('../assets/pcital logo.jpg')" />
            </v-flex>
            <v-flex xs4>
              <v-img :src="require('../assets/gsoc.png')" />
            </v-flex>
            <v-flex xs4>
              <v-img :src="require('../assets/LogoLGEU.png')" />
            </v-flex>
          </v-layout>
        </v-flex>
        <br />
        <br />
      </v-flex>
      <v-flex xs12>
        <v-layout align-center justify-space-around row wrap fill-height>
          <v-flex xs3>
            <v-img :src="require('../assets/agro.jpg')" />
          </v-flex>
          <v-flex xs3>
            <v-img :src="require('../assets/inno4agro-logo.jpg')" />
          </v-flex>
          <v-flex xs3>
            <v-img :src="require('../assets/LogoFACENS-1210x642.png')" />
          </v-flex>
        </v-layout>
        <br />
        <v-layout align-center justify-space-around row wrap fill-height></v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    test() {}
  },
  data() {
    return {
      imgsize: 3
    };
  }
};
</script>