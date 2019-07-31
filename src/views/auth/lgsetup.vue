<template>
  <v-container grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-text-field
          v-model="kmlbe"
          label="Kml Back End"
          placeholder="http://localhost:8080"
          outline
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-text-field v-model="masterip" label="Master node ip" placeholder="192.168.0.100" outline></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-text-field v-model="slaveip" label="Slave node ip" placeholder="192.168.0.100" outline></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-text-field
          v-model="lgpass"
          label="Liquid galaxy password"
          placeholder="Password"
          outline
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-text-field v-model="lguser" label="Liquid galaxy username" placeholder="lg" outline></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-text-field
          v-model="siteip"
          label="This site ip"
          placeholder="http://192.168.0.187:888"
          outline
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-btn color="success">Setup</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    var store = this.$store.state.a;
    return {
      kmlbe: store.ericbe,
      masterip: store.masterIp,
      slaveip: store.slaveIp,
      lgpass: store.key,
      lguser: store.lguser,
      siteip: store.localip
    };
  },
  methods: {
    setup() {
      var store = this.$store.state.a;
      store.ericbe = this.kmlbe;
      store.masterIp = this.masterip;
      store.slaveIp=this.slaveip
      store.key=this.lgpass
      store.lguser=this.lguser
      store.localip=this.siteip
    }
  }
};
</script>
