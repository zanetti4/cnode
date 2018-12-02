<template>
  <Row class-name="foot">
    <Col span="23" offset="1" class-name="foot-col">
      <div>
        <a href="https://cnodejs.org/rss">RSS</a> | <a href="https://github.com/cnodejs/nodeclub/" target="_blank">源码地址</a>
      </div>
      CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。<br />
      服务器赞助商为
      <a href="http://www.ucloud.cn/?utm_source=zanzhu&utm_campaign=cnodejs&utm_medium=display&utm_content=yejiao&ytag=cnodejs_logo" target="_blank" class="foot-col-logo">
        <img src="../assets/images/cnode_ucloud-btm.jpg" alt="ucloud" class="inline-pic" />
      </a>
      ，存储赞助商为
      <a href="http://www.qiniu.com/?ref=cnode" target="_blank" class="foot-col-logo">
        <img src="../assets/images/cnode_qiniu.jpg" alt="七牛云存储" class="inline-pic" />
      </a>
      ，由
      <a href="https://www.aliyun.com/product/nodejs?ref=cnode" target="_blank" class="foot-col-logo">
        <img src="../assets/images/cnode_alinode-btm.jpg" alt="alinode" class="inline-pic" />
      </a>
      提供应用性能服务。<br />
      新手搭建 Node.js 服务器，推荐使用无需备案的 <a href="https://www.digitalocean.com/?refcode=eba02656eeb3" target="_blank">DigitalOcean(https://www.digitalocean.com/)</a>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'FootCnode'
}
</script>

<style scoped lang="less">
.foot {
  background-color: white;
  font-size: 14px;
  color: #ABABAB;
}
.foot-col {
  padding: 20px;
  padding-right: 0;
  line-height: 2;
  div {font-size: 12px;}
  a:hover {color: #08C;}
}
.foot-col-logo {
  display: inline-block;
  width: 95px;
  vertical-align: middle
}
</style>