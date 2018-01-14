import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  geoLocation: null,
  messages: {},
  emotionHistory: [],
  userName: null,
  roomList: [],
  userList: []
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
  },
  addUser(state, user) {
    state.userList.push(user)
  },
  addEmotion(state, emotion) {
    state.emotionHistory.push(emotion)
  }
}

const getters = {
  geoLocation: state => state.geoLocation,
  getMessage: (state) => (id) => {
    return state.messages[id]
  },
  userName: (state) => state.userName,
  roomList: state => state.roomList,
  userList: state => state.userList,
  emotion: state => state.emotionHistory
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
