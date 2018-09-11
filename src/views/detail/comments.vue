<template>
  <section class="comments">
    <Card :title="numReplies" :bordered="false" :dis-hover="true">
      <CellGroup>
        <Row type="flex" justify="space-around" class="code-row-bg comments-row" v-for="(item, index) in allReplies" :key="item.id" :class="{'comments-rowhl': item.ups.length > 2}">
          <Col span="1">
            <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}" :name="item.id">
              <Avatar shape="square" :src="item.author.avatar_url" />
            </router-link>
          </Col>
          <Col span="22">
            <Row>
              <Col span="22" class-name="comments-row-nft">
                <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
                  {{item.author.loginname}}
                </router-link>
                <span>{{index + 1}}楼•{{replyTime(item.create_at)}}</span>
              </Col>
              <Col span="2" class-name="comments-row-up">
                <Icon type="ios-thumbs-up-outline" size="18" /> {{item.ups.length}}
              </Col>
            </Row>
            <p v-html="item.content" class="comments-row-con"></p>
          </Col>
        </Row>
      </CellGroup>
    </Card>
  </section>
</template>

<script>
import time from '@/assets/js/time';

export default {
  name: 'Comments',
  props: {
    allReplies: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  computed: {
    //回复数
    numReplies(){
      return `${this.allReplies.length} 回复`;
    }
  },
  mounted(){
    this.$nextTick(() => {
      let ups = document.querySelectorAll('.comments-row-up');

      for(let i = 0; i < ups.length; i++){
        let icon = ups[i].querySelector('i');

        icon.title = '喜欢';
      };
    });
  },
  methods: {
    //计算回复的相对时间
    replyTime(replyCreateTime){
      let obj = time.getTime(replyCreateTime, new Date().toISOString());

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

<style>
.comments {
  background-color: white; 
  border-radius: 4px; 
  -moz-border-radius: 4px; 
  -webkit-border-radius: 4px;
}
.comments div.ivu-card-body {padding: 0;}
.comments-row {
  border-top: solid 1px #F0F0F0;
  padding: 10px 0 5px;
}
.comments-rowhl {background-color: #F4FCF0;}
.comments-row-nft a:link, .comments-row-nft a:visited {
  color: #08C;
  margin-right: 5px;
}
.comments-row-nft a:hover {text-decoration: underline;}
.comments-row-nft span {font-size: 12px;}
.comments-row-up i {
  vertical-align: middle;
  cursor: not-allowed;
  color: black;
}
.comments-row-up i:hover {color: #08C;}
.comments-row-con div.markdown-text p {
  font-size: 14px;
  line-height: 1.8;
  padding-top: 5px;
}
</style>
