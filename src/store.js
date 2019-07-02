import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    isLogged:false
  },
  mutations: {
    setUser(state,user){
      console.log(user);
      state.user=user
    }
  },
  actions: {
    setUser({commit},payload){
      console.log(payload);
      commit('setUser',payload)
    }
  },
  getters: {

  },
  plugins: [createPersistedState()]
})