import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    isLogged:false,
    selectedimg:null,
    latlng:null
  },
  mutations: {
    setUser(state,user){
      console.log(user);
      state.user=user
    },
    setImg(state,imgID){
      state.selectedimg=imgID
    },
    setCoord(state,coord){
      state.latlng=coord
    }
  },
  actions: {
    setUser({commit},payload){
      console.log("setUser action");
      console.log(payload);
      commit('setUser',payload)
    },
    setImg({commit},payload){
      console.log("setimg action");
      console.log(payload);
      commit('setImg',payload)
      
    },
    setCoord({commit},payload){
      console.log("setCoord action");
      console.log(payload);
      commit('setCoord',payload)
    }
  },
  getters: {

  },
  plugins: [createPersistedState()]
})