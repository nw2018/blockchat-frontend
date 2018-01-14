<template>
  <div>
    <div v-if="roomList.length===0">You don't have any chat now</div>
    <mt-cell title="avaliable room" is-link>
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
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'chat',
  data() {
    return {
      msg: 'This is ' + this.$route.name,
      distance: []
    }
  },
  computed: {
    ...mapGetters([
      'roomList',
      'geoLocation'
    ])
  },
  methods: {
    ...mapMutations([
      'addDistance'
    ]),
    redirectTo: function (index) {
      this.$router.push('/conversation:' + index)
    },
    calDistance: function () {
      console.log('called')
      const rooms = this.roomList.nearbyRooms
      const myLocation = this.geoLocation
      if (!rooms || !myLocation) {
        console.log('sad')
        return
      }
      this.distance = []
      for (var index = 0; index < rooms.length; index++) {
        this.distance.push(1000 * this.getDistanceFromLatLonInKm(myLocation, rooms[index].location))
      }
    },
    getDistanceFromLatLonInKm: function (loc1, loc2) {
      var lat1 = loc1.lat
      var lon1 = loc1.lng
      var lat2 = loc2.lat
      var lon2 = loc2.lng
      var R = 6371
      var dLat = this.deg2rad(lat2 - lat1)
      var dLon = this.deg2rad(lon2 - lon1)
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = R * c
      return d
    },
    deg2rad: function (deg) {
      return Math.abs(deg) * (Math.PI / 180)
    }
  },
  watch: {
    roomList: function () {
      this.calDistance()
    }
  },
  mounted: function () {
    this.calDistance()
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
