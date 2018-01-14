<template>
  <div id="app">
    <mt-header title="BlockChat">
      <router-link to="/chat" slot="left">
        <mt-button v-show="inConversation" icon="back" @click.native="redirectTo('/chat')"></mt-button>
      </router-link>
    </mt-header>
    <transition name="fade" mode="out-in">
      <router-view style="flex-grow:2;"></router-view>
    </transition>
    <mt-tabbar v-model="selected">
      <mt-tab-item @click.native="redirectTo('/chat')" id="chat">
        <img slot="icon" src="./assets/users.png"> Chat
      </mt-tab-item>
      <mt-tab-item @click.native="redirectTo('/location')" id="location">
        <img slot="icon" src="./assets/location.png"> Location
      </mt-tab-item>
      <mt-tab-item @click.native="redirectTo('/settings')" id="settings">
        <img slot="icon" src="./assets/settings.png"> Settings
      </mt-tab-item>
    </mt-tabbar>
    <div style="height:55px;"></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { Indicator } from 'mint-ui'
export default {
  name: 'app',
  data() {
    return {
      selected: this.$route.name
    }
  },
  computed: {
    ...mapGetters([
      'roomList',
      'geoLocation',
      'userName'
    ]),
    loading: function () {
      return this.roomList.length === 0 || this.geoLocation === null
    },
    inConversation: function () {
      return this.$route.name === 'conversation'
    }
  },
  methods: {
    ...mapMutations([
      'setLocation',
      'setUserName',
      'setRoom',
      'addUser'
    ]),
    redirectTo: function (path) {
      this.$router.push(path)
    }
  },
  mounted: function () {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    })
    this.setUserName(Math.random().toString(36).substring(7))
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.setLocation(pos)
        this.$socket.emit('find_room', {
          location: pos,
          name: this.userName
        })
        Indicator.close()
      })
    }
  },
  sockets: {
    room_info: function (msg) {
      console.log(msg)
      this.setRoom(msg)
    },
    sys: function (msg) {
      if (msg.action === 'login') {
        this.addUser(msg)
      }
      console.log('home sys', msg)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.mint-header {
  background-color: #2c3e50;
  font-size: 1.3em;
  height: 40px;
}
.mint-header-title {
  font-size: 1.1em;
}
.fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

