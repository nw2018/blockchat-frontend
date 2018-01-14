<template>
  <div>
    <mt-cell style="min-height: 5em;" title="Your Profile" v-on:click.native="upLoadImage = !upLoadImage">
      <span>upload</span>
      <img slot="icon" src="../assets/logo.png" width="48" height="48">
    </mt-cell>
    <transition name="fade">
      <input v-if="upLoadImage" label="" type="file" accept="image/*;capture=camera">
    </transition>
    <mt-cell title="Privacy" label="" v-on:click.native="toPrivacy" is-link></mt-cell>
    <mt-cell title="Histroy" label="Your chat histroy" is-link></mt-cell>
    <mt-cell title="Help & Feedback" to="https://github.com/nw2018/blockchat-frontend/issues" label="report issue in github" is-link></mt-cell>
    <mt-cell title="About" label="About our team" v-on:click.native="toAbout" is-link></mt-cell>
    <!-- popup for about us-->
    <mt-popup v-model="aboutPopupVisible" position="right">
      <div style="width:100vw;height:100vh">
        <div class="team-information" style="margin-top:100px;">
          <div class="container" style="display:flex;justify-content:center;">
            <div style="display:blcok">
              <div style="font-size:50px;">@nwHacks</div>
              <div class="member" style="margin-top:5px;font-size:30px;display:flex;justify-content:center;">Patrick</div>
              <div class="member" style="margin-top:5px;font-size:30px;display:flex;justify-content:center;">Alex</div>
              <div class="member" style="margin-top:5px;font-size:30px;display:flex;justify-content:center;">Jason</div>
              <div class="member" style="margin-top:5px;font-size:30px;display:flex;justify-content:center;">Bob</div>
            </div>
          </div>
        </div>
        <div class="container" style="display:flex;justify-content:center;margin-top:70px;margin-bottom:20px">
          <mt-button type="default" v-on:click.native="toSetting">Back</mt-button>
        </div>
      </div>
    </mt-popup>
    <!-- popup for privacy -->
    <mt-popup v-model="privacyPopupVisible" position="right">
      <div style="width:100vw;height:100vh">
        <div class="container" style="display:flex;justify-content:center;margin-top:70px;margin-bottom:20px">
          <div style="font-size:30px">Privacy</div>
        </div>
        <mt-cell title="Position" label="" style="margin-top:20px">
          <div v-if="positionAvailable">
            Visible to Others
          </div>
          <div v-else>
            Invisibe to Others
          </div>
          <mt-switch v-model="positionAvailable" style="margin-left:10px">
          </mt-switch>
        </mt-cell>
        <div class="container" style="display:flex;justify-content:center;margin-top:70px;margin-bottom:20px">
          <mt-button type="default" v-on:click.native="toSetting">Back</mt-button>
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
      aboutPopupVisible: false,
      privacyPopupVisible: false,
      positionAvailable: true,
      upLoadImage: false
    }
  },
  methods: {
    toAbout: function () {
      this.aboutPopupVisible = true
    },
    toPrivacy: function () {
      this.privacyPopupVisible = true
    },
    toSetting: function () {
      this.aboutPopupVisible = false
      this.privacyPopupVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style "scoped">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 10s;
}
.member {
  font-size: 90px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
}
</style>