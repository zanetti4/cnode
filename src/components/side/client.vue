<template>
  <section class="friend">
    <Card title="客户端二维码" :bordered="false" :dis-hover="true">
      <div class="clientcon">
        <img src="../../assets/images/cnode_client.png" alt="client QR code" class="block-pic" />
        <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
      </div>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Client'
}
</script>

<style scoped>
.clientcon {
  text-align: center;
  padding: 0 45px;
}
.clientcon a:link, .clientcon a:visited {
  line-height: 2;
  color: #778087;
}
.clientcon a:hover {text-decoration: underline;}
</style>
