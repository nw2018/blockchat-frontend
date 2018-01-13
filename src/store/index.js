import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  geoLocation: null
}

const mutations = {
  setLocation(state, location) {
    state.geoLocation = location
  }
}

const getters = {
  geoLocation: state => state.geoLocation
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
