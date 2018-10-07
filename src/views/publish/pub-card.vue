<template>
  <section class="userinfo">
    <Breadcrumb>
      <BreadcrumbItem to="/">主页</BreadcrumbItem>
      <BreadcrumbItem>发布话题</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="70" class="pubform" :rules="ruleValidate" :model="formData" ref="formValidate" @submit.native.prevent="publish('formValidate')">
      <FormItem label="选择版块" prop="tab">
        <Select v-model="formData.tab" placeholder="请选择" style="width:220px">
          <Option value="share">分享</Option>
          <Option value="ask">问答</Option>
          <Option value="job">招聘</Option>
          <Option value="dev">客户端测试</Option>
        </Select>
      </FormItem>
      <FormItem label="标题" label-for="title" prop="title">
        <Input element-id="title" v-model="formData.title" placeholder="十个字及以上"></Input>
      </FormItem>
      <UEditor :config="config" ref="ueditor"></UEditor>
      <Button type="primary" html-type="submit">提交</Button>
    </Form>
  </section>
</template>

<script>
import UEditor from '@/components/ueditor/ueditor.vue';
import Cookies from 'js-cookie';
//import axios from 'axios';

export default {
  name: 'PubCard',
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
        initialFrameHeight: 450,
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/ueditor/',
        zIndex: 800
      },
      formData: {
        tab: '',
        title: ''
      },
      ruleValidate: {
        tab: [{ required: true, message: '请选择版块', trigger: 'change' }],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { type: 'string', min: 10, message: '标题十个字及以上', trigger: 'blur' }
        ]
      },
      submitKind: ''
    };
  },
  created(){
    if(this.$route.name === 'Publish'){
      //发布话题
      this.submitKind = 'publish';
      this.formData.title = '';
    }else if(this.$route.name === 'Edit'){
      //编辑话题
      //console.log(this.$route.params.detailInfo);
      this.submitKind = 'edit';
      this.formData.title = this.$route.params.detailInfo.title;
      this.formData.tab = this.$route.params.detailInfo.tab;
      this.config.autoClearinitialContent = false;
      this.config.initialContent = this.$route.params.detailInfo.content;
    }
  },
  methods: {
    //提交
    publish(name){
      this.$refs[name].validate(async valid => {
        if (valid) {
          //验证通过
          let editor = this.$refs.ueditor;
          let content = editor.getUEContent();
          //let content = editor.getContentTxt();

          //console.log(content);

          if(content.length){
            //有内容
            let accesstoken = Cookies.get('accesstoken');
            let data = {
              accesstoken,
              title: this.formData.title,
              tab: this.formData.tab,
              content
            };

            let res = {};

            if(this.submitKind === 'publish'){
              //发布话题
              /* axios.post('https://cnodejs.org/api/v1/topics', {
                accesstoken,
                title: this.formData.title,
                tab: this.formData.tab,
                content
              }).then(res => {
                this.$router.push({name: 'Detail', params: {id: res.data.topic_id}});
              }); */

              /* this.$api.createTopic(data).then(res => {
                this.$router.push({name: 'Detail', params: {id: res.data.topic_id}});
              }); */

              res = await this.$api.createTopic(data);
            }else{
              //编辑话题
              /* this.$api.editTopic({
                ...data,
                topic_id: this.$route.params.detailInfo.id
              }).then(res => {
                this.$router.push({name: 'Detail', params: {id: res.data.topic_id}});
              }); */

              res = await this.$api.editTopic({
                ...data,
                topic_id: this.$route.params.detailInfo.id
              });
            }

            this.$router.push({name: 'Detail', params: {id: res.data.topic_id}});
          }else{
            //没内容
            editor.UEFocus();
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.pubform {padding: 20px;}
</style>
