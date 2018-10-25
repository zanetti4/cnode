<template>
  <Row type="flex" justify="center" :gutter="16">
    <Col span="16" class-name="leftcol" :style="{padding: 0, 'background-color': 'white'}">
      <sub-nav></sub-nav>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <list :dataList="list"></list>
      <!-- cNode 没有提供总数据条数 -->
      <Page :total="100" :current="curPage" @on-change="changePage" class-name="mainpage" />
    </Col>
    <Col span="5">
      <author v-if="loginname" :authorName="loginname"></author>
      <publish-btn v-if="isLogin"></publish-btn>
      <ads></ads>
      <!-- <no-reply :noReplyList="noReplyList"></no-reply> -->
      <no-reply></no-reply>
      <friend></friend>
      <client></client>
    </Col>
  </Row>
</template>

<script>
import SubNav from './sub-nav';
import List from './list';
import Ads from '@/components/side/ads';
import NoReply from '@/components/side/no-reply';
import Friend from '@/components/side/friend';
import Client from '@/components/side/client';
import Author from '@/components/side/author';
import PublishBtn from '@/components/side/publish-btn';
import navConfig from '@/router/navConfig';
import Cookies from 'js-cookie';
// import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    SubNav,
    List,
    Ads,
    NoReply,
    Friend,
    Client,
    Author,
    PublishBtn
  },
  data(){
    return {
      curPage: 1,
      tab: '',
      list: [],
      spinShow: true,
      navConfig,
      // noReplyList: []
      userInfos: null
    };
  },
  created(){
    this.getTopics();
    //this.getNoReply();
  },
  watch: {
    $route(){
      this.getTopics();
    }
  },
  computed: {
    //判断是否登录
    isLogin(){
      let isLogin = Cookies.get('success');

      return isLogin;
    },
    //获取登录用户名
    loginname(){
      let loginname = Cookies.get('loginname');

      return loginname;
    }
  },
  methods: {
    //跳转分页
    async changePage(page){
      let queryPage = this.$route.query.page;

      if(!queryPage){
        //queryPage 不存在
        queryPage = 1;
      }

      let o = {
        page: page,
        tab: this.tab
      };

      this.$router.push({
        query: {page}
      });

      this.spinShow = true;

      let {data} = await this.$api.getTopics(o);

      this.list = data.data;
      this.spinShow = false;
    },
    //获取首页数据
    async getTopics(){
      let tab = this.$route.params.tab;
      let page = this.$route.query.page;

      if(!page){
        //page 不存在
        page = 1;
      }

      if(!tab){
        //tab 不存在
        tab = 'all';
      }

      let bl = this.navConfig.some(item => item.params.tab === tab);

      if(!bl){
        //tab 值不正确
        tab = 'all';
        this.$router.push({params: {tab}});
      }

      this.tab = tab;
      this.curPage = +page;
      this.spinShow = true;

      let {data} = await this.$api.getTopics({tab, page});

      this.list = data.data;
      this.spinShow = false;
    },
    //获取没有回复的数据
    /*async getNoReply(){
      let {data} = await this.$api.getTopics({
        tab: 'all', 
        limit: 50
      });

      this.noReplyList = data.data.filter(item => item.reply_count === 0).slice(0, 5);
    } */
  }
}
</script>