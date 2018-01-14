<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <div class="message-content" id="slider">
      <div v-for="(msg,index) in historyMessage" class="message-container" :key="index">
        <div>{{msg.name}}</div>
        <div class="speech-bubble message">
          {{msg.text}}
        </div>
        <div style="font-size:0.8em;color:#333;">{{msg.time|toTime}}</div>
      </div>
    </div>
    <div class="input-bar">
      <div>
        <input @keyup.enter="sendMessage" id="input-text" v-model="messageContent" type="text">
        <mt-button @click="sendMessage" style="height:2em;margin-left:1em;" size="small" type="default">send</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'hello',
  props: ['id'],
  data() {
    return {
      msg: 'This is ' + this.$route.name,
      messageContent: null,
      historyMessage: []
    }
  },
  filters: {
    toTime: function (dateString) {
      const date = new Date(dateString)
      return date.getHours() + ':' + date.getMinutes()
    }
  },
  computed: {
    ...mapGetters([
      'getMessage',
      'geoLocation',
      'userName',
      'emotion'
    ])
  },
  watch: {
    emotion: function () {
      let self = this
      this.historyMessage = this.historyMessage.map(item => {
        self.emotion.forEach(e => {
          if (e.hash === item.hash) {
            item.score = e.emotion.score
            return item
          }
        })
        return item
      })
    }
  },
  mounted: function () {
    this.getMessage(this.id.slice(1))
    this.$socket.emit('find_room', {
      location: this.geoLocation,
      name: this.userName
    })
    this.historyMessage = this.getMessage(this.id.slice(1))
  },
  methods: {
    ...mapMutations([
      'addMessage',
      'addEmotion'
    ]),
    hash: function (s) {
      return s.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
    },
    sendMessage: function () {
      const dateString = new Date().toString()
      const hashText = this.hash(dateString + this.messageContent)
      if (this.messageContent == null || this.messageContent.length > 0) {
        this.$socket.emit('send_msg', {
          text: this.messageContent,
          name: this.userName,
          time: new Date().toString(),
          id: this.id.slice(1),
          hash: hashText,
          needEmotion: true
        })
        const inputBar = document.getElementById('input-text')
        inputBar.focus()
      }
    }
  },
  sockets: {
    sys: (msg) => {
      console.log('[sys] ', msg)
      this.userName = msg.name
    },
    normal: function (msg) {
      console.log('[normal] ', msg)
      this.addMessage(msg)
      this.messageContent = ''
      this.historyMessage = this.getMessage(this.id.slice(1))
      this.$nextTick(() => {
        const slider = document.getElementById('slider')
        slider.scrollTop = slider.scrollHeight
      })
    },
    emotion: function (msg) {
      console.log('[emotion]', msg)
      this.addEmotion(msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 3em;
  height: 6em;
  overflow: scroll;
}
.message-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding-left: 1em;
  overflow: scroll;
}
.message-content {
  flex-grow: 5;
  height: 100%;
  overflow: auto;
}
.message {
  margin: 0.5em 0.5em 0.5em 1em;
  padding: 0.5em;
  background-color: #2c3e50;
  color: #ecf0f1;
}
.input-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  border-top: 1px solid #aeaeae;
}
#input-text {
  border: 2px solid #456879;
  border-radius: 10px;
  height: 22px;
  width: 230px;
  padding-left: 1em;
}
.speech-bubble {
  position: relative;
  background: #2c3e50;
  border-radius: 0.4em;
}

.speech-bubble:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 0.438em solid transparent;
  border-right-color: #2c3e50;
  border-left: 0;
  border-top: 0;
  margin-top: -0.219em;
  margin-left: -0.437em;
}
</style>
