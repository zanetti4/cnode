<template>
  <section class="comments">
    <Card :title="numReplies" :bordered="false" :dis-hover="true">
      <CellGroup>
        <Row type="flex" justify="space-around" class="code-row-bg comments-row" v-for="(item, index) in allReplies" :key="item.id" :class="{'comments-rowhl': item.ups.length > 2}" :id="item.id">
          <Col span="1">
            <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
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
                <span class="comments-row-nft-author" v-if="isAuthor(item.author.loginname)">作者</span>
              </Col>
              <Col span="2" class-name="comments-row-up">
                <Icon type="ios-thumbs-up-outline" size="18" @click="up(item.id, item.author.loginname)" :class="{'ivu-icon-ios-thumbs-up': item.is_uped}" /> {{item.ups.length}}
              </Col>
            </Row>
            <!-- <p v-html="item.content" class="comments-row-con"></p> -->
            <vue-markdown class="comments-row-con" :source="item.content"></vue-markdown>
          </Col>
        </Row>
      </CellGroup>
    </Card>
  </section>
</template>

<script>
import time from '@/assets/js/time';
import Cookies from 'js-cookie';
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

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
  components: {VueMarkdown},
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
    },
    //点赞
    up(id, loginname){
      let accesstoken = Cookies.get('accesstoken');
      
      if(accesstoken){
        //登录了
        let myId = Cookies.get('id');
        let myLoginname = Cookies.get('loginname');

        /* axios.post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {accesstoken}).then((res) => {
          //console.log(res.data);
          this.$emit('up-to-detail', {
            id,
            action: res.data.action,
            myId
          });
        }); */

        if(myLoginname === loginname){
          //给自己点赞
          alert('呵呵，不能帮自己点赞。');
        }else{
          //给别人点赞
          this.$api.upDown(id, {accesstoken}).then(res => {
            this.$emit('up-to-detail', {
              id,
              action: res.data.action,
              myId
            });
          }, error => {
            console.log(error);
          });
        }
      }else{
        //没登录
        alert('请先登录，登录后即可点赞。');
      }
    },
    /* async up(id){
      let accesstoken = Cookies.get('accesstoken');
      
      if(accesstoken){
        //登录了
        let {data} = await this.$api.up(id, {accesstoken});

        console.log(data);
      }else{
        //没登录
        alert('请先登录，登录后即可点赞。');
      }
    } */
    //是不是作者
    isAuthor(loginname){
      let myLoginname = Cookies.get('loginname');

      return myLoginname === loginname ? true : false;
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
.comments-row-nft span.comments-row-nft-author {
  color: white;
  background-color: #80BD01;
  padding: 0 3px;
  display: inline-block;
}
.comments-row-up i {
  vertical-align: middle;
  cursor: pointer;
  color: black;
}
.comments-row-up i:hover {color: #08C;}
.comments-row-con div.markdown-text p {
  font-size: 14px;
  line-height: 1.8;
  padding-top: 5px;
}
</style>
