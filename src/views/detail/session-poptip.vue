<template>
  <div class="session">
    <div class="session-arrow"></div>
    <h4>查看对话</h4>
    <Row class-name="mb-5">
      <Col span="23">
        <Avatar shape="square" :src="origin.author.avatar_url" /> {{origin.author.loginname}}
      </Col>
      <Col span="1">
        <a :href="`#${origin.id}`" title="查看原文" class="session-return">
          <Icon type="ios-arrow-round-up" size="20" />
        </a>
      </Col>
    </Row>
    <vue-markdown class="session-content" :source="origin.content"></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'sessionPoptip',
  components: {VueMarkdown},
  props: {
    origin: {
      type: Object,
      default(){
        return {};
      }
    }
  }
}
</script>

<style>
.session {
  position: absolute;
  z-index: 2000;
  width: 300px;
  padding: 5px 10px 10px;
  border: solid 1px #E5E5E5;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .3);
  background-color: white;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}
.session-arrow, .session-arrow:after {
  position: absolute;
  /* z-index: 3000; */
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.session-arrow {
  border-width: 7px 7px 7px 0;
  border-right-color: #E5E5E5;
  top: 20px;
  left: -8px;
}
.session-arrow:after {
  content: " ";
  left: 2px;
  top: -7px;
  border-width: 7px;
  border-left-width: 0;
  border-right-color: white;
}
.session h4 {
  text-align: center;
  border-bottom: solid 1px #E5E5E5;
  margin-bottom: 10px;
  line-height: 1.8;
}
.session-return:link, .session-return:visited, .session-return:hover, .session-content a:link, .session-content a:visited {color: #08C;}
.session-content a:hover {text-decoration: underline;}
.session-content p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
}
</style>
