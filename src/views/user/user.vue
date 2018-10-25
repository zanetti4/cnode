<template>
  <Row type="flex" justify="center" :gutter="16" class-name="pt-15">
    <Col span="16" :style="{padding: 0}">
      <user-info @userinfo-to-user="userInfoUser" v-show="$route.name === 'User'"></user-info>
      <recent-topics :recentTo="recentTopics" v-if="recentTopics.length && $route.name === 'User'"></recent-topics>
      <recent-replies :recentRe="recentReplies" v-if="recentReplies.length && $route.name === 'User'"></recent-replies>
      <router-view></router-view>
    </Col>
    <Col span="5">
      <author :authorName="loginname" v-if="loginname.length"></author>
      <publish-btn v-if="isLogin"></publish-btn>
      <ads></ads>
      <friend></friend>
      <client></client>
    </Col>
  </Row>
</template>

<script>
import UserInfo from './user-info';
import RecentTopics from './recent-topics';
import RecentReplies from './recent-replies';
import Ads from '@/components/side/ads';
import Friend from '@/components/side/friend';
import Client from '@/components/side/client';
import Author from '@/components/side/author';
import PublishBtn from '@/components/side/publish-btn';
import Cookies from 'js-cookie';

export default {
  name: 'User',
  components: {
    UserInfo,
    RecentTopics,
    RecentReplies,
    Ads,
    Friend,
    Client,
    Author,
    PublishBtn
  },
  data(){
    return {
      recentTopics: [],
      recentReplies: [],
      loginname: ''
    };
  },
  computed: {
    //判断是否登录
    isLogin(){
      let isLogin = Cookies.get('success');

      return isLogin;
    }
  },
  methods: {
    //接收用户信息
    userInfoUser(user){
      this.recentTopics = user.recent_topics.slice(0, 5);
      this.recentReplies = user.recent_replies.slice(0, 5);
      this.loginname = user.loginname;
    }
  }
}
</script>