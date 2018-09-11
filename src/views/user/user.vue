<template>
  <Row type="flex" justify="center" :gutter="16" class-name="pt-15">
    <Col span="16" :style="{padding: 0}">
      <user-info @userinfo-to-user="userInfoUser"></user-info>
      <recent-topics :recentTo="recentTopics" v-if="recentTopics.length"></recent-topics>
      <recent-replies :recentRe="recentReplies" v-if="false"></recent-replies>
    </Col>
    <Col span="5">
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

export default {
  name: 'User',
  components: {
    UserInfo,
    RecentTopics,
    RecentReplies,
    Ads,
    Friend,
    Client
  },
  data(){
    return {
      recentTopics: [],
      recentReplies: []
    };
  },
  methods: {
    //接收用户信息
    userInfoUser(user){
      this.recentTopics = user.recent_topics.slice(0, 5);
      //console.log(this.recentTopics);
      this.recentReplies = user.recent_replies.slice(0, 5);
    }
  }
}
</script>