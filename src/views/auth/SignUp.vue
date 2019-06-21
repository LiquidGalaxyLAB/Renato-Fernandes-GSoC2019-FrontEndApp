<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h2 class="text-xs-center">Sign Up page</h2>
        <br>
        <br>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field v-model="user" :counter="8" label="Username" box :rules="nameRules"></v-text-field>
          <v-text-field v-model="mail" label="Email" box :rules="emailRules"></v-text-field>
          <v-text-field
          v-model="pass"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            :rules="passRules"
            @click:append="show1 = !show1"
            box
          ></v-text-field>
          <v-text-field
            v-model="match"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            label="Repeat Password"
            @click:append="show1 = !show1"
            box
          ></v-text-field>
          <v-btn color="success" @click="register">Validate</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    match: "",
    pass:"",
    user:"",
    mail:"",
    valid: true,
    show1: false
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    register(){
      if(this.$refs.form.validate()){
              this.axios
              .post("http://localhost:8888/auth/register",
              {name:this.user,
              email:this.mail,
              password:this.pass}).then(result=>{
                if(result.status==200){
                  this.$router.push({name:'home'})
                }
              })
      }
      else{
        window.alert('not ok')
      }

    }
  },
  computed: {
    passRules() {
      return [v => (!!v && v) === this.match || "Values do not match"];
    },
    nameRules() {
      return [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ];
    },
    emailRules() {
      return [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ];
    }
  }
};
</script>