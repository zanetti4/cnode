<template>
  <Row type="flex" justify="center" :gutter="16" class-name="pt-15">
    <Col span="16" :style="{padding: 0}">
      <pub-card></pub-card>
    </Col>
    <Col span="5">
      <markdown></markdown>
      <guide></guide>
    </Col>
  </Row>
</template>

<script>
import Markdown from './markdown';
import Guide from './guide';
import PubCard from './pub-card';

export default {
  name: 'Publish',
  components: {
    Markdown,
    Guide,
    PubCard
  },
  methods: {
    
  }
}
</script>