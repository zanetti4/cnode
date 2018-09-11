<template>
  <section class="recentto">
    <Card title="最近创建的话题" :bordered="false" :dis-hover="true">
      <CellGroup>
        <article v-for="item in recentTo" :key="item.id">
          <Avatar shape="square" :src="item.author.avatar_url" size="small" />
          <span class="recentto-numbers">{{getReplyLen(item.id)}}/<span>{{getVisitLen(item.id)}}</span></span>
          <router-link 
          :to="{name: 'Detail', params: {id: item.id}}"
          class="recentto-tit ks-text-overflow"
          :title="item.title"
          >{{item.title}}</router-link>
          <!-- <router-link :to="{name: 'Detail', params: {id: item.id, hash: getLastReplyId(item.id)}}" class="recentto-reply" v-if="getLastReplyAvatar(item.id)">
            <Avatar shape="square" :src="getLastReplyAvatar(item.id)" size="small" />{{lastReplyTime(item.last_reply_at)}}
          </router-link> -->
          <!-- <a :href="`/detail/${item.id}${getLastReplyId(item.id)}`" class="recentto-reply" v-if="getLastReplyAvatar(item.id)">
            <Avatar shape="square" :src="getLastReplyAvatar(item.id)" size="small" />{{lastReplyTime(item.last_reply_at)}}
          </a> -->
          <a href="javascript:;" class="recentto-reply" v-if="getLastReplyAvatar(item.id)" @click="toDetailLastReply(item.id, getLastReplyId(item.id))">
            <Avatar shape="square" :src="getLastReplyAvatar(item.id)" size="small" />{{lastReplyTime(item.last_reply_at)}}
          </a>
        </article>
      </CellGroup>
      <a href="#" class="recentto-more" style="display: none;">
        查看更多<Icon type="ios-arrow-forward" />
      </a>
    </Card>
  </section>
</template>

<script>
//import time from '@/assets/js/time';
//import Vue from 'vue';
//import getRelativeTime from '@/assets/js/relative-time';

/* var eventHub = new Vue({
  name: 'RecentTopics',
  props: {
    recentTo: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  created(){
    eventHub.$on('relativeTime', function (anytime) { 
      that.lastReplyTime(anytime); 
    });
  },
  methods: {
    //计算最后回复的相对时间
    lastReplyTime(replyTime){
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
    } 
  }
}); */

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
      details: []
    };
  },
  async created(){
    /* this.details = this.recentTo.map(async topic => {
      let {data} = await this.$api.getDetail(topic.id);

      return data.data;
    }); */

    for(let i = 0; i < this.recentTo.length; i++){
      let {data} = await this.$api.getDetail(this.recentTo[i].id);

      this.details.push(data.data);
    };

    //console.log(this.details);
  },
  /* mounted(){
    this.$nextTick(() => {
      let lastReplies = document.querySelectorAll('.recentto-reply');

      lastReplies.forEach(item => {
        console.log(item.href);
        item.href = decodeURIComponent(item.href);
      });
    });
  }, */
  methods: {
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
    //获取最后回复者的头像
    getLastReplyAvatar(topicId){
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
          //console.log(encodeURIComponent('#'));

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
    getReplyLen(topicId){
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic){
        //该话题存在
        return topic.reply_count;
      }else{
        //该话题不存在
        return -1;
      }
    },
    //获取浏览数
    getVisitLen(topicId){
      let topic = this.details.find(obj => obj.id === topicId);

      if(topic){
        //该话题存在
        return topic.visit_count;
      }else{
        //该话题不存在
        return -1;
      }
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

//export default eventHub;
</script>

<style>
.recentto div.ivu-card-head, .recentre div.ivu-card-head {
  border-bottom: solid 1px #E5E5E5;
  background-color: #F6F6F6;
  padding: 10px;
  border-radius: 4px 4px 0 0; 
  -moz-border-radius: 4px 4px 0 0; 
  -webkit-border-radius: 4px 4px 0 0; 
}
.recentto div.ivu-card-body, .recentre div.ivu-card-body {padding: 0;}
.recentto article, .recentre article {
  padding: 10px;
  border-bottom: solid 1px #E5E5E5;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row;
  flex-flow: row;
}
.recentto article span.ivu-avatar, .recentre-avatar {
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
}
.recentto-numbers {
  -webkit-flex: 0 0 8%;
  flex: 0 0 8%;
  padding-left: 10px;
}
.recentto-numbers span {
  font-size: 12px;
  color: #B4B4B4;
}
.recentto-reply span {
  margin-right: 10px;
}
.recentto-tit:link, .recentto-tit:visited {
  -webkit-flex: 1 0 75%;
  flex: 1 0 75%;
  margin-left: 10px;
  color: #08C;
  padding-right: 10px;
}
.recentto-tit:hover {text-decoration: underline;}
.recentto-reply:link, .recentto-reply:visited {
  -webkit-flex: 0 0 11%;
  flex: 0 0 11%;
  font-size: 12px;
  color: #777;
}
.recentto-reply:hover, .recentto-more:hover {color: #08C;}
.recentto-more:link, .recentto-more:visited {
  display: block;
  line-height: 40px;
  padding-left: 10px;
}
.recentto-more i.ivu-icon {vertical-align: text-top;}
</style>
