import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const modA={
  state: {
    user:null,
    isLogged:false,
    selectedimg:null,
    latlng:null,
    ericbe:null,
    masterIp:null,
    slaveIp:null,
    key:null,
    lguser:null,
    localip:null

  },
  mutations: {
    setUser(state,user){
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
      commit('setUser',payload)
    },
    setImg({commit},payload){
      commit('setImg',payload)
      
    },
    setCoord({commit},payload){
      commit('setCoord',payload)
    }
  },
  getters: {

  },
  plugins: [createPersistedState()]
}


const modB={
  state: {
    setkml:false,
  },
  mutations: {
    
  },
  actions: {

  },
  getters: {

  },
 
}


export default new Vuex.Store({
  modules:{
    a:modA,
    b:modB
  }
})



