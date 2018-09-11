<template>
  <Row type="flex" justify="center" :gutter="16" class-name="pt-15">
    <Col span="16" class-name="leftcol" :style="{padding: 0}">
      <cnode-article @get-user="getUserDe" @get-replies="getRepliesDe"></cnode-article>
      <comments :allReplies="replies"></comments>
    </Col>
    <Col span="5">
      <author :authorName="loginname" v-if="loginname.length" @user-to-detail="otherTopics"></author>
      <ads></ads>
      <others :otherTopics="recentTopics"></others>
      <no-reply></no-reply>
    </Col>
  </Row>
</template>

<script>
import CnodeArticle from './cnode-article';
import Comments from './comments';
import Ads from '@/components/side/ads';
import NoReply from '@/components/side/no-reply';
import Author from '@/components/side/author';
import Others from '@/components/side/others';

export default {
  name: 'Detail',
  components: {
    CnodeArticle,
    Ads,
    NoReply,
    Author,
    Others,
    Comments
  },
  data(){
    return {
      loginname: '',
      recentTopics: [],
      userData: {},
      replies: []
    };
  },
  watch: {
    $route(){
      this.otherTopics(this.userData);
    }
  },
  methods: {
    //获取作者注册名
    getUserDe(loginname){
      this.loginname = loginname;
      //console.log(this.loginname);
    },
    //获取回复
    getRepliesDe(replies){
      this.replies = replies;
    },
    //获取作者其它话题
    otherTopics(user){
      let id = this.$route.params.id;
      let recentTo = user.recent_topics;
      let others = recentTo.slice(0, 5);
      let index = others.findIndex(topic => topic.id === id);
      //console.log(index);
      
      if(index !== -1){
        //当前浏览的主题和其它话题重复了
        if(recentTo.length > 5){
          //其它话题大于5条，才有替补
          let substitution = recentTo[5];

          others.splice(index, 1, substitution);
        }else{
          //其它话题小于等于5条，没有替补
          others.splice(index, 1);
        }
      }

      this.recentTopics = others;
      this.userData = user;
    }
  }
}
</script>