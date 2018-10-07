<template>
  <section class="comments">
    <Card title="添加回复" :bordered="false" :dis-hover="true">
      <form class="reply-form" @submit.prevent="reply">
        <UEditor :config="config" ref="ueditor"></UEditor>
        <Button type="primary" html-type="submit">回复</Button>
      </form>
    </Card>
  </section>
</template>

<script>
import Cookies from 'js-cookie';
import UEditor from '@/components/ueditor/ueditor.vue';

export default {
  name: 'Reply',
  components: {UEditor},
  data(){
    return {
      config: {
        //可以在此处定义工具栏的内容
        toolbars: [
          ['bold', 'italic', '|', 'blockquote', 'insertunorderedlist', 'insertorderedlist', '|', 'link', 'unlink', '|', 'preview', 'searchreplace', '|', 'fullscreen']
        ],
        autoHeightEnabled: false,
        autoFloatEnabled: false,
        initialContent:'',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 250,
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/ueditor/',
        zIndex: 800
      }
    };
  },
  methods: {
    async reply(){
      let editor = this.$refs.ueditor;
      let content = editor.getUEContent();

      if(content.length){
        //有内容
        let accesstoken = Cookies.get('accesstoken');
        let topicId = this.$route.params.id;

        let {data} = await this.$api.reply(topicId, {
          accesstoken,
          content
        });
        
        console.log(data);
        // this.$router.push({name: 'Detail', params: {id: res.data.topic_id}});
      }else{
        //没内容
        editor.UEFocus();
      }
    }
  }
}
</script>

<style scoped>
.reply-form {padding: 10px;}
</style>
