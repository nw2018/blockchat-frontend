import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import gLocation from '@/components/Location'
import Settings from '@/components/Settings'
import Conversation from '@/components/Conversation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/chat'
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }, {
      path: '/location',
      name: 'location',
      component: gLocation
    }, {
      path: '/settings',
      name: 'settings',
      component: Settings
    }, {
      path: '/conversation:id',
      name: 'conversation',
      component: Conversation,
      props: true
    }
  ]
})
