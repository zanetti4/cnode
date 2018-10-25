<template>
  <section class="userinfo" v-wechat-title="$route.meta.title">
    <Breadcrumb>
      <BreadcrumbItem to="/">主页</BreadcrumbItem>
    </Breadcrumb>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="userinfo-con">
      <div class="demo-avatar">
        <Avatar shape="square" :src="user.avatar_url" size="large" /><span class="userinfo-con-name">{{user.loginname}}</span>
      </div>
      <div>{{user.score}} 积分</div>
      <router-link :to="{name: 'Collections'}" v-if="collection.length">{{collection.length}}个话题收藏</router-link>
      <div class="userinfo-con-time">
        注册时间 {{signUp}}
      </div>
    </div>
  </section>
</template>

<script>
import time from '@/assets/js/time';

export default {
  name: 'UserInfo',
  data(){
    return {
      user: {},
      collection: [],
      spinShow: true
    };
  },
  created(){
    this.getUserCollection();
  },
  watch: {
    $route(){
      this.getUserCollection();
    }
  },
  computed: {
    //注册时间
    signUp(){
      if(this.user.create_at){
        //注册时间已拿到
        /* let obj = time.getTime(this.user.create_at, new Date().toISOString());

        switch(true){
          case obj.year !== 0:
            return `${obj.year} 年前`;
            break;
          case obj.month !== 0:
            return `${obj.month} 个月前`;
            break;
          case obj.day !== 0:
            return `${obj.day} 天前`;
            break;
          case obj.hour !== 0:
            return `${obj.hour} 小时前`;
            break;
          case obj.minute !== 0:
            return `${obj.minute} 分钟前`;
            break;
          default:
            return '刚刚';
        }; */

        return this.$myMethods.getRelativeTime(this.user.create_at);
      }
    }
  },
  methods: {
    //发送请求：用户信息，并向上传递；用户所收藏的主题
    async getUserCollection(){
      this.spinShow = true;

      let loginname = this.$route.params.loginname;
      let {data} = await this.$api.getUser(loginname);

      this.user = data.data;
      
      if(this.$route.name === 'User'){
        //用户详情页
        this.$route.meta.title = `@${this.user.loginname} 的个人主页 - CNode技术社区`;
      }
      
      this.$emit('userinfo-to-user', this.user);

      let dataCollect = await this.$api.getCollection(loginname);

      this.collection = dataCollect.data.data;
      this.spinShow = false;
    }
  }
}
</script>

<style>
.userinfo div.ivu-breadcrumb>span:last-child .ivu-breadcrumb-item-separator {
  display: inline;
}
.userinfo-con {
  padding: 10px;
  font-size: 14px;
  line-height: 2;
}
.userinfo-con-name {
  color: #778087;
  vertical-align: middle;
  margin-left: 10px;
}
.userinfo-con a:link, .userinfo-con a:visited {color: #778087;}
.userinfo-con a:hover {text-decoration: underline;}
.userinfo-con-time {color: #ABABAB;}
</style>