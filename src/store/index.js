import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  geoLocation: null,
  messages: {},
  userName: null,
  roomList: []
}

const mutations = {
  setLocation(state, location) {
    state.geoLocation = location
  },
  addMessage(state, msg) {
    if (state.messages[msg.id]) {
      state.messages[msg.id].push(msg)
    } else {
      state.messages[msg.id] = [msg]
    }
  },
  setUserName(state, name) {
    state.userName = name
  },
  setRoom(state, room) {
    state.roomList = room
  }
}

const getters = {
  geoLocation: state => state.geoLocation,
  getMessage: (state) => (id) => {
    return state.messages[id]
  },
  userName: (state) => state.userName,
  roomList: state => state.roomList
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
