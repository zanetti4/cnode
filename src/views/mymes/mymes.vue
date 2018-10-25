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

    this.notRead = data.data.hasnot_read_messages;
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