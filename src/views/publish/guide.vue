<template>
  <section class="markdown">
    <Card title="话题发布指南" :bordered="false" :dis-hover="true">
      <CellGroup>
        <Cell title="尽量把话题要点浓缩到标题里" class="markdown-row" />
        <div class="markdown-row guide-seg">
          代码含义和报错可在 <a href="http://segmentfault.com/t/node.js" target="_blank">SegmentFault</a> 提问
        </div>
      </CellGroup>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Guide'
}
</script>

<style scoped>
.guide-seg {
  font-size: 12px;
  color: #515A6E;
}
</style>
