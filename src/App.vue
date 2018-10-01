<template>
  <!-- <div class="layout" @click="test(44)"> -->
  <div class="layout">
    <Layout :style="{'background-color': 'transparent'}">
      <head-cnode :style="{'background-color': '#444'}"></head-cnode>
      <Content :style="{padding: '15px 0'}">
        <router-view></router-view>
      </Content>
      <foot-cnode></foot-cnode>
    </Layout>
    <BackTop></BackTop>
  </div>
</template>

<script>
import HeadCnode from '@/components/head-cnode';
import FootCnode from '@/components/foot-cnode';

export default {
  name: 'App',
  components: {
    HeadCnode,
    FootCnode
  }/* ,
  watch: {
    $route: 'test'
  },
  methods: {
    test(param){
      console.log(param);
    }
  } */
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-footer-center{
    text-align: center;
}
</style>