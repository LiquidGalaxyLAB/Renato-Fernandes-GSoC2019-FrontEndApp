(function(e){function t(t){for(var r,o,u=t[0],s=t[1],i=t[2],l=0,f=[];l<u.length;l++)o=u[l],a[o]&&f.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,i||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-02329519":"146452fc","chunk-2d21e95a":"7890ea0f","chunk-2d22d746":"c54e6762","chunk-696c01f8":"231f3cfd","chunk-7c82c10e":"666a7657","chunk-afc3e390":"121ef696","chunk-023b0f32":"dc1d531b","chunk-1e8ef381":"c9b8ce5c","chunk-6bb444a6":"8f1c4763","chunk-2d0b1bc4":"da90f2a2","chunk-2d217daf":"6403a3d8"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-02329519":1,"chunk-696c01f8":1,"chunk-7c82c10e":1,"chunk-afc3e390":1,"chunk-023b0f32":1,"chunk-1e8ef381":1,"chunk-6bb444a6":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-02329519":"5af7d052","chunk-2d21e95a":"31d6cfe0","chunk-2d22d746":"31d6cfe0","chunk-696c01f8":"f9199626","chunk-7c82c10e":"5af7d052","chunk-afc3e390":"3171ed81","chunk-023b0f32":"b2471e1b","chunk-1e8ef381":"477fdfbe","chunk-6bb444a6":"fa60408c","chunk-2d0b1bc4":"31d6cfe0","chunk-2d217daf":"31d6cfe0"}[e]+".css",a=s.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var i=c[u],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){i=f[u],l=i.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(d)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=c);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(e),i=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,c=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");c.type=r,c.request=o,n[1](c)}a[e]=void 0}};var f=setTimeout(function(){i({type:"timeout",target:l})},12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var f=0;f<i.length;f++)t(i[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d"),n("15f5");var r=n("2b0e"),o=n("bc3a"),a=n.n(o),c={},u=a.a.create(c);u.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),u.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)}),Plugin.install=function(e,t){e.axios=u,window.axios=u,Object.defineProperties(e.prototype,{axios:{get:function(){return u}},$axios:{get:function(){return u}}})},r["default"].use(Plugin);Plugin;var s=n("bb71");n("da64");r["default"].use(s["a"],{iconfont:"md"});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-toolbar",{attrs:{app:""}},[n("v-toolbar-title",{staticClass:"headline",on:{click:function(t){return e.home()}}},[n("span",[e._v("Google")]),n("span",{staticClass:"font-weight-light"},[e._v("Summer of code")])]),n("v-spacer"),n("v-btn",{attrs:{flat:"",href:"/sensorlist",color:"primary"}},[n("span",{staticClass:"mr-2 blue--text"},[e._v("Sensor List")])]),e.valid?n("v-btn",{attrs:{flat:"",href:"/signin",color:"primary"}},[n("span",{staticClass:"mr-2 blue--text"},[e._v("Signin")])]):n("v-btn",{attrs:{flat:"",href:"/dashboard",color:"primary"}},[n("span",{staticClass:"mr-2 blue--text"},[e._v("Dashboard")])]),n("v-btn",{attrs:{flat:"",href:"/about",color:"primary"}},[n("span",{staticClass:"mr-2 blue--text"},[e._v("About")])])],1),n("v-content",[n("transition",[n("router-view")],1)],1),n("v-footer",{staticClass:"pa-3"},[e._v("\n    Google Summer Of Code\n    - Renato Fernandes\n    "),n("v-spacer"),n("div",[e._v("© "+e._s((new Date).getFullYear()))])],1)],1)},l=[],f={data:function(){return{valid:!0}},methods:{home:function(){this.$router.push({name:"home"})}},created:function(){var e=this;this.axios.get("https://s2os10fhgh.serveo.net/auth/check",{withCredentials:!0}).then(function(t){e.$store.dispatch("setUser",t.data),e.valid=!1}).catch(function(t){console.log(t),e.valid=!0})}},d=f,h=n("2877"),p=n("6544"),m=n.n(p),b=n("7496"),v=n("8336"),g=n("549c"),k=n("553a"),y=n("9910"),w=n("71d9"),x=n("2a7f"),_=Object(h["a"])(d,i,l,!1,null,null,null),C=_.exports;m()(_,{VApp:b["a"],VBtn:v["a"],VContent:g["a"],VFooter:k["a"],VSpacer:y["a"],VToolbar:w["a"],VToolbarTitle:x["a"]});var S=n("8c4f"),P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{"grid-list-xs":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("h1",{attrs:{"text-xs-center":"","display-1":""}},[e._v("First evaluation demo")])]),n("v-btn",{attrs:{color:"success"},on:{click:function(t){return e.test()}}},[e._v("Store test")])],1)],1)},j=[],O={methods:{test:function(){console.log(this.$store.state.user)}}},V=O,E=n("a523"),T=n("0e8f"),A=n("a722"),L=Object(h["a"])(V,P,j,!1,null,null,null),U=L.exports;m()(L,{VBtn:v["a"],VContainer:E["a"],VFlex:T["a"],VLayout:A["a"]}),r["default"].use(S["a"]);var $=new S["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:U},{path:"/about",name:"about",component:function(){return n.e("chunk-2d22d746").then(n.bind(null,"f820"))}},{path:"/:name/sensorDetail",name:"SensorDetail",component:function(){return n.e("chunk-696c01f8").then(n.bind(null,"554e"))},props:!0},{path:"/sensorlist",name:"sensorList",component:function(){return n.e("chunk-7c82c10e").then(n.bind(null,"9636"))}},{path:"/signup",name:"SignUp",component:function(){return Promise.all([n.e("chunk-afc3e390"),n.e("chunk-1e8ef381")]).then(n.bind(null,"4b77"))}},{path:"/signin",name:"signin",component:function(){return Promise.all([n.e("chunk-afc3e390"),n.e("chunk-023b0f32")]).then(n.bind(null,"ab23"))}},{path:"/dashboard",name:"dashboard",component:function(){return n.e("chunk-2d21e95a").then(n.bind(null,"d5d7"))}},{path:"/sensorregister",name:"sensorregister",component:function(){return Promise.all([n.e("chunk-afc3e390"),n.e("chunk-6bb444a6"),n.e("chunk-2d217daf")]).then(n.bind(null,"c903"))}},{path:"/usersensors",name:"usersensors",component:function(){return n.e("chunk-02329519").then(n.bind(null,"bfea"))}},{path:"/:nameOld/editsensor",name:"editsensor",component:function(){return Promise.all([n.e("chunk-afc3e390"),n.e("chunk-6bb444a6"),n.e("chunk-2d0b1bc4")]).then(n.bind(null,"20b2"))},props:!0}]}),D=n("2f62"),F=n("0e44");r["default"].use(D["a"]);var B=new D["a"].Store({state:{user:null,isLogged:!1,selectedimg:null,latlng:null},mutations:{setUser:function(e,t){console.log(t),e.user=t},setImg:function(e,t){e.selectedimg=t},setCoord:function(e,t){e.latlng=t}},actions:{setUser:function(e,t){var n=e.commit;console.log("setUser action"),console.log(t),n("setUser",t)},setImg:function(e,t){var n=e.commit;console.log("setimg action"),console.log(t),n("setImg",t)},setCoord:function(e,t){var n=e.commit;console.log("setCoord action"),console.log(t),n("setCoord",t)}},getters:{},plugins:[Object(F["a"])()]}),I=n("755e"),N=n("ce5b"),M=n.n(N),q=n("2b27"),z=n.n(q),G=n("f36a"),J=n.n(G);r["default"].config.productionTip=!1,n("6ea1"),r["default"].use(J.a),r["default"].use(z.a),r["default"].use(I,{load:{key:"AIzaSyCX0EVea8pRdiSdso5s78fahE7VTm0YtaA",libraries:"places,drawing,visualization"}}),r["default"].use(M.a,{iconfont:"fa"}),new r["default"]({router:$,store:B,render:function(e){return e(C)}}).$mount("#app")}});
//# sourceMappingURL=app.30f704d7.js.map