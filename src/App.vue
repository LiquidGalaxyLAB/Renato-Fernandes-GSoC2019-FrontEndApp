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
      <v-btn flat color="primary" @click="generatekml()">
        <span class="mr-2 blue--text">Generate kml</span>
      </v-btn>
      <v-btn flat color="primary" @click="generatekml()">
        <span class="mr-2 blue--text">Clean kml</span>
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
    cleankml(){
      this.axios.get(cess.env.VUE_APP_ericbe+"/kml/manage/clean")
    },
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
    },
    generatekml() {
      let vm = this;
      console.log("Generating");
      
      const groupBy = key => array =>
        array.reduce(
          (objectsByKeyValue, obj) => ({
            ...objectsByKeyValue,
            [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
          }),
          {}
        );
      const format = (by, format) => {
        var hour = groupBy(by);
        var hourset = hour(format);
        return hourset;
      };
      const sortByDate = (a, b) => {
        var ad = new Date();
        var bd = new Date();
        var as = a.split("/");
        var bs = b.split("/");

        ad.setDate(as[0]);
        ad.setMonth(as[1] - 1);
        bd.setDate(bs[0]);
        bd.setMonth(bs[1] - 1);

        return ad - bd;
      };
      this.axios
        .get(process.env.VUE_APP_backEnd + "/getfullsensors")
        .then(result => {

          var formdata = new FormData();

          let data = result.data.result;
          vm.axios
            .post(
              process.env.VUE_APP_ericbe + "/kml/manage/new?name=renato",
              formdata
            )
            .then(re => {

              data.forEach(element => {
                var b = new Date();
                let unit = element.unit
                console.log(element);
                
                vm.axios
                  .get(
                    process.env.VUE_APP_backEnd +
                      "/readSensor?name=" +
                      element.name +
                      "&datespan=1w"
                  )
                  .then(data => {
                    let readings = data.data.result;
                    
                    var daysWeek = [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat"
                    ];
                    readings.forEach(element => {
                      var date = new Date(element.date);
                      element.day =
                        date.getDate() + "/" + (date.getMonth() + 1);
                      element.month = date.getMonth() + 1;
                      element.year = date.getFullYear();
                      element.hour = date.getHours() - 3;
                      element.minute = date.getMinutes();
                      element.second = date.getSeconds();
                      element.weekday = date.getDay();
                    });
                    readings = format("day", readings);
                    for (let index = 0; index < 7; index++) {
                      var d = new Date();
                      d.setDate(d.getDate() - index);
                      if (
                        !readings.hasOwnProperty(
                          d.getDate() + "/" + (d.getMonth() + 1)
                        )
                      ) {
                        readings[d.getDate() + "/" + (d.getMonth() + 1)] = [
                          { value: 0,weekday:d.getDay() }
                        ];
                      }
                    }
                    var un = readings;
                    readings = {};
                    Object.keys(un)
                      .sort(sortByDate)
                      .reverse()
                      .forEach(function(key) {
                        readings[key] = un[key];
                      });

                    var date =
                      daysWeek[b.getDay()] + "," + b.getHours() + ":" + b.getMinutes();
                    var desc =
                      "<![CDATA[ <!DOCTYPE html>" +
                      "<html>\n" +
                      "\n" +
                      "<head>\n" +
                      "    <!--Import Google Icon Font-->\n" +
                      '    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n' +
                      "    <!--Import materialize.css-->\n" +
                      '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">\n' +
                      "\n" +
                      "    <!--Let browser know website is optimized for mobile-->\n" +
                      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
                      "</head>\n" +
                      "\n" +
                      '<body style="width:500px">\n' +
                      '<div class="row">\n' +
                      '        <div class="col s12 m6">\n' +
                      '          <div class="card blue-grey darken-1">\n' +
                      '            <div class="card-content">\n' +
                      '              <h1><span class="  white-text">Sensor name:' +
                      element.name +
                      "</span></h1>\n" +
                      '<h1><span class="white-text">Owner:'+element.username+'</span></h1>\n'+
                      '<h1><span class="white-text">'+date+'</span></h1>\n'+

                    ('                            <ul class="collection">\n');
                    for (let [key, value] of Object.entries(readings)) {
                      
                      console.log('key',key,'value',value);
                      
                      var weekday=value[0].weekday
                      var values = [];
                      value.forEach(element => {
                        values.push(parseFloat(element.value));
                      });
                      desc +=
                        '<li class="collection-item"><h4>' +
                        daysWeek[weekday] +
                        '  :<span style="color:red">' +
                        Math.max(...values) +' '+ unit+
                        '</span>-<span style="color:blue">' +
                        Math.min(...values) +' '+ unit+
                        "</span></h4></li>";
                    }
                    desc +=
                      "                            </ul>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      "        </div>\n" +
                      "    </div>\n" +
                      '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"/>\n' +
                      "    <!--JavaScript at end of body for optimized loading-->\n" +
                      "</body>\n" +
                      "\n" +
                      "</html>]]>";

                    formdata = new FormData();
                    formdata.append("id", element.sensorid);
                    formdata.append("name", element.name);
                    formdata.append("longitude", element.x);
                    formdata.append("latitude", element.y);
                    formdata.append("range", 0);
                    formdata.append("altMode", "relativeToGround");
                    formdata.append("description", desc);
                    formdata.append("icon", element.imgid);
                    formdata.append("scale", 3);
                    console.log(formdata);
                    
                    vm.axios.post(
                      process.env.VUE_APP_ericbe + "/kml/builder/addplacemark",
                      formdata
                    );
                  });
              });
            });
        });
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
        this.valid = true;
      });
  }
};
</script>