(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e95a"],{d5d7:function(t,o,e){"use strict";e.r(o);var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-container",{attrs:{"grid-list-xs":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{"offset-xs1":"",xs6:""}},[e("h1",{staticClass:"display-2 font-weight-thin"},[t._v("Welcome "+t._s(this.$store.state.user))]),e("br"),e("h5",{staticClass:"body-2"},[t._v("It's "+t._s(this.date)+" now")])]),e("v-flex",{attrs:{xs4:""}},[e("v-layout",{attrs:{"align-space-around":"","justify-space-around":"",column:"","fill-height":""}},[e("v-btn",{attrs:{color:"info",to:"/sensorregister"}},[t._v("Register sensor")]),e("v-btn",{attrs:{color:"info",to:"/usersensors"}},[t._v("Edit Sensor")]),e("v-btn",{attrs:{color:"error"},on:{click:t.logout}},[t._v("logout")])],1)],1)],1)],1)},s=[],a={data:function(){return{date:null,messagesmornig:["Have a wonderful morning!","Nice day isn't?"]}},created:function(){var t=this;this.axios.get("https://gsoc-renatofernandes-2019be.herokuapp.com//auth/check",{withCredentials:!0}).catch(function(t){console.log("Erro"),console.log(t),window.location.href="/signin"}),setInterval(function(){var o=new Date;t.date=o.getHours()+":"+o.getMinutes()+":"+o.getSeconds()},1e3)},methods:{logout:function(){var t=this;this.axios.get("https://gsoc-renatofernandes-2019be.herokuapp.com//auth/logout",{withCredentials:!0}).then(function(t){console.log(t),window.location.href="/signin"}).catch(function(){console.log("Porra"),t.showAlert=!0})}},beforeMount:function(){}},r=a,i=e("2877"),c=e("6544"),l=e.n(c),u=e("8336"),h=e("a523"),f=e("0e8f"),d=e("a722"),g=Object(i["a"])(r,n,s,!1,null,null,null);o["default"]=g.exports;l()(g,{VBtn:u["a"],VContainer:h["a"],VFlex:f["a"],VLayout:d["a"]})}}]);
//# sourceMappingURL=chunk-2d21e95a.a7f31d41.js.map