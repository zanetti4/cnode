<template>
  <section class="friend">
    <Card title="友情社区" :bordered="false" :dis-hover="true">
      <CellGroup>
        <a href="https://ruby-china.org/" target="_blank">
          <img src="../../assets/images/cnode_ruby.png" alt="Ruby China" class="block-pic" />
        </a>
        <a href="http://golangtc.com/" target="_blank">
          <img src="../../assets/images/cnode_golang.png" alt="Golang" class="block-pic" />
        </a>
        <a href="http://phphub.org/" target="_blank">
          <img src="../../assets/images/cnode_phphub.png" alt="PHPhub" class="block-pic" />
        </a>
        <a href="https://testerhome.com/" target="_blank">
          <img src="../../assets/images/cnode_testerhome.png" alt="TesterHome" class="block-pic" />
        </a>
      </CellGroup>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Friend'
}
</script>

<style>
.friend div.ivu-cell-group {padding: 0 30px;}
.friend div.ivu-cell-group a {
  display: block;
  margin-bottom: 10px;
}
.friend div.ivu-cell-group a:last-child {margin-bottom: 0;}
</style>
