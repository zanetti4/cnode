<template>
  <div class="publish-btn">
    <Button type="success" class="collect" :to="{name: 'Publish'}">发 布 话 题</Button>
  </div>
</template>

<script>
export default {
  name: 'PublishBtn'
}
</script>

<style scoped>
.publish-btn {
  background-color: white;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}
</style>
