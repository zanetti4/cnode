<template>
  <section class="noreply">
    <Card title="作者其它话题" :bordered="false" :dis-hover="true">
      <CellGroup id="othersCon">
        <Cell :title="item.title" v-for="item in otherTopics" :key="item.id" :to="{name: 'Detail', params: {id: item.id}}" />
      </CellGroup>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Others',
  props: {
    otherTopics: {
      type: Array,
      default(){
        return [];
      }
    }
  }, 
  mounted(){
    setTimeout(() => {
      let tits = document.querySelector('#othersCon').querySelectorAll('.ivu-cell-title');

      tits.forEach(div => {
        div.title = div.innerText;
      });
    }, 1000);
  }
}
</script>