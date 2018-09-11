<template>
  <Row type="flex" justify="center" :gutter="16">
    <Col span="16" class-name="leftcol" :style="{padding: 0, 'background-color': 'white'}">
      <sub-nav></sub-nav>
      <list :dataList="list"></list>
      <!-- cNode 没有提供总数据条数 -->
      <Page :total="100" :current="curPage" @on-change="changePage" class-name="mainpage" />
    </Col>
    <Col span="5">
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
import navConfig from '@/router/navConfig';

export default {
  name: 'Main',
  components: {
    SubNav,
    List,
    Ads,
    NoReply,
    Friend,
    Client
  },
  data(){
    return {
      curPage: 1,
      tab: '',
      list: [],
      spinShow: true,
      navConfig/* ,
      noReplyList: [] */
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

      let {data} = await this.$api.getTopics(o);

      this.list = data.data;
    },
    //获取首页数据
    async getTopics(){
      let tab = this.$route.params.tab;
      //console.log(tab);
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
      //this.$emit('tab-to-main', tab);
      this.curPage = +page;
      //this.$emit('page-to-main', +page);
      this.spinShow = true;

      let {data} = await this.$api.getTopics({tab, page});

      this.list = data.data;
      this.spinShow = false;
    }/* ,
    //获取没有回复的数据
    async getNoReply(){
      let {data} = await this.$api.getTopics({
        tab: 'all', 
        limit: 50
      });

      //console.log(data.data.length);
      this.noReplyList = data.data.filter(item => item.reply_count === 0).slice(0, 5);
    } */
  }
}
</script>

<style>
.mainpage {padding: 10px;}
.mainpage li.ivu-page-item-active, .mainpage li.ivu-page-item:hover {border-color: #80BD01;}
.mainpage li.ivu-page-item-active a, .mainpage li.ivu-page-item-active:hover a, .mainpage li.ivu-page-item:hover a {color: #80BD01;}
</style>
