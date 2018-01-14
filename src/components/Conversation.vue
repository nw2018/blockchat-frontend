<template>
  <div>
    {{msg}}-{{id}}
    <div>
      <input type="text">
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['id'],
  data() {
    return {
      msg: 'This is ' + this.$route.name,
      messageContent: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style "scoped">

</style>
