<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex offset-xs1 xs6>
        <h1 class="display-2 font-weight-thin">Welcome {{this.$store.state.user}}</h1>
        <br />
        <h5 class="body-2">It's {{this.date}} now</h5>
      </v-flex>
      <v-flex xs4>
        <v-layout align-space-around justify-space-around column fill-height>
          <v-btn color="info" to='/sensorregister'>Register sensor</v-btn>
          <v-btn color="info" to='/usersensors'>Edit Sensor</v-btn>
          <v-btn color="error" @click="logout">logout</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      messagesmornig: ["Have a wonderful morning!", "Nice day isn't?"]
    };
  },
  created() {
        this.axios
      .get("http://localhost:8888/auth/check", { withCredentials: true })
      .catch(err => {
        console.log("Erro");
        console.log(err);
        window.location.href = "/signin";
      });
    setInterval(() => {
      var b = new Date();
      //console.log(b);
      this.date = b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
    }, 1000);

  },
  methods: {
    logout: function() {
      this.axios
        .get("http://localhost:8888/auth/logout", { withCredentials: true })
        .then(result => {
          console.log(result);
          this.$router.push({name:"signin"})
          //window.location.href = "/signin";
        })
        .catch(() => {
          console.log("Porra");

          this.showAlert = true;
        });
    }
  },
  beforeMount() {

  },
};
</script>