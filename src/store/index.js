import Vue from 'vue';
import Vuex from 'vuex';
import {getTopics} from '@/server';

Vue.use(Vuex);

let store = new Vuex.Store({
  strict: true,
  state: {
    noReplyList: []
  },
  actions: {
    //获取没有回复的主题
    getNoReplyAc(store){
      return getTopics({
        tab: 'all', 
        limit: 50
      }).then(({data}) => {
        let noReplys = data.data.filter(item => item.reply_count === 0).slice(0, 5);

        store.commit('noReplyListMu', {noReplys});
      });
    }
  },
  mutations: {
    //没有回复的主题
    noReplyListMu(state, payload){
      state.noReplyList = payload.noReplys;
    }
  }
});

export default store;