<template>
  <nav class="subnav">
    <router-link v-for="(item, index) in navConfig" :key="item.params.tab" :to="{name: item.name, params: item.params}">{{item.title}}</router-link>
  </nav>
</template>

<script>
import navConfig from '@/router/navConfig';

export default {
  name: 'SubNav',
  data(){
    return {navConfig};
  }
}
</script>

<style scoped>
.subnav {
  background-color: #F6F6F6;
  padding: 10px;
  border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px 4px 0 0;
}
.subnav a:link, .subnav a:visited {
  display: inline-block;
  font-size: 14px;
  color: #80BD01;
  line-height: 26px;
  padding: 0 4px;
  margin-right: 10px;
}
.subnav a:hover {
  text-decoration: none;
  color: #005580;
}
.subnav a.router-link-active {
  background-color: #80BD01;
  color: white;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}
</style>
