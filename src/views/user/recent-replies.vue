<template>
  <section class="recentre">
    <Card title="最近参与的话题" :bordered="false" :dis-hover="true">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <CellGroup>
        <article v-for="item in recentRe" :key="item.id">
          <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
            <Avatar shape="square" :src="item.author.avatar_url" size="small" />
          </router-link>
          <span class="recentto-numbers">{{getReplyLen(item.id)}}/<span>{{getVisitLen(item.id)}}</span></span>
          <span v-if="isTopGood(item.id, 'top') || isTopGood(item.id, 'good')" class="recentto-tag" :class="{top: isTopGood(item.id, 'top'), good: isTopGood(item.id, 'good')}">{{topGood(item.id)}}</span>
          <router-link 
          :to="{name: 'Detail', params: {id: item.id}}"
          class="recentto-tit ks-text-overflow"
          :title="item.title"
          >{{item.title}}</router-link>
          <a href="#" class="recentto-reply" v-if="lastReplyAvatar(item.id)">
            <Avatar shape="square" :src="lastReplyAvatar(item.id)" size="small" />{{lastReplyTime(item.last_reply_at)}}
          </a>
        </article>
      </CellGroup>
      <router-link :to="{name: 'Replies'}" class="recentto-more">
        查看更多<Icon type="ios-arrow-forward" />
      </router-link>
    </Card>
  </section>
</template>

<script>
import time from '@/assets/js/time';

export default {
  name: 'RecentTopics',
  props: {
    recentRe: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      details: [],
      spinShow: true
    };
  },
  created(){
    this.getDetails();
  },
  watch: {
    recentRe: 'getDetails'
  },
  methods: {
    //根据话题 id 获取话题详细信息
    async getDetails(){
      this.spinShow = true;

      for(let i = 0; i < this.recentRe.length; i++){
        let {data} = await this.$api.getDetail(this.recentRe[i].id);

        this.details.push(data.data);
      };

      this.spinShow = false;
    },
    //计算最后回复的相对时间
    /* lastReplyTime(replyTime){
      let obj = time.getTime(replyTime, new Date().toISOString());

      switch(true){
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
    } */

    lastReplyTime: function(replyTime){
      return this.$myMethods.getRelativeTime(replyTime);
    },
    //获取最后回复者的头像
    /* getLastReplyAvatar(topicId){
      //console.log(this.details);
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic){
        //该话题存在
        let allReplies = topic.replies;

        if(allReplies.length > 0){
          //话题有回复
          return allReplies[allReplies.length - 1].author.avatar_url;
        }else{
          //话题没回复
          return '';
        }
      }else{
        //该话题不存在
        return '';
      }
    } */

    lastReplyAvatar(topicId){
      return this.$myMethods.getLastReplyAvatar(topicId, this.details);
    },
    //获取回复数
    getReplyLen(topicId){
      return this.$myMethods.getNumbers(topicId, this.details, 'reply');
    },
    //获取浏览数
    getVisitLen(topicId){
      return this.$myMethods.getNumbers(topicId, this.details, 'visit');
    },
    //判断话题是否是置顶或精华
    isTopGood(topicId, topGood){
      return this.$myMethods.topOrGood(topicId, topGood, this.details);
    },
    //置顶或精华
    topGood(topicId){
      if(this.isTopGood(topicId, 'top') && this.isTopGood(topicId, 'good')){
        //优先显示置顶
        return '置顶';
      }else if(this.isTopGood(topicId, 'top')){
        //置顶
        return '置顶';
      }else if(this.isTopGood(topicId, 'good')){
        //精华
        return '精华';
      }
    }
  }
}
</script>