<template>
  <Header :style="{padding: 0}">
    <Menu mode="horizontal" theme="dark" :style="{'background-color': 'transparent'}">
      <Row type="flex" justify="center">
        <Col span="7">
          <router-link :to="{name: 'Home'}">
            <img src="@/assets/images/cnode_logo.png" alt="cnode_logo" class="inline-pic" />
          </router-link>
        </Col>
        <Col span="9" offset="6">
          <div class="ks-clear">
            <MenuItem :name="index" v-for="(item, index) in topNav" :key="item.path" :to="{name: item.name}">{{item.title}}</MenuItem>
          </div>
        </Col>
      </Row>
    </Menu>
  </Header>
</template>

<script>
import topNav from '@/router/topNav';

export default {
  name: 'HeadCnode',
  data(){
    return {
      topNav
    };
  }
}
</script>