<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline" v-on:click="home()">
        <span>Google</span>
        <span class="font-weight-light">Summer of code</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat href="/sensorlist" color="primary">
        <span class="mr-2 blue--text">Sensor List</span>
      </v-btn>
      <v-btn v-if="valid" flat href="/signin" color="primary">
        <span class="mr-2 blue--text">Signin</span>
      </v-btn>
      <v-btn v-else flat href="/dashboard" color="primary">
        <span class="mr-2 blue--text">Dashboard</span>
      </v-btn>
      <v-btn flat href="/about" color="primary">
        <span class="mr-2 blue--text">About</span>
      </v-btn>
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
    }
  },
  created() {
    this.axios
      .get(process.env.VUE_APP_backEnd + "/auth/check", {
        withCredentials: true
      })
      .then(result => {
        this.$store.dispatch("setUser", result.data);
        this.valid = false;
      })
      .catch(err => {
        console.log(err);
        this.valid = true;
      });
  }
};
</script>