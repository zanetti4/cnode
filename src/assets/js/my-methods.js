import time from '@/assets/js/time';

//获取相对时间
export function getRelativeTime(anytime) {
    let obj = time.getTime(anytime, new Date().toISOString());

    switch (true) {
        case obj.year !== 0:
            return `${obj.year} 年前`;
            break;
        case obj.month !== 0:
            return `${obj.month} 个月前`;
            break;
        case obj.day !== 0:
            return `${obj.day} 天前`;
            break;
        case obj.hour !== 0:
            return `${obj.hour} 小时前`;
            break;
        case obj.minute !== 0:
            return `${obj.minute} 分钟前`;
            break;
        default:
            return '刚刚';
    };
};

//获取最后回复者头像
export function getLastReplyAvatar(topicId, details) {
    let topic = details.find(obj => obj.id === topicId);

    if (topic) {
        //该话题存在
        let allReplies = topic.replies;

        if (allReplies.length > 0) {
            //话题有回复
            return allReplies[allReplies.length - 1].author.avatar_url;
        } else {
            //话题没回复
            return '';
        }
    } else {
        //该话题不存在
        return '';
    }
};

//获取主题回复数或浏览数
export function getNumbers(topicId, details, type) {
    let topic = details.find(obj => obj.id === topicId);

    if (topic && type === 'reply') {
        //该话题存在且获取回复数
        return topic.reply_count;
    } else if (topic && type === 'visit') {
        //该话题存在且获取浏览数
        return topic.visit_count;
    } else {
        //该话题不存在或关键词错误
        return -1;
    }
};

//判断话题是否是置顶或精华
export function topOrGood(topicId, topGood, details) {
    let topic = details.find(obj => obj.id === topicId);

    if (topic && topGood === 'top') {
        //该话题存在且获取置顶
        return topic.top;
    } else if (topic && topGood === 'good') {
        //该话题存在且获取精华
        return topic.good;
    } else {
        //该话题不存在或者关键词错误
        return false;
    }
};

export default {
    install(vue) {
        vue.prototype.$myMethods = {
            getRelativeTime,
            getLastReplyAvatar,
            getNumbers,
            topOrGood
        };
    }
};