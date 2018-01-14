<template>
  <div>
    <div v-if="roomList.length===0">You don't have any chat now</div>
    <mt-cell title="avaliable room" is-link>
      <div style="margin-right:50px">{{Math.floor(distance[index])}}</div>
      <span>
        <mt-badge size="small">1</mt-badge>
      </span>
      <img slot="icon" src="../assets/logo.png" width="48" height="48">
    </mt-cell>
    <mt-cell v-for="(item, index) in roomList.nearbyRooms" :key="index" title="Not avaliable room" is-link @click.native="redirectTo(index)">
      <div style="margin-right:50px">{{Math.floor(distance[index])}}</div>
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
      msg: 'This is ' + this.$route.name,
      distance: {}
    }
  },
  computed: {
    ...mapGetters([
      'roomList',
      'geoLocation'
    ])
  },
  methods: {
    redirectTo: function (index) {
      console.log(index)
      this.$router.push('/conversation:' + index)
    },
    calDistance: function () {
      const rooms = this.roomList
      const myLocation = this.geoLocation
      for (var index = 0; index < rooms.length; index++) {
        var obj = rooms[index]
        this.distance[index] = Math.sqrt(Math.pow(100000 * (myLocation.lat - obj.location.lat, 2) + Math.pow(100000 * myLocation.lat - obj.location.lng, 2)))
      }
    }
  },
  watch: {
    roomList: function () {
      this.calDistance()
    }
  },
  mounted: {
    function() {
      this.calDistance()
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
