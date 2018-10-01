<template>
  <section class="about">
    <Card :title="cardTit" :bordered="false" :dis-hover="true">
      <div>CNode：Node.js专业中文社区</div>
      在这里你可以：
      <ul>
        <li>向别人提出你遇到的问题</li>
        <li>帮助遇到问题的人</li>
        <li>分享自己的知识</li>
        <li>和其它人一起进步</li>
      </ul>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'About',
  computed: {
    //卡片标题
    cardTit(){
      if(this.$route.name === 'Detail'){
        //主题细览页
        return '作者';
      }else if(this.$route.name === 'User' || this.$route.name === 'Collections' || this.$route.name === 'Topics' || this.$route.name === 'Replies'){
        //用户页
        return '个人信息';
      }else if(this.$route.name === 'Login'){
        //登录页
        return '关于';
      }
    }
  }
}
</script>

<style>
.about {
  background-color: white;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}
.about div.ivu-card-body {
  line-height: 2;
  padding: 10px;
  padding-bottom: 15px;
}
.about div div ul {
  list-style-position: inside;
  font-size: 12px;
  padding-left: 15px;
}
</style>
