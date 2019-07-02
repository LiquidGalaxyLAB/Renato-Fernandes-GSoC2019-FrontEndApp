<template>
  <v-container grid-list-xs>
    <v-layout row wrap>

      <v-flex offset-xs1 xs6>
        <h1 class="display-2 font-weight-thin">Welcome {{this.$store.state.user}}</h1>
        <br>
        <h5 class="body-2">It's {{this.date}} now</h5>
      
      </v-flex>
    </v-layout>
    <v-layout row wrap align-end>
      <v-btn color="success" @click="logout">logout</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date:null
    }
  },
  created() {
    setInterval(()=>{
        var b = new Date()
        //console.log(b);
        this.date=b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()
    },1000)


  },
  methods: {
    logout: function(){
        this.axios
        .get("http://localhost:8888/auth/logout", { withCredentials: true })
        .then((result) => {
          console.log(result);

          window.location.href="/"
        }).catch(()=>{
          console.log("Porra");
          
          this.showAlert=true
        })
    }
  },
}
</script>