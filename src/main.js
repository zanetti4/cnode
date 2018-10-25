// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import iView from 'iview';
import mavonEditor from 'mavon-editor';
import VueWechatTitle from 'vue-wechat-title';
import 'jquery';
import router from './router'
import store from './store';
import api from './server';
import myMethods from './assets/js/my-methods';
import 'iview/dist/styles/iview.css';
import '@/assets/css/index.css';
import 'mavon-editor/dist/css/index.css';

Vue.use(VueWechatTitle);
Vue.use(api);
Vue.use(myMethods);
Vue.use(iView);
Vue.use(mavonEditor);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    api,
    myMethods,
    components: { App },
    template: '<App/>'
})