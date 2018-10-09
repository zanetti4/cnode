<template>
  <section class="recentto">
    <Card :bordered="false" :dis-hover="true">
      <Breadcrumb slot="title" class="collec-bread">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>新消息</BreadcrumbItem>
      </Breadcrumb>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <CellGroup v-if="hasNotRead.length">
        <div class="newmes-item" v-for="message in curNotRead" :key="message.id">
          <router-link 
          :to="{name: 'User', params: {loginname: message.author.loginname}}"
          >{{message.author.loginname}}</router-link> 回复了你的话题 <router-link 
          :to="{name: 'Detail', params: {id: message.topic.id}}"
          >{{message.topic.title}}</router-link>
        </div>
      </CellGroup>
      <Page v-if="hasNotRead.length" :total="hasNotRead.length" :current="curPage" @on-change="changePage" :page-size="pageSize" class-name="mainpage" />
      <div v-else class="newmes-none">无消息</div>
    </Card>
  </section>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'NewMes',
  props: {
    hasNotRead: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      curpage: 1,
      curNotRead: [],
      spinShow: true
    };
  },
  watch: {
    hasNotRead: 'showCurCon'
  },
  created(){
    /* this.spinShow = true;

    let page = this.$route.query.page;

    if(!page){
      //page 不存在
      page = 1;
    }

    this.curPage = +page;

    let maxPage = Math.ceil(this.hasNotRead.length/this.pageSize);

    if(page > maxPage){
      //page 超出最大页数
      page = 1;

      this.$router.push({
        query: {page: 1}
      });
    }

    this.curPage = +page;

    let start = (page - 1) * this.pageSize;

    this.curNotRead = this.hasNotRead.slice(start, start + this.pageSize);
    this.spinShow = false; */
    if(this.mesCount !== 0){
      //有未读消息
      let accesstoken = Cookies.get('accesstoken');

      this.$store.dispatch('markAllAc', {accesstoken});
    }
  },
  computed: {
    //每页显示条数
    pageSize(){
      return 10;
    },
    //从 vuex 获取未读消息数
    mesCount(){
      return this.$store.state.notReadCount;
    }
  },
  methods: {
    //跳转分页
    changePage(page){
      this.spinShow = true;

      let queryPage = this.$route.query.page;

      if(!queryPage){
        //queryPage 不存在
        queryPage = 1;
      }

      this.$router.push({
        query: {page}
      });
      
      let start = (page - 1) * this.pageSize;

      this.curNotRead = this.hasNotRead.slice(start, start + this.pageSize);
      this.spinShow = false;
    },
    //截取本页内容
    showCurCon(){
      this.spinShow = true;

      let page = this.$route.query.page;

      if(!page){
        //page 不存在
        page = 1;
      }

      this.curPage = +page;

      let maxPage = Math.ceil(this.hasNotRead.length/this.pageSize);

      if(page > maxPage){
        //page 超出最大页数
        page = 1;

        this.$router.push({
          query: {page: 1}
        });
      }

      this.curPage = +page;

      let start = (page - 1) * this.pageSize;

      this.curNotRead = this.hasNotRead.slice(start, start + this.pageSize);
      this.spinShow = false;
    }
  }
}
</script>

<style>
.newmes-item {
  padding: 10px;
  border-bottom: solid 1px #E5E5E5;
}
.newmes-item a:link, .newmes-item a:visited {color: #08C;}
.newmes-item a:hover {text-decoration: underline;}
.newmes-none {
  padding-left: 10px;
  line-height: 4;
}
</style>
