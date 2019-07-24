<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline" v-on:click="home()">
        <span>Google</span>
        <span class="font-weight-light">Summer of code</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat to="/front/sensorlist" color="primary">
        <span class="mr-2 blue--text">Sensor List</span>
      </v-btn>
      <v-btn flat href="/front/map" color="primary">
        <span class="mr-2 blue--text">Sensor Map</span>
      </v-btn>
      <v-btn v-if="valid" flat href="/front/signin" color="primary">
        <span class="mr-2 blue--text">Signin</span>
      </v-btn>
      <template v-else>
        <v-btn flat href="/front/dashboard" color="primary">
          <span class="mr-2 blue--text">Dashboard</span>
        </v-btn>
        <v-btn color="error" @click="logout">logout</v-btn>
      </template>
    </v-toolbar>

    <v-content>
      <transition>
        <router-view></router-view>
      </transition>
    </v-content>

    <v-footer class="pa-3">
      Google Summer Of Code
      - Renato Fernandes
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-cookies@1.5.12/vue-cookies.js"></script>
<script>
export default {
  data() {
    return {
      valid: true
    };
  },
  methods: {
    home: function() {
      this.$router.push({ name: "home" });
    },
    logout: function() {
      this.axios
        .get(process.env.VUE_APP_backEnd + "/auth/logout", {
          withCredentials: true
        })
        .then(result => {
          //this.$router.push({name:"signin"})
          window.location.href = "/front/signin";
        })
        .catch(() => {
          this.showAlert = true;
        });
    }
  },
  created() {
    let vm = this;
    this.axios
      .get(process.env.VUE_APP_backEnd + "/auth/check", {
        withCredentials: true
      })
      .then(result => {
        this.$store.dispatch("setUser", result.data);
        this.valid = false;
      })
      .catch(err => {
        this.valid = true;
      });
    this.axios
      .get(process.env.VUE_APP_backEnd + "/getfullsensors")
      .then(result => {
        console.log(result);
        
        var formdata = new FormData();
        formdata.append("name", "renato");
        console.log(result);
        let data = result.data.result;
        vm.axios
          .post(process.env.VUE_APP_ericbe + "/kml/manage/new", formdata)
          .then(re => {
            console.log(re);

            data.forEach(element => {
              formdata = new FormData();
              formdata.append("id", Math.random() * (999 - 1) + 1);
              formdata.append("name", element.name);
              formdata.append("longitude", element.x);
              formdata.append("latitude", element.y);
              formdata.append("range", 0);
              formdata.append("altMode", "relativeToGround");
              formdata.append("description", element.description);
              formdata.append("icon", "");
              console.log(formdata);
              
              vm.axios.post(
                process.env.VUE_APP_ericbe + "/kml/builder/addplacemark",
                formdata
              );
            });
          });
      });
  },

};
</script>