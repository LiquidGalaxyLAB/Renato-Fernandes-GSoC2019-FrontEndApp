<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h2 class="text-xs-center">Sign Up page</h2>
        <br />
        <br />
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field v-model="user" :counter="8" label="Username" box></v-text-field>
          <v-text-field
            v-model="pass"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            @click:append="show1 = !show1"
            box
          ></v-text-field>
          <v-btn color="success" @click="login">Login</v-btn>
          <v-btn outline color="indigo" href="/front/signup">Create Account</v-btn>
        </v-form>
        <br />
        <br />
        <v-alert :value="showAlert" type="error" transition="scale-transition">Invalid credentials</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pass: "",
    user: "",
    valid: true,
    show1: false,
    showAlert: false
  }),
  methods: {
    login() {
      this.axios
        .post(
          process.env.VUE_APP_backEnd+"/auth/login",
          {
            name: this.user,
            password: this.pass
          },
          { withCredentials: true }
        )
        .then(result => {

          this.$router.push({ path: "dashboard" }, () => {
            this.$router.go();
          });
        })
        .catch(() => {

          this.showAlert = true;
        });
    }
  }
};
</script>