(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217daf"],{c903:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"grid-list-xs":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs5:""}},[n("br"),n("br"),n("v-text-field",{attrs:{label:"Name",placeholder:"Sensor Name",outline:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("v-textarea",{attrs:{outline:"",name:"input-7-4",label:"Description",placeholder:"Description about the sensor"},model:{value:t.desc,callback:function(e){t.desc=e},expression:"desc"}}),n("v-overflow-btn",{attrs:{items:t.units,label:"Unit",target:"#dropdown-example"},model:{value:t.unit,callback:function(e){t.unit=e},expression:"unit"}}),n("v-btn",{attrs:{color:"success"},on:{click:t.register}},[t._v("Register")])],1),n("v-flex",{attrs:{"offset-xs1":"",xs6:""}},[n("GridList")],1),n("v-flex",{attrs:{xs12:""}},[n("gmap",{attrs:{lat:-23.4698745,lng:-47.4319803,editable:!0}})],1)],1)],1)},l=[],s=n("bd86"),i=(n("7f7f"),n("1e04")),o=n("6b40"),c={data:function(){return{units:["Celcius","Farenheit","Kelvin","KM/h"],imagelist:null,name:null,unit:null,desc:null}},methods:{register:function(){var t,e=this.$store.state,n=this,a=(t={name:e.user,lat:e.latlng.lat(),lng:e.latlng.lng()},Object(s["a"])(t,"name",n.name),Object(s["a"])(t,"desc",n.desc),Object(s["a"])(t,"unit",n.unit),Object(s["a"])(t,"img",e.selectedimg),t);this.axios.post("http://localhost:8888/data/registersensor",a,{withCredentials:!0}).then(function(t){console.log("Sucess!"),window.location.href="/sensorlist"}).catch(function(t){console.log(t)})}},mounted:function(){this.axios.get("http://localhost:8888/auth/check",{withCredentials:!0}).then(function(t){console.log("ok")}).catch(function(t){window.location.href="/signin"})},components:{GridList:i["a"],gmap:o["a"]}},r=c,u=n("2877"),d=n("6544"),f=n.n(d),h=n("8336"),m=n("a523"),p=n("0e8f"),b=n("a722"),g=n("de8e"),x=n("2677"),v=n("a844"),w=Object(u["a"])(r,a,l,!1,null,null,null);e["default"]=w.exports;f()(w,{VBtn:h["a"],VContainer:m["a"],VFlex:p["a"],VLayout:b["a"],VOverflowBtn:g["a"],VTextField:x["a"],VTextarea:v["a"]})}}]);
//# sourceMappingURL=chunk-2d217daf.f0d613ac.js.map