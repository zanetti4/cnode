<template>
  <section class="comments mt-15">
    <Card title="添加回复" :bordered="false" :dis-hover="true">
      <form class="reply-form" @submit.prevent="reply">
        <mavon-editor v-model="formData.value" :subfield="formData.subfield" :toolbars="formData.toolbars" class="reply-form-mavon"></mavon-editor>
        <Button type="primary" html-type="submit">回复</Button>
      </form>
    </Card>
  </section>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'ReplyMavon',
  data(){
    return {
      formData: {
        value: '',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          quote: true, // 引用
          ul: true, // 无序列表
          ol: true, // 有序列表
          link: true, // 链接
          // imagelink: true, // 图片链接
          help: true, // 帮助
          preview: true, // 预览
          fullscreen: true // 全屏编辑
        },
        subfield: false
      },
      newComments: 0
    };
  },
  methods: {
    async reply(){
      let content = this.formData.value;

      if(content){
        //有内容
        let accesstoken = Cookies.get('accesstoken');
        let topicId = this.$route.params.id;

        let {data} = await this.$api.reply(topicId, {
          accesstoken,
          content
        });
        
        // console.log(data);
        
        if(data.success){
          //评论发布成功
          this.newComments++;
          this.$emit('new-comment', this.newComments);
          this.formData.value = '';
        }else{
          //评论发布失败
          alert('评论发布失败');
        }
      }else{
        //没内容
        this.$nextTick(() => {
          let textarea = document.querySelector('.auto-textarea-input');

          textarea.focus();
        });
      }
    }
  }
}
</script>

<style scoped>
.reply-form {padding: 10px;}
.reply-form-mavon {margin-bottom: 24px;}
</style>
