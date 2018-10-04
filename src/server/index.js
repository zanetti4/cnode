import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
});

//获取首页列表
export function getTopics(params = {}) {
    let defaults = {
        page: 1,
        tab: '',
        limit: 20
    };

    Object.assign(defaults, params);
    return instance.get('/topics', { params: defaults });
};

//获取细览
/* export function getDetail(id = '') {
    return instance.get(`/topic/${id}`);
}; */

export function getDetail(id = '', params = {}) {
    let defaults = {
        accesstoken: ''
    };

    Object.assign(defaults, params);
    return instance.get(`/topic/${id}`, { params: defaults });
};

/* export function getDetail(id = '', hash = ''){
    if(hash){
        //需要跳转到最后一条评论
        return instance.get(`/topic/${id}${hash}`);
    }else{
        //不需要跳转到最后一条评论
        return instance.get(`/topic/${id}`);
    }
}; */

//获取用户信息
export function getUser(loginname = '') {
    return instance.get(`/user/${loginname}`);
};

//获取用户所收藏的主题
export function getCollection(loginname = '') {
    return instance.get(`/topic_collect/${loginname}`);
};

/* export function getCollection(loginname = '', params = {}) {
    let defaults = {
        page: 1,
        limit: 20
    };

    Object.assign(defaults, params);
    return instance.get(`/topic_collect/${loginname}`, { params: defaults });
}; */

//验证 accessToken 的正确性
export function validateAccess(data = {}) {
    let defaults = {
        accesstoken: ''
    };

    Object.assign(defaults, data);
    return instance.post('/accesstoken', defaults);
};

//为评论点赞
export function upDown(id = '', data = {}) {
    let defaults = {
        accesstoken: ''
    };

    Object.assign(defaults, data);
    return instance.post(`/reply/${id}/ups`, defaults);
};

//收藏主题
export function collectTopic(data = {}) {
    let defaults = {
        accesstoken: '',
        topic_id: ''
    };

    Object.assign(defaults, data);
    return instance.post('/topic_collect/collect', defaults);
};

//取消收藏主题
export function deCollectTopic(data = {}) {
    let defaults = {
        accesstoken: '',
        topic_id: ''
    };

    Object.assign(defaults, data);
    return instance.post('/topic_collect/de_collect', defaults);
};

//新建主题
export function createTopic(data = {}) {
    let defaults = {
        accesstoken: '',
        title: '',
        tab: '',
        content: ''
    };

    Object.assign(defaults, data);
    return instance.post('/topics', defaults);
};

//编辑主题
export function editTopic(data = {}) {
    let defaults = {
        accesstoken: '',
        title: '',
        tab: '',
        content: '',
        topic_id: ''
    };

    Object.assign(defaults, data);
    return instance.post('/topics/update', defaults);
};

export default {
    install(vue) {
        vue.prototype.$api = {
            getTopics,
            getDetail,
            getUser,
            getCollection,
            validateAccess,
            upDown,
            collectTopic,
            deCollectTopic,
            createTopic,
            editTopic
        };
    }
};