import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  geoLocation: null,
  messages: {},
  userName: null
}

const mutations = {
  setLocation(state, location) {
    state.geoLocation = location
  },
  addMessage(state, msg) {
    if (state.messages[msg.id]) {
      state.messages[msg.id].push(msg.message)
    } else {
      state.messages[msg.id] = [msg.message]
    }
  },
  setUserName(state, name) {
    state.userName = name
  }
}

const getters = {
  geoLocation: state => state.geoLocation,
  getMessage: (state) => (id) => {
    return state.messages[id]
  },
  userName: (state) => state.userName
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
