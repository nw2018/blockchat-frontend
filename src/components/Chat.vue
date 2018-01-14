<template>
  <div>
    <div v-if="chatList.length===0">You don't have any chat now</div>
    <mt-cell v-for="(item, index) in chatList" :key="index" title="Chat Name" is-link @click.native="redirectTo(index)">
      <span>  
        <mt-badge size="small">{{item}}</mt-badge>
      </span>
      <img slot="icon" src="../assets/logo.png" width="48" height="48">
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      msg: 'This is ' + this.$route.name,
      chatList: [1, 2, 3, 4, 5
      ]
    }
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
