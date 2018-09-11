// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import iView from 'iview';
import router from './router'
import store from './store';
import api from './server';
import relativeTime from './assets/js/relative-time';
import 'iview/dist/styles/iview.css';
import '@/assets/css/index.css';

Vue.use(api);
Vue.use(relativeTime);
Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  api,
  relativeTime,
  components: { App },
  template: '<App/>'
})

/* var vm = new Vue({
  el: '#app',
  router,
  store,
  api,
  components: { App },
  template: '<App/>',
  methods: { 
    lastReplyTime: function (data, on) { 
      eventHub.$emit('relativeTime', data); 
    } 
  } 
}); */