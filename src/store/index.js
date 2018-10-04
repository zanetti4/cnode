import Vue from 'vue';
import Vuex from 'vuex';
import { getTopics, getDetail } from '@/server';

Vue.use(Vuex);

let store = new Vuex.Store({
    strict: true,
    state: {
        spinShow: true,
        noReplyList: [],
        isLogin: false,
        detail: {}
    },
    getters: {
        //登录状态
        /* isLoginVuex(state) {
            return state.isLogin;
        } */
        //反转义文章内容的字符实体名称
        decodeContent(state) {
            let REGX_HTML_DECODE = /&\w+;/g;
            //反转义表
            let HTML_DECODE = {
                "&lt;": "<",
                "&gt;": ">"
            };

            //反转义
            function decodeHtml(s) {
                return s.replace(REGX_HTML_DECODE, function($0) {
                    let c = HTML_DECODE[$0];

                    if (c === undefined) {
                        //反转义表中没有
                        c = $0;
                    }

                    return c;
                });
            };

            if (state.detail.content) {
                return decodeHtml(state.detail.content);
            } else {
                return '';
            }
        }
    },
    actions: {
        //获取没有回复的主题
        getNoReplyAc(store) {
            return getTopics({
                tab: 'all',
                limit: 100
            }).then(({ data }) => {
                let noReplys = data.data.filter(item => item.reply_count === 0).slice(0, 5);

                store.commit('noReplyListMu', { noReplys });
            });
        },
        //获取文章细览
        getDetailAc(store, payload) {
            let accesstoken = payload.accesstoken ? payload.accesstoken : '';

            return getDetail(payload.id, { accesstoken }).then(({ data }) => {
                store.commit('detailMu', { detail: data.data });
            });
        }
    },
    mutations: {
        //没有回复的主题
        noReplyListMu(state, payload) {
            state.noReplyList = payload.noReplys;
        },
        /* ,
        //存入登录状态
        isLoginMu(state, payload) {
            state.isLogin = payload.success;
        } */
        //文章细览
        detailMu(state, payload) {
            state.detail = payload.detail;
            state.spinShow = false;
            console.log(state.detail.author.loginname);
        },
        //显示 loading
        showSpinMu(state, payload) {
            state.spinShow = payload.show;
        },
        //给评论点赞
        upMu(state, payload) {
            let reply = state.detail.replies.find(reply => reply.id === payload.id);

            if (reply) {
                //找到这条评论
                if (payload.action === 'up') {
                    //点赞
                    reply.ups.push(payload.myId);
                    reply.is_uped = true;
                } else {
                    //取消点赞
                    let index = reply.ups.findIndex(userId => userId === payload.myId);

                    if (index !== -1) {
                        //找到我的 id
                        reply.ups.splice(index, 1);
                    }

                    reply.is_uped = false;
                }
            }
        }
    }
});

export default store;