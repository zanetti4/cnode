<template>
  <section class="recentre">
    <Card title="最近参与的话题" :bordered="false" :dis-hover="true">
      <CellGroup>
        <article v-for="item in recentRe" :key="item.id">
          <a href="#" class="recentre-avatar">
            <Avatar shape="square" :src="item.author.avatar_url" size="small" />
          </a>
          <a href="#" class="recentto-tit ks-text-overflow" :title="item.title">{{item.title}}</a>
          <a href="#" class="recentto-reply">
            <Avatar shape="square" :src="item.author.avatar_url" size="small" />{{lastReplyTime(item.last_reply_at)}}
            <!-- <Avatar shape="square" :src="item.author.avatar_url" size="small" />{{vm.lastReplyTime(item.last_reply_at)}} -->
          </a>
        </article>
      </CellGroup>
      <a href="#" class="recentto-more">
        查看更多<Icon type="ios-arrow-forward" />
      </a>
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
}
</script>