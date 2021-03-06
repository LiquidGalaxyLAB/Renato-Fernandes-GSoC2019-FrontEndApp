import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuetify from 'vuetify'
import kmlstore from './kmlstore'
Vue.config.productionTip = false
import VueCookies from 'vue-cookies'
import VueSelectImage from 'vue-select-image'
require('vue-select-image/dist/vue-select-image.css')


Vue.use(VueSelectImage)
Vue.use(VueCookies)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCX0EVea8pRdiSdso5s78fahE7VTm0YtaA',
    libraries: 'places,drawing,visualization', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})
Vue.use(Vuetify, {
  iconfont: 'fa' // 'md' || 'mdi' || 'fa' || 'fa4'
})

new Vue({
  router,
  store,
  kmlstore,
  render: h => h(App)
}).$mount('#app')