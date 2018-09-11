<template>
  <section class="author">
    <Card title="作者" :bordered="false" :dis-hover="true">
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