<template>
  <div class="item">
    <h3 :kind="tab" :class="{'item-top': option.top, 'item-good': option.good}">
      <router-link 
      :to="{name: 'Detail', params: {id: option.id}}"
      >{{option.title}}</router-link>
    </h3>
    <div class="content">
      <div class="avatar">
        <router-link :to="{name: 'User', params: {loginname: option.author.loginname}}">
          <img :src="option.author.avatar_url" :alt="option.author.loginname" />
        </router-link>
      </div>
      <div class="info">
        <p>
          <span class="name">{{option.author.loginname}}</span>
          <span class="status">
            <b>{{option.reply_count}}</b>/{{option.visit_count}}
          </span>
        </p>
        <p class="time">
          <span>{{createTime}}</span>
          <span>
            <img class="user_small_avatar" :src="option.author.avatar_url">
            {{replyTime}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import navConfig from '@/router/navConfig';

export default {
  name: 'Item',
  props: {
    option: {
      type: Object,
      default(){
        return {};
      }
    }
  },
  computed: {
    //获取分类
    tab(){
      if(this.option.top && this.option.good){
        //优先显示置顶
        return '置顶';
      }else if(this.option.top){
        //置顶
        return '置顶';
      }else if(this.option.good){
        //精华
        return '精华';
      }

      let item = navConfig.find(item => item.params.tab === this.option.tab);

      if(item){
        //item 存在
        return item.title;
      }
    },
    //创建时间
    createTime(){
      return this.getTimeCR(this.option.create_at);
    },
    //回复时间
    replyTime(){
      return this.getTimeCR(this.option.last_reply_at);
    }
  },
  methods: {
    //获取时间
    getTimeCR(time){
      let ct = new Date(time);

      return `${ct.getFullYear()}年${ct.getMonth()+1}月${ct.getDate()}日`;
    }
  }
}
</script>

<style>
.item {
  width: 100%;
  display: flex;
  flex-direction:column;
  box-sizing: border-box;
  border-bottom: 1px solid #d5dbdb;
  padding: 5px;
}
.item .avatar {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content:center;
  padding-right: 5px;
}

.item .avatar img {
  width: 100%;
  border-radius: 50%;
  border: 1px solid #f3f3f3;
}

.item h3 {
  color: #2c3e50;
  font-size: 14px;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item h3.ask:before {
    background: #3498db;
}
.item h3.share:before {
    background: #1abc9c;
}
.item h3.item-good:before {
    background: #e67e22;
    color: white;
}
.item h3.item-top:before {
    background: #80BD01;
    color: white;
}
.item h3:before {
    content: attr(kind);
    margin-right: 10px;
    margin-top: -3px;
    color: #444;
}
.item h3:before {
    padding: 2px 3px;
    font-size: 10px;
    font-weight: 400;
    border-radius: 4px;
    background-color: #e7e7e7;
    text-align: center;
    vertical-align: middle;
}
.item h3 a:visited {color: #888;}
.item h3 a:hover {text-decoration: underline;}
.content {
  display: flex;
  padding-top: 10px;
}
.content .info {
  width: 100%;
  flex: 1;
}

.content .info p {
  width: 100%;
  display: flex;
  color: #34495e;
  vertical-align: baseline;
  font-size: 12px;
}

.content .info p .name {
  width: 100%;
  flex:1;
  font-weight: bold;
}

.content .info p .status b {
  color: #9E78C0;
}

.content .info p.time span:first-child {
  width: 100%;
  flex:1;
}

.content .info p.time .user_small_avatar {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: .5em;
  border-radius: 3px;
}
</style>