<template>
  <section class="userinfo">
    <Breadcrumb>
      <BreadcrumbItem to="/">主页</BreadcrumbItem>
      <BreadcrumbItem>{{cardTitle}}话题</BreadcrumbItem>
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
      <mavon-editor v-model="formData.value" :subfield="formData.subfield" :toolbars="formData.toolbars" class="pubform-mavon"></mavon-editor>
      <Button type="primary" html-type="submit" :loading="isLoading">{{btnText}}</Button>
    </Form>
  </section>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'PubCardMavon',
  data(){
    return {
      formData: {
        tab: '',
        title: '',
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
      ruleValidate: {
        tab: [{ required: true, message: '请选择版块', trigger: 'change' }],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { type: 'string', min: 10, message: '标题十个字及以上', trigger: 'blur' }
        ]
      },
      submitKind: '',
      cardTitle: '',
      isLoading: false
    };
  },
  created(){
    if(this.$route.name === 'Publish'){
      //发布话题
      this.submitKind = 'publish';
      this.cardTitle = '发布';
      this.formData.title = '';
    }else if(this.$route.name === 'Edit'){
      //编辑话题
      this.submitKind = 'edit';
      this.cardTitle = '编辑';

      if(this.$route.params.detailInfo){
        //话题细览信息存在
        this.formData.title = this.$route.params.detailInfo.title;
        this.formData.tab = this.$route.params.detailInfo.tab;
        this.formData.value = this.$route.params.detailInfo.content;
      }else{
        //话题细览信息不存在：刷新页面
        this.$router.back();
      }
    }
  },
  computed: {
    //按钮文字
    btnText(){
      return this.isLoading ? 'Loading...' : '提交';
    }
  },
  methods: {
    //提交
    publish(name){
      this.$refs[name].validate(async valid => {
        if (valid) {
          //验证通过
          let content = this.formData.value;

          if(content){
            //有内容
            this.isLoading = true;

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
              res = await this.$api.createTopic(data);
            }else{
              //编辑话题
              res = await this.$api.editTopic({
                ...data,
                topic_id: this.$route.params.detailInfo.id
              });
            }

            this.isLoading = false;
            this.$router.push({name: 'Detail', params: {id: res.data.topic_id}});
          }else{
            //没内容
            this.$nextTick(() => {
              let textarea = document.querySelector('.auto-textarea-input');

              textarea.focus();
            });
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.pubform {padding: 20px;}
.pubform-mavon {
  margin-bottom: 24px;
  z-index: 800;
}
</style>
