import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
});

//获取首页列表
export function getTopics(params = {}){
    let defaults = {
        page: 1,
        tab: '',
        limit: 20
    };

    Object.assign(defaults, params);
    return instance.get('/topics', {params: defaults});
};

//获取细览
/* export function getDetail(id = ''){
    return instance.get(`/topic/${id}`);
}; */

export function getDetail(id = '', hash = ''){
    if(hash){
        //需要跳转到最后一条评论
        return instance.get(`/topic/${id}${hash}`);
    }else{
        //不需要跳转到最后一条评论
        return instance.get(`/topic/${id}`);
    }
};

//获取用户信息
export function getUser(loginname = ''){
    return instance.get(`/user/${loginname}`);
};

//获取用户所收藏的主题
export function getCollection(loginname = ''){
    return instance.get(`/topic_collect/${loginname}`);
};

export default {
    install(vue){
        vue.prototype.$api = {
            getTopics,
            getDetail,
            getUser,
            getCollection
        };
    }
};