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
    <mt-cell title="About" label="About our team" v-on:click.native="toAbout" is-link></mt-cell>
    <mt-popup v-model="aboutPopupVisible" position="right">
      <div style="width:100vw;height:100vh">
        <div class="team-information" style="margin-top:100px;">
          <div class="container" style="display:flex;justify-content:center;">
            <div style="display:blcok">
              <div style="font-size:50px;">nwHacks</div>
              <div>Patric</div>
              <div>Alex</div>
              <div>Jason</div>
              <div>Bob</div>
            </div>
          </div>
        </div>
        <div class="container" style="display:flex;justify-content:center;margin-top:70px;margin-bottom:20px">
          <mt-button type="default" v-on:click.native="toSetting">go back</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      msg: 'This is ' + this.$route.name,
      aboutPopupVisible: false
    }
  },
  methods: {
    toAbout: function () {
      // this.$router.push('')
      // console.log('here')
      this.aboutPopupVisible = true
    },
    toSetting: function () {
      this.aboutPopupVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style "scoped">
.team-information {
  margin-left: 20px;
  margin-right: 500px;
}
</style>