<template>
  <Row type="flex" justify="center" :gutter="16" class-name="pt-15">
    <Col span="16" :style="{padding: 0}">
      <new-mes :hasNotRead="notRead"></new-mes>
      <former-mes :hasReadMes="hasRead"></former-mes>
    </Col>
    <Col span="5">
      <author :authorName="loginname" v-if="loginname.length"></author>
      <publish-btn></publish-btn>
      <ads></ads>
      <friend></friend>
      <client></client>
    </Col>
  </Row>
</template>

<script>
import Ads from '@/components/side/ads';
import Friend from '@/components/side/friend';
import Client from '@/components/side/client';
import Author from '@/components/side/author';
import PublishBtn from '@/components/side/publish-btn';
import NewMes from './new-mes';
import FormerMes from './former-mes';
import Cookies from 'js-cookie';

export default {
  name: 'Mymes',
  data(){
    return {
      notRead: [],
      hasRead: []
    };
  },
  components: {
    Ads,
    Friend,
    Client,
    Author,
    PublishBtn,
    NewMes,
    FormerMes
  },
  async created(){
    let accesstoken = Cookies.get('accesstoken');
    let {data} = await this.$api.getMessages({accesstoken});

    // console.log(data);
    this.notRead = data.data.hasnot_read_messages;
    /* this.notRead = [
      {
        id: "543fb7abae523bbc80412b26",
        type: "at",
        has_read: false,
        author: {
          loginname: "alsotang1",
          avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
        },
        topic: {
          id: "542d6ecb9ecb3db94b2b3d0f",
          title: "adfadfadfasdf",
          last_reply_at: "2014-10-18T07:47:22.563Z"
        },
        reply: {
          id: "543fb7abae523bbc80412b24",
          content: "[@alsotang](/user/alsotang) 哈哈",
          ups: [ ],
          create_at: "2014-10-16T12:18:51.566Z"
        }
      },
      {
        id: "543fb7abae523bbc80412b26",
        type: "at",
        has_read: false,
        author: {
          loginname: "alsotang2",
          avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
        },
        topic: {
          id: "542d6ecb9ecb3db94b2b3d0f",
          title: "adfadfadfasdf",
          last_reply_at: "2014-10-18T07:47:22.563Z"
        },
        reply: {
          id: "543fb7abae523bbc80412b24",
          content: "[@alsotang](/user/alsotang) 哈哈",
          ups: [ ],
          create_at: "2014-10-16T12:18:51.566Z"
        }
      },
      {
        id: "543fb7abae523bbc80412b26",
        type: "at",
        has_read: false,
        author: {
          loginname: "alsotang3",
          avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
        },
        topic: {
          id: "542d6ecb9ecb3db94b2b3d0f",
          title: "adfadfadfasdf",
          last_reply_at: "2014-10-18T07:47:22.563Z"
        },
        reply: {
          id: "543fb7abae523bbc80412b24",
          content: "[@alsotang](/user/alsotang) 哈哈",
          ups: [ ],
          create_at: "2014-10-16T12:18:51.566Z"
        }
      }
    ]; */
    this.hasRead = data.data.has_read_messages;
  },
  computed: {
    //获取我的用户名
    loginname(){
      let myLoginname = Cookies.get('loginname');

      return myLoginname;
    }
  }
}
</script>