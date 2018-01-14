<template>
  <div>
    <mt-cell style="min-height: 5em;" title="Your Profile" is-link>
      <span>modify</span>
      <img slot="icon" src="../assets/logo.png" width="48" height="48">
    </mt-cell>
    <mt-cell title="标题" label="描述信息" is-link></mt-cell>
    <mt-cell title="Privacy" label="" is-link></mt-cell>
    <mt-cell title="Histroy" label="Your chat histroy" is-link></mt-cell>
    <mt-cell title="Help&Feedback" label="" is-link></mt-cell>
    <mt-cell title="About" label="About our team" @click.native="toAbout" is-link></mt-cell>


  </div>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      msg: 'This is ' + this.$route.name
    }
  },
  methods: {
    toAbout: function () {
      this.$router.push('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style "scoped">

</style>
