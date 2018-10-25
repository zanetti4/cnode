<template>
  <section class="recentto">
    <Card title="最近创建的话题" :bordered="false" :dis-hover="true">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <CellGroup>
        <article v-for="item in recentTo" :key="item.id">
          <Avatar shape="square" :src="item.author.avatar_url" size="small" />
          <span class="recentto-numbers">{{getReplyLen(item.id)}}/<span>{{getVisitLen(item.id)}}</span></span>
          <span v-if="isTopGood(item.id, 'top') || isTopGood(item.id, 'good')" class="recentto-tag" :class="{top: isTopGood(item.id, 'top'), good: isTopGood(item.id, 'good')}">{{topGood(item.id)}}</span>
          <router-link 
          :to="{name: 'Detail', params: {id: item.id}}"
          class="recentto-tit ks-text-overflow"
          :title="item.title"
          >{{item.title}}</router-link>
          <router-link :to="{name: 'Detail', params: {id: item.id}, hash: getLastReplyId(item.id)}" class="recentto-reply" v-if="lastReplyAvatar(item.id)">
            <Avatar shape="square" :src="lastReplyAvatar(item.id)" size="small" />{{lastReplyTime(item.last_reply_at)}}
          </router-link>
        </article>
      </CellGroup>
      <router-link :to="{name: 'Topics'}" class="recentto-more">
        查看更多<Icon type="ios-arrow-forward" />
      </router-link>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'RecentTopics',
  props: {
    recentTo: {
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
    /* recentTo(){
      this.getDetails();
    } */
    recentTo: 'getDetails'
  },
  methods: {
    //根据话题 id 获取话题详细信息
    async getDetails(){
      this.spinShow = true;

      for(let i = 0; i < this.recentTo.length; i++){
        let {data} = await this.$api.getDetail(this.recentTo[i].id);

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
    }  */

    lastReplyTime: function(replyTime){
      return this.$myMethods.getRelativeTime(replyTime);
    },
    //判断话题是否是置顶或精华
    /* isTopGood(topicId, topGood){
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic && topGood === 'top'){
        //该话题存在且获取置顶
        return topic.top;
      }else if(topic && topGood === 'good'){
        //该话题存在且获取精华
        return topic.good;
      }else{
        //该话题不存在或者关键词错误
        return false;
      }
    }, */
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
    },
    //获取最后回复者的头像
    /* getLastReplyAvatar(topicId){
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
    }, */

    lastReplyAvatar(topicId){
      return this.$myMethods.getLastReplyAvatar(topicId, this.details);
    },
    //获取最后一条回复的 id
    getLastReplyId(topicId){
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic){
        //该话题存在
        let allReplies = topic.replies;

        if(allReplies.length > 0){
          //话题有回复
          let hash = `#${allReplies[allReplies.length - 1].id}`;

          return hash;
        }else{
          //话题没回复
          return '';
        }
      }else{
        //该话题不存在
        return '';
      }
    },
    //获取回复数
    /* getReplyLen(topicId){
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic){
        //该话题存在
        return topic.reply_count;
      }else{
        //该话题不存在
        return -1;
      }
    }, */
    getReplyLen(topicId){
      return this.$myMethods.getNumbers(topicId, this.details, 'reply');
    },
    //获取浏览数
    /* getVisitLen(topicId){
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic){
        //该话题存在
        return topic.visit_count;
      }else{
        //该话题不存在
        return -1;
      }
    }, */
    getVisitLen(topicId){
      return this.$myMethods.getNumbers(topicId, this.details, 'visit');
    },
    //跳转到话题页的最后一条评论处
    toDetailLastReply(topicId, hash){
      this.$router.push({
        name: 'Detail',
        params: {
          id: topicId, 
          hash
        }
      });
    }
  }
}
</script>

<style>
.recentto-more:link, .recentto-more:visited {
  display: block;
  line-height: 40px;
  padding-left: 10px;
}
.recentto-more i.ivu-icon {vertical-align: text-top;}
</style>
