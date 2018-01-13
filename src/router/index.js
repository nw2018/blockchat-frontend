import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Test from '@/components/Test'
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
    },
    {
      path: '/Test',
      name: 'test',
      component: Test
    }
  ]
})
