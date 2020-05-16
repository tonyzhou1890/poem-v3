import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  device: 'desktop'
}

const mutations = {
  toggleDevice: (state, device) => {
    state.device = device
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
