<template>
  <div id="app">
    <mt-header title="BlockChat"></mt-header>
    <router-view></router-view>
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      selected: this.$route.name
    }
  },
  methods: {
    redirectTo: function (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.mint-header {
  background-color: #2c3e50;
  font-size: 1.3em;
  height: 54px;
}
.mint-header-title {
  font-size: 1.3em;
}
</style>

