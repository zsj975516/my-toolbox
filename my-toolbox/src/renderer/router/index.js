import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: () => import('../views/Login.vue'),
      props: route => {
        return route.params
      }
    },
    {
      path: '/home',
      name: 'home-page',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: 'sessionlist',
          name: 'home-page-sessionlist',
          components: {
            center: () => import('../components/SessionList.vue'),
            right: () => import('../components/ChatInterface.vue')
          }
        },
        {
          path: 'contactlist',
          name: 'home-page-contactlist',
          components: {
            center: () => import('../components/ContactList.vue'),
            right: () => import('../views/Home/MainPage.vue')
          }
        },
        {
          path: 'toolbox',
          name: 'home-page-toolbox',
          components: {
            center: () => import('../components/ToolBox.vue'),
            right: () => import('../views/Home/MainPage.vue')
          }
        },
        {
          path: 'manager',
          name: 'home-page-manager',
          components: {
            center: () => import('../components/Manager.vue'),
            right: () => import('../components/ManagerRight.vue')
          }
        },
        {
          path: '/',
          redirect: 'sessionlist'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
