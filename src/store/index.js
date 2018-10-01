import Vue from 'vue';
import Vuex from 'vuex';
import { getTopics } from '@/server';

Vue.use(Vuex);

let store = new Vuex.Store({
    strict: true,
    state: {
        noReplyList: [],
        isLogin: false
    },
    /* getters: {
        //登录状态
        isLoginVuex(state) {
            return state.isLogin;
        }
    }, */
    actions: {
        //获取没有回复的主题
        getNoReplyAc(store) {
            return getTopics({
                tab: 'all',
                limit: 100
            }).then(({ data }) => {
                let noReplys = data.data.filter(item => item.reply_count === 0).slice(0, 5);

                //console.log(data.data);

                store.commit('noReplyListMu', { noReplys });
            });
        }
    },
    mutations: {
        //没有回复的主题
        noReplyListMu(state, payload) {
            state.noReplyList = payload.noReplys;
        }
        /* ,
                //存入登录状态
                isLoginMu(state, payload) {
                    state.isLogin = payload.success;
                } */
    }
});

export default store;