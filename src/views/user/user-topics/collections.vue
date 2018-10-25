<template>
  <section class="recentto">
    <Card :bordered="false" :dis-hover="true">
      <Breadcrumb slot="title" class="collec-bread">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>{{getLoginname}} 收藏的话题</BreadcrumbItem>
      </Breadcrumb>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <CellGroup>
        <article v-for="item in curCollections" :key="item.id">
          <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
            <Avatar shape="square" :src="item.author.avatar_url" size="small" />
          </router-link>
          <span class="recentto-numbers">{{item.reply_count}}/<span>{{item.visit_count}}</span></span>
          <span v-if="item.top || item.good" class="recentto-tag" :class="{top: item.top, good: item.good}">{{topOrGoodCollec(item.id)}}</span>
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
      <Page :total="collection.length" :current="curPage" :page-size="pageSize" @on-change="changePage" class-name="mainpage" />
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Collections',
  data(){
    return {
      loginname: '',
      collection: [],
      details: [],
      curpage: 1,
      curCollections: [],
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

    let dataCollect = await this.$api.getCollection(loginname);

    this.collection = dataCollect.data.data;

    let maxPage = Math.ceil(this.collection.length/this.pageSize);

    if(page > maxPage){
      //page 超出最大页数
      page = 1;

      this.$router.push({
        query: {page: 1}
      });
    }

    this.curPage = +page;

    let start = (page - 1) * this.pageSize;

    this.curCollections = this.collection.slice(start, start + this.pageSize);
    this.getDetails();
  },
  methods: {
    //根据话题 id 获取话题详细信息
    async getDetails(){
      this.details = [];
      this.spinShow = true;

      for(let i = 0; i < this.curCollections.length; i++){
        let {data} = await this.$api.getDetail(this.curCollections[i].id);

        this.details.push(data.data);
      };

      this.spinShow = false;
    },
    //获取最后回复者的头像
    lastReplyAvatar(topicId){
      return this.$myMethods.getLastReplyAvatar(topicId, this.details);
    },
    //显示置顶或精华
    topOrGoodCollec(topicId){
      let topic = this.collection.find(item => item.id === topicId);

      if(topic){
        //该主题存在
        if(topic.top && topic.good){
          //优先显示置顶
          return '置顶';
        }else if(topic.top){
          //置顶
          return '置顶';
        }else if(topic.good){
          //精华
          return '精华';
        }
      }else{
        //该主题不存在
        return '';
      }
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

      this.curCollections = this.collection.slice(start, start + this.pageSize);
      this.getDetails();
    }
  }
}
</script>

<style>
.collec-bread {line-height: 1.5;}
.collec-bread>span:last-child {color: #999;}
</style>
