<template>
  <section class="recentto">
    <Card :bordered="false" :dis-hover="true">
      <Breadcrumb slot="title" class="collec-bread">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>{{getLoginname}} 创建的话题</BreadcrumbItem>
      </Breadcrumb>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <CellGroup>
        <article v-for="item in curRecentTopics" :key="item.id">
          <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
            <Avatar shape="square" :src="item.author.avatar_url" size="small" />
          </router-link>
          <span class="recentto-numbers">{{getReplyLen(item.id)}}/<span>{{getVisitLen(item.id)}}</span></span>
          <span v-if="isTopGood(item.id, 'top') || isTopGood(item.id, 'good')" class="recentto-tag" :class="{top: isTopGood(item.id, 'top'), good: isTopGood(item.id, 'good')}">{{topGood(item.id)}}</span>
          <router-link 
          :to="{name: 'Detail', params: {id: item.id}}"
          class="recentto-tit ks-text-overflow"
          :title="item.title"
          >{{item.title}}</router-link>
          <a href="#" class="recentto-reply" v-if="lastReplyAvatar(item.id)">
            <Avatar shape="square" :src="lastReplyAvatar(item.id)" size="small" />{{lastReplyTime(item.last_reply_at)}}
          </a>
        </article>
      </CellGroup>
      <Page :total="recentTopics.length" :current="curPage" @on-change="changePage" :page-size="pageSize" class-name="mainpage" />
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Topics',
  data(){
    return {
      details: [],
      curpage: 1,
      user: {},
      recentTopics: [],
      curRecentTopics: [],
      spinShow: true
    };
  },
  computed: {
    //获取用户名
    getLoginname(){
      let loginname = this.$route.params.loginname;

      return loginname;
    },
    //每页显示条数
    pageSize(){
      return 10;
    }
  },
  async created(){
    let loginname = this.$route.params.loginname;
    let page = this.$route.query.page;

    if(!page){
      //page 不存在
      page = 1;
    }

    this.curPage = +page;

    let {data} = await this.$api.getUser(loginname);

    this.user = data.data;
    this.recentTopics = this.user.recent_topics;

    let maxPage = Math.ceil(this.recentTopics.length/this.pageSize);

    if(page > maxPage){
      //page 超出最大页数
      page = 1;

      this.$router.push({
        query: {page: 1}
      });
    }

    this.curPage = +page;

    let start = (page - 1) * this.pageSize;

    this.curRecentTopics = this.recentTopics.slice(start, start + this.pageSize);
    //不能拿到用户创建的所有主题
    this.getDetails();
  },
  methods: {
    //根据话题 id 获取话题详细信息
    async getDetails(){
      this.details = [];
      this.spinShow = true;

      for(let i = 0; i < this.curRecentTopics.length; i++){
        let {data} = await this.$api.getDetail(this.curRecentTopics[i].id);

        this.details.push(data.data);
      };

      this.spinShow = false;
    },
    //获取最后回复者的头像
    lastReplyAvatar(topicId){
      return this.$myMethods.getLastReplyAvatar(topicId, this.details);
    },
    //计算最后回复的相对时间
    lastReplyTime: function(replyTime){
      return this.$myMethods.getRelativeTime(replyTime);
    },
    //跳转分页
    async changePage(page){
      let queryPage = this.$route.query.page;

      if(!queryPage){
        //queryPage 不存在
        queryPage = 1;
      }

      this.$router.push({
        query: {page}
      });
      
      let start = (page - 1) * this.pageSize;

      this.curRecentTopics = this.recentTopics.slice(start, start + this.pageSize);
      this.getDetails();
    },
    //获取回复数
    getReplyLen(topicId){
      return this.$myMethods.getNumbers(topicId, this.details, 'reply');
    },
    //获取浏览数
    getVisitLen(topicId){
      return this.$myMethods.getNumbers(topicId, this.details, 'visit');
    },
    //判断话题是否是置顶或精华
    isTopGood(topicId, topGood){
      return this.$myMethods.topOrGood(topicId, topGood, this.details);
    },
    //置顶或精华
    topGood(topicId){
      if(this.isTopGood(topicId, 'top') && this.isTopGood(topicId, 'good')){
        //优先显示置顶
        return '置顶';
      }else if(this.isTopGood(topicId, 'top')){
        //置顶
        return '置顶';
      }else if(this.isTopGood(topicId, 'good')){
        //精华
        return '精华';
      }
    }
  }
}
</script>