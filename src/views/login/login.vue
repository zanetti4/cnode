<template>
  <Row type="flex" justify="center" :gutter="16" class-name="pt-15">
    <Col span="16" :style="{padding: 0}">
      <section class="userinfo">
        <Breadcrumb>
          <BreadcrumbItem to="/">主页</BreadcrumbItem>
          <BreadcrumbItem>登录</BreadcrumbItem>
        </Breadcrumb>
        <Form :label-width="180" class="loginform" :rules="ruleValidate" :model="formData" ref="formValidate2" @submit.native.prevent="send2('formValidate2')">
          <FormItem label="Access Token" label-for="token" prop="token">
            <Input style="width: 285px" element-id="token" v-model="formData.token"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" html-type="submit" :loading="isLoading">{{btnText}}</Button>
          </FormItem>
        </Form>
      </section>
    </Col>
    <Col span="5">
      <about></about>
    </Col>
  </Row>
</template>

<script>
import About from './about';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  components: {About},
  data(){
    //验证密码
    /* const validatePass = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('密码不能为空'));
      }else if(value !== '1234'){
        callback(new Error('密码错误'));
      } else {
        callback();
      }
    };

    //验证用户名
    const validateUser = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('用户名不能为空'));
      }else if(value !== 'ly'){
        callback(new Error('用户名错误'));
      } else {
        callback();
      }
    }; */

    return {
      formData: {
        userName: '',
        password: '',
        token: ''
      },
      ruleValidate: {
        /* userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }] */
        /* userName: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }] */
        token: [{ required: true, message: 'Access Token 不能为空', trigger: 'blur' }]
      },
      fromRoute: '',
      params: {},
      query: {},
      isLoading: false
    };
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.fromRoute = from.name;
      vm.params = from.params;
      vm.query = from.query;
    });
  },
  computed: {
    //按钮文字
    btnText(){
      return this.isLoading ? 'Loading...' : '登录';
    }
  },
  methods: {
    //登录
    send2(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          //验证通过
          this.isLoading = true;

          this.$api.validateAccess({accesstoken: this.formData.token}).then(res => {
            //登录成功
            let {data} = res;

            data.accesstoken = this.formData.token;
            //将用户信息存在 cookie 中
            let aKeys = Object.keys(data);

            aKeys.forEach(key => {
              Cookies.set(key, data[key]);
            });

            Cookies.set('myField', JSON.stringify(aKeys));
            this.$store.commit('myInfoMu', {info: aKeys});
            this.$store.commit('isLoginMu', {success: true});

            /* this.$router.addRoutes([
              {
                  path: '/mymes',
                  name: 'Mymes',
                  //title: '未读消息',
                  component: Mymes,
                  meta: {isLogin: true}
              },
              {
                  path: '/setting',
                  name: 'Setting',
                  //title: '设置',
                  component: Setting,
                  meta: {isLogin: true}
              },
              {
                  path: '/signout',
                  name: 'Signout',
                  //title: '退出',
                  meta: {isLogin: true}
              }
            ]); */

            let ref = this.$route.query.ref;

            this.isLoading = false;

            if(ref){
              //有目标页
              this.$router.push({name: ref});
            }else{
              //没有目标页
              this.$router.back();
            } 
          }, () => {
            this.$Message.error('登录失败!');
            this.isLoading = false;
          });
        }
      });
    }
  }
}
</script>

<style>
.loginform {padding: 40px 0;}
.loginform div label.ivu-form-item-label {
  font-size: 14px;
  cursor: pointer;
}
</style>
