<template>
  <section class="noreply">
    <Card title="无人回复的话题" :bordered="false" :dis-hover="true">
      <CellGroup id="noreplyCon">
        <Cell :title="item.title" v-for="item in getNoReply" :key="item.id" :to="{name: 'Detail', params: {id: item.id}}" ref="title" />
      </CellGroup>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'NoReply',
  /* props: {
    noReplyList: {
      type: Array,
      default(){
        return [];
      }
    }
  }, */
  computed: {
    //从 vuex 获取没有回复的主题
    getNoReply(){
      return this.$store.state.noReplyList;
    }
  },
  created(){
    this.$store.dispatch('getNoReplyAc');
  },
  mounted(){
    setTimeout(() => {
      let tits = document.querySelector('#noreplyCon').querySelectorAll('.ivu-cell-title');

      tits.forEach(div => {
        div.title = div.innerText;
      });
    }, 1000);
  }
}
</script>

<style>
.noreply div.ivu-cell-title {
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.noreply a.ivu-cell-link, .noreply div.ivu-cell-main {display: block;}
</style>
