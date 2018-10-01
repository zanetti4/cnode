<template>
  <Header :style="{padding: 0}">
    <Menu mode="horizontal" theme="dark" :style="{'background-color': 'transparent'}">
      <Row type="flex" justify="center">
        <Col span="7">
          <router-link :to="{name: 'Home'}">
            <img src="@/assets/images/cnode_logo.png" alt="cnode_logo" class="inline-pic" />
          </router-link>
        </Col>
        <Col span="9" offset="5">
          <!-- <div class="ks-clear" v-if="whichNav">
            <MenuItem :name="index" v-for="(item, index) in topNav" :key="item.path" :to="{name: item.name}">{{item.title}}</MenuItem>
          </div>
          <div class="ks-clear" v-else>
            <MenuItem :name="index" v-for="(item, index) in topNavLogin" :key="item.path" :to="{name: item.name}">{{item.title}}</MenuItem>
          </div> -->
          <!-- <div class="ks-clear">
            <MenuItem :name="index" v-for="(item, index) in topNav" :key="item.path" :to="{name: item.name}" v-if="isLogin(item)">{{item.title}}</MenuItem>
          </div> -->
          <!-- <div class="ks-clear">
            <MenuItem :name="index" v-for="(item, index) in topNav" :key="item.path" :to="{name: item.name}">{{item.title}}</MenuItem>
          </div> -->
          <div class="ks-clear head-menu">
            <MenuItem :name="index" v-for="(item, index) in whichOne" :key="item.path" :to="{name: item.name}">{{item.title}}</MenuItem>
          </div>
          <!-- {{whichOne}} -->
        </Col>
      </Row>
    </Menu>
  </Header>
</template>

<script>
import topNav from '@/router/topNav';
import topNavLogin from '@/router/topNavLogin';
import Cookies from 'js-cookie';

export default {
  name: 'HeadCnode',
  data(){
    return {
      topNav,
      topNavLogin,
      whichOne: []
    };
  },
  /* beforeRouteEnter(to, from, next){
    let userName = Cookies.get('cnode');
    //console.log(userName);
      
    if(userName){
      //登录了
      this.whichOne = this.topNavLogin;
    }else{
      //没登录
      this.whichOne = this.topNav;
    }

    next();
  }, */
  watch: {
    /* $route(){
      console.log(2222);
      this.whichNav();
    } */
    //$route: 'isLogin'
    //$route: 'whichNav'
    $route: 'whichTopNav'
  },
  created(){
    /* let userName = Cookies.get('cnode');
      
    if(userName){
      //登录了
      this.whichOne = this.topNavLogin;
    }else{
      //没登录
      this.whichOne = this.topNav;
    } */

    this.whichTopNav();
  },
  computed: {
    //顶部导航显示项
    /* whichNav(){
      //console.log(11111);
      let userName = Cookies.get('cnode');
      
      if(userName){
        //登录了
        return false;
      }else{
        //没登录
        return true;
      }
    } */
  },
  methods: {
    //顶部导航显示项
    /* isLogin(obj){
      let userName = Cookies.get('cnode');
      console.log(obj.name);
      
      if(userName && obj.name === 'Login'){
        //登录了，登录项不显示
        return false;
      }else{
        //没登录
        return true;
      }
    } */

    //顶部导航显示项
    /* whichNav(){
      let userName = Cookies.get('cnode');
      
      if(userName){
        //登录了
        
        return false;
      }else{
        //没登录
        return true;
      }
    } */

    whichTopNav(){
      //let userName = Cookies.get('cnode-user');
      let isLogin = Cookies.get('success');

      //console.log(typeof isLogin);
      
      if(isLogin){
        //登录了
        this.whichOne = this.topNavLogin;
      }else{
        //没登录
        this.whichOne = this.topNav;
      }
    }
  }
}
</script>

<style>
.head-menu a.ivu-menu-item {padding: 0 15px;}
</style>
