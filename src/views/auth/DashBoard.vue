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
          <v-btn color="info" to="/sensorregister">Register sensor</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
      <br>
      <br>
      <br>
      <editlist/>
  </v-container>
</template>

<script>
import editlist from "../../components/UserSensors";
export default {
  data() {
    return {
      date: null,
      messagesmornig: ["Have a wonderful morning!", "Nice day isn't?"]
    };
  },
  created() {
    this.axios
      .get(process.env.VUE_APP_backEnd + "/auth/check", {
        withCredentials: true
      })
      .catch(err => {
        window.location.href = "/signin";
      });
    setInterval(() => {
      var b = new Date();
      this.date = b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
    }, 1000);
  },
  components: {
    editlist
  }
};
</script>