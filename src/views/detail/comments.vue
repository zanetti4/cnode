<template>
  <section class="comments">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Card :title="numReplies" :bordered="false" :dis-hover="true">
      <CellGroup class="comments-group">
        <Row type="flex" justify="space-around" class="code-row-bg comments-row" v-for="(item, index) in allReplies" :key="item.id" :class="{'comments-rowhl': item.ups.length > 2}" :id="item.id">
          <Col span="1">
            <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
              <Avatar shape="square" :src="item.author.avatar_url" />
            </router-link>
          </Col>
          <Col span="22" class-name="comments-row-right">
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
                <Icon type="ios-undo-outline" size="20" title="回复" @click="replyComment(item.id, item.renderReply, item.author.loginname)" />
              </Col>
            </Row>
            <!-- <p v-html="item.content" class="comments-row-con"></p> -->
            <!-- <div @mouseenter="session">
              <vue-markdown class="comments-row-con" :source="item.content"></vue-markdown>
            </div> -->
            <vue-markdown class="comments-row-con" :source="item.content" @mouseover.native="session($event, item.author.loginname, item.reply_id)" @mouseout.native="hideSession($event, item.author.loginname)"></vue-markdown>
            <transition name="comreply">
              <form class="comments-row-reply" v-if="item.renderReply" @submit.prevent="reply(item.id, item.author.loginname, $event)">
                <mavon-editor v-model="formData['value' + item.id]" :subfield="formData.subfield" :toolbars="formData.toolbars" class="reply-form-mavon"></mavon-editor>
                <Button type="primary" html-type="submit" :loading="formData['loading' + item.id]">{{btnText(item.id)}}</Button>
              </form>
            </transition>
          </Col>
        </Row>
        <transition name="comsession">
          <session-poptip v-if="showSession" :style="{'top': sessionTop + 'px', 'left': sessionLeft + 'px'}" :origin="originalReply" @mouseenter.native="showPoptip" @mouseleave.native="hidePoptip"></session-poptip>
        </transition>
      </CellGroup>
    </Card>
  </section>
</template>

<script>
import time from '@/assets/js/time';
import sessionPoptip from './session-poptip';
import Cookies from 'js-cookie';
import axios from 'axios';
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'Comments',
  components: {VueMarkdown, sessionPoptip},
  props: {
    allReplies: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      formData: {
        // value: '',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          quote: true, // 引用
          ul: true, // 无序列表
          ol: true, // 有序列表
          link: true, // 链接
          // imagelink: true, // 图片链接
          help: true, // 帮助
          preview: true, // 预览
          fullscreen: true // 全屏编辑
        },
        subfield: false
      },
      newReplyCom: 0,
      showSession: false,
      sessionTop: 0,
      sessionLeft: 0,
      originalReply: {},
      timerPoptip: null,
      spinShow: true
    };
  },
  watch: {
    allReplies: {
      deep: true,
      handler(){
        this.spinShow = false;
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
            this.spinShow = true;

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
    },
    //点击回复图标
    replyComment(commentId, isRenderReply, loginname){
      let accesstoken = Cookies.get('accesstoken');
      
      if(accesstoken){
        //登录了
        this.spinShow = true;

        if(isRenderReply === undefined){
          //首次点击回复图标
          Vue.set(this.formData, 'value' + commentId, '@' + loginname + ' ');
        }

        this.$emit('add-render', commentId);
      }else{
        //没登录
        alert('请先登录，登录后即可回复。');
      }
    },
    //点击回复按钮
    async reply(commentId, loginname, e){
      let content = this.formData['value' + commentId].trim();

      if(content && content !== '@' + loginname){
        //有内容
        Vue.set(this.formData, 'loading' + commentId, true);

        let accesstoken = Cookies.get('accesstoken');
        let topicId = this.$route.params.id;

        let {data} = await this.$api.reply(topicId, {
          accesstoken,
          content,
          reply_id: commentId
        });
        
        if(data.success){
          //评论发布成功
          this.spinShow = true;
          this.newReplyCom++;
          this.$emit('new-reply-comment', this.newReplyCom);
        }else{
          //评论发布失败
          alert('评论发布失败');
        }

        this.formData['loading' + commentId] = false;
      }else{
        //没内容
        this.$nextTick(() => {
          let textarea = e.target.querySelector('.auto-textarea-input');

          textarea.focus();
        });
      }
    },
    //按钮显示文字
    btnText(commentId){
      if(this.formData['loading' + commentId]){
        //该按钮处于 loading 状态
        return 'loading...';
      }else{
        //该按钮不处于 loading 状态
        return '回复';
      }
    },
    //出现会话层
    session(e, loginname, replyId){
      let target = e.target;
      let indexAt = target.innerText.indexOf('@');
      let myLoginname = Cookies.get('loginname');

      if(target.nodeName === 'A' && indexAt === 0 && myLoginname === loginname){
        //鼠标悬停的是以@开头的链接，并且这条评论是我发的
        clearTimeout(this.timerPoptip);
        this.sessionTop = target.offsetTop - 20;
        this.sessionLeft = target.offsetLeft + target.offsetWidth + 7;
        this.showSession = true;

        let reply = this.allReplies.find(reply => reply.id === replyId);

        if(reply){
          //找到原评论
          this.originalReply = reply;
        }
      }
    },
    //隐藏会话层
    hideSession(e, loginname){
      let target = e.target;
      let indexAt = target.innerText.indexOf('@');
      let myLoginname = Cookies.get('loginname');

      if(target.nodeName === 'A' && indexAt === 0 && myLoginname === loginname){
        //鼠标悬停的是以@开头的链接，并且这条评论是我发的
        this.timerPoptip = setTimeout(() => {
          this.showSession = false;
        }, 500);
      }
    },
    //鼠标悬停在会话层
    showPoptip(){
      // console.log(1111);
      clearTimeout(this.timerPoptip);
      this.showSession = true;
    },
    //鼠标移出会话层
    hidePoptip(){
      this.timerPoptip = setTimeout(() => {
        this.showSession = false;
      }, 500);
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
.comments-row-up i:hover, .comments-row-con a:link, .comments-row-con a:visited {color: #08C;}
.comments-row-con a:hover {text-decoration: underline;}
.comments-row-con div.markdown-text p {
  font-size: 14px;
  line-height: 1.8;
  padding-top: 5px;
}
.comments-row-con {
  font-size: 14px;
  line-height: 1.8;
  padding-top: 5px;
}
.comments-group {
  position: relative;
}
.comments-row-reply {
  margin-top: 10px;
  padding-bottom: 10px;
  overflow: hidden;
}
.comreply-enter-active, .comreply-leave-active {
  transition: height .5s linear, margin-top .5s linear, padding-bottom .5s linear;
}
.comreply-enter, .comreply-leave-to /* .comreply-leave-active below version 2.1.8 */ {
  height: 0;
  margin-top: 0;
  padding-bottom: 0;
}
.comsession-enter-active, .comsession-leave-active {
  transition: opacity .5s linear;
}
.comsession-enter, .comsession-leave-to {
  opacity: 0;
}
.comments-row-right {position: static;}
</style>
