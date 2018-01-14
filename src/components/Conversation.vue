<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <div class="message-content">
    </div>
    <div class="input-bar">
      <div>
        <input id="input-text" type="text">
        <mt-button style="height:2em;" size="small" type="default">send</mt-button>
      </div>
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
<style scoped>
.message-content {
  flex-grow: 5;
}
.input-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
}
#input-text {
  border: 2px solid #456879;
  border-radius: 10px;
  height: 22px;
  width: 230px;
  padding-left: 1em;
}
</style>
