<template>
  <section class="recentto">
    <Card title="过往信息" :bordered="false" :dis-hover="true">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <CellGroup v-if="hasReadMes.length">
        <div class="newmes-item" v-for="message in curHasRead" :key="message.id">
          <router-link 
          :to="{name: 'User', params: {loginname: message.author.loginname}}"
          >{{message.author.loginname}}</router-link> 回复了你的话题 <router-link 
          :to="{name: 'Detail', params: {id: message.topic.id}}"
          >{{message.topic.title}}</router-link>
        </div>
      </CellGroup>
      <Page v-if="hasReadMes.length" :total="hasReadMes.length" :current="curPage" @on-change="changePage" :page-size="pageSize" class-name="mainpage" />
      <div v-else class="newmes-none">无消息</div>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'FormerMes',
  props: {
    hasReadMes: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      curpage: 1,
      curHasRead: [],
      spinShow: true
    };
  },
  watch: {
    hasReadMes: 'showCurCon'
  },
  created(){
    /* this.spinShow = true;

    let page = this.$route.query.page;

    if(!page){
      //page 不存在
      page = 1;
    }

    this.curPage = +page;

    let maxPage = Math.ceil(this.hasReadMes.length/this.pageSize);

    if(page > maxPage){
      //page 超出最大页数
      page = 1;

      this.$router.push({
        query: {page: 1}
      });
    }

    this.curPage = +page;

    let start = (page - 1) * this.pageSize;

    this.curHasRead = this.hasReadMes.slice(start, start + this.pageSize);
    // console.log(this.curHasRead);
    this.spinShow = false; */
  },
  computed: {
    //每页显示条数
    pageSize(){
      return 10;
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

      this.curHasRead = this.hasReadMes.slice(start, start + this.pageSize);
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

      let maxPage = Math.ceil(this.hasReadMes.length/this.pageSize);

      if(page > maxPage){
        //page 超出最大页数
        page = 1;

        this.$router.push({
          query: {page: 1}
        });
      }

      this.curPage = +page;

      let start = (page - 1) * this.pageSize;

      this.curHasRead = this.hasReadMes.slice(start, start + this.pageSize);
      // console.log(this.curHasRead);
      this.spinShow = false;
    }
  }
}
</script>