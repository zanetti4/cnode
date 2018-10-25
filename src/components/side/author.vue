<template>
  <section class="author" v-if="user.loginname">
    <Card :title="cardTit" :bordered="false" :dis-hover="true">
      <div class="demo-avatar">
        <router-link :to="{name: 'User', params: {loginname: user.loginname}}">
          <Avatar shape="square" :src="user.avatar_url" size="large" />
        </router-link>
        <span class="author-name">
          <router-link :to="{name: 'User', params: {loginname: user.loginname}}">{{user.loginname}}</router-link>
        </span>
      </div>
      <div class="author-score">积分: {{user.score}}</div>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Author',
  props: {
    authorName: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      user: {}
    };
  },
  created(){
    this.getUserEmit();
  },
  watch: {
    authorName(){
      this.getUserEmit();
    }
  },
  computed: {
    //卡片标题
    cardTit(){
      if(this.$route.name === 'Detail'){
        //主题细览页
        return '作者';
      }else if(this.$route.name === 'User' || this.$route.name === 'Collections' || this.$route.name === 'Topics' || this.$route.name === 'Replies' || this.$route.name === 'Main' || this.$route.name === 'Mymes'){
        //用户页
        return '个人信息';
      }
    }
  },
  methods: {
    //获取作者信息并向上传递
    async getUserEmit(){
      let {data} = await this.$api.getUser(this.authorName);

      this.user = data.data;
      this.$emit('user-to-detail', this.user);
    }
  }
}
</script>

<style>
.author div.ivu-card-body {
  padding: 10px;
  padding-bottom: 0;
}
.author-name {
  vertical-align: middle;
  margin-left: 10px;
  font-size: 16px;
}
.author-name a:link, .author-name a:visited {
  color: #778087;
}
.author-name a:hover {color: #778087;}
.author-score {
  font-size: 14px;
  line-height: 2.5;
}
</style>