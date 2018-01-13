<template>
  <div>
    <mt-cell v-for="index in 5" :key="index" title="Chat Name" is-link>
      <span>time, detail</span>
      <img slot="icon" src="../assets/logo.png" width="48" height="48">
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      msg: 'This is ' + this.$route.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mint-cell {  
  min-height: 4em;
}
</style>
