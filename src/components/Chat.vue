<template>
  <div>
    <div v-if="roomList.length===0">You don't have any chat now</div>
    <mt-cell v-for="(item, index) in roomList" :key="index" title="room" is-link @click.native="redirectTo(index)">
      <span>
        <mt-badge size="small">{{index}}</mt-badge>
      </span>
      <img slot="icon" src="../assets/logo.png" width="48" height="48">
    </mt-cell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'chat',
  data() {
    return {
      msg: 'This is ' + this.$route.name
    }
  },
  computed: {
    ...mapGetters([
      'roomList'
    ])
  },
  methods: {
    redirectTo: function (index) {
      console.log(index)
      this.$router.push('/conversation:' + index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-cell {
  min-height: 4.8em;
  border-bottom: 1px solid #e7e7e7;
}
</style>
