<template>
  <section class="markdown">
    <Card title="Markdown 语法参考" :bordered="false" :dis-hover="true">
      <CellGroup>
        <Cell title="### 单行的标题" class="markdown-row" />
        <Cell title="**粗体**" class="markdown-row" />
        <Cell title="`console.log('行内代码')`" class="markdown-row" />
        <Cell title="```js\n code \n``` 标记代码块" class="markdown-row" />
        <Cell title="[内容](链接)" class="markdown-row" />
        <Cell title="![文字说明](图片链接)" class="markdown-row" />
        <Cell title="Markdown 文档" class="markdown-row" to="https://segmentfault.com/markdown" target="_blank" />
      </CellGroup>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Markdown'
}
</script>

<style>
.markdown-row {padding: 4px 10px;}
.markdown-row:hover {
  cursor: text;
  background-color: transparent;
}
.markdown-row div.ivu-cell-title {
  font-size: 12px;
  line-height: 1.5;
}
.markdown-row a:link, .markdown-row a:visited {color: #08C;}
.markdown-row a:hover div.ivu-cell-title, .guide-seg a:hover {
  color: #08C;
  text-decoration: underline;
}
</style>
