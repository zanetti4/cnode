import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/main';
import Detail from '@/views/detail/detail';
import User from '@/views/user/user';
import topNav from '@/router/topNav';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...topNav,
    {
      path: '/main/:tab?',
      name: 'Main',
      component: Main
    },
    /* {
      path: '/detail/:id:hash?',
      name: 'Detail',
      component: Detail
    }, */
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/user/:loginname',
      name: 'User',
      component: User
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
