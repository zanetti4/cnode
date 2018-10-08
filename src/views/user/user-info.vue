<template>
  <section class="userinfo">
    <Breadcrumb>
      <BreadcrumbItem to="/">主页</BreadcrumbItem>
    </Breadcrumb>
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
      collection: []
    };
  },
  created(){
    /* //发送请求：用户信息，并向上传递
    let loginname = this.$route.params.loginname;
    let {data} = await this.$api.getUser(loginname);

    this.user = data.data;
    this.$emit('userinfo-to-user', this.user);

    //发送请求：用户所收藏的主题
    let dataCollect = await this.$api.getCollection(loginname);

    this.collection = dataCollect.data.data;
    //console.log(dataCollect.data.data); */

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
        let obj = time.getTime(this.user.create_at, new Date().toISOString());

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
        };
      }
    }
  },
  methods: {
    //发送请求：用户信息，并向上传递；用户所收藏的主题
    async getUserCollection(){
      let loginname = this.$route.params.loginname;
      let {data} = await this.$api.getUser(loginname);

      this.user = data.data;
      this.$emit('userinfo-to-user', this.user);

      let dataCollect = await this.$api.getCollection(loginname);

      this.collection = dataCollect.data.data;
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