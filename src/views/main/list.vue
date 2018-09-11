<template>
  <div>
    <item v-for="item in dataList" :key="item.id" :option="item"></item>
  </div>
</template>

<script>
import Item from './article-item';

export default {
  name: 'List',
  components: {Item},
  props: {
    dataList: {
      type: Array,
      default(){
        return [];
      }
    }
  }
}
</script>