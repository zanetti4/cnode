# project-cnode

## 前言
老师讲 vue.js 时写了一点儿 cnode，我把它作为我的第一个以 vue 框架制作的项目，进行了完善。当然还遗留几个问题有待解决……

## 技术栈
``` bash
Vue2.5.2: 构建项目，属于底层框架。
Vue-Router: 路径和视图是一一映射的，配置映射的规则。
Vuex: Vue官方提供的状态管理模式。
Axios: http请求模块。
ES6: 较新的Javascript语法。
iview: 一套基于 Vue.js 的高质量 UI 组件库。
js-cookie: 简单、轻量的操作 cookie 的 js 接口。
mavon-editor: 基于Vue的markdown编辑器。
vue-markdown: 针对 vue 的强大、高效的 markdown 解析器。
vue-wechat-title：动态设置页面 title 的插件。
```

## 路由设计及功能
- Home: 首页，重定向到主题首页。
- Login: 登录页，如果要浏览的页面需要登录，则登录后进入该页面。如果手动进入登录页，则登录后返回刚才浏览的页面。
- Main: 主题首页，二级导航对话题进行分类，有全部、问答、分享、工作、精华、客户端测试。还有分页、无人回复的话题、返回顶部；个人信息，顶部导航显示未读消息数。
- Detail: 话题详情页，点击内容中的图片，显示大图。评论的点赞数超过3，底色高亮。作者其它话题；点赞、对评论和话题进行回复。
- Publish: 新建主题页，表单验证。
- Edit: 编辑主题页。
- User: 用户详情页，用户信息、最近创建的5个话题、最近参与的5个话题。
    - Collections: 话题收藏页，分页。
    - Topics: 用户创建的话题页，分页、加载中。
    - Replies: 用户参与的话题页，分页、加载中。
- Mymes: 未读消息页，标记所有未读消息为已读，新消息、过往信息，两个分页。
- Signout: 退出，如果正在浏览的页面需要登录，则退出到主题首页。如果正在浏览的页面不需要登录，则返回该页面。
- 各页面拥有静态或动态的 *title*。

## 项目结构
``` bash
│  App.vue // 组件总入口
│  main.js // 项目的总入口
│  tree.txt // 项目结构
│  
├─assets // 静态文件
│  ├─css // 样式文件
│  │      index.css // 通用样式
│  │      
│  ├─images // 图片
│  │      cnode_alinode-btm.jpg
│  │      cnode_alinode.jpg
│  │      cnode_alipay.jpg
│  │      cnode_client.png
│  │      cnode_golang.png
│  │      cnode_logo.png
│  │      cnode_phphub.png
│  │      cnode_qbox.jpg
│  │      cnode_qiniu.jpg
│  │      cnode_ruby.png
│  │      cnode_testerhome.png
│  │      cnode_ucloud-btm.jpg
│  │      cnode_ucloud.jpg
│  │      
│  └─js // js 文件
│          my-methods.js // 封装的通用方法
│          time.js // 获取两个时间之间的时间段
│          
├─components // 通用组件
│  │  foot-cnode.vue // 页脚
│  │  head-cnode.vue // 页眉
│  │  
│  ├─side // 页面右边
│  │      ads.vue // 广告
│  │      author.vue // 个人信息
│  │      client.vue // 客户端二维码
│  │      friend.vue // 友情社区
│  │      no-reply.vue // 无人回复的话题
│  │      others.vue // 作者其它话题
│  │      publish-btn.vue // 发布话题按钮
│  │      
│  └─ueditor // 富文本编辑器（已废弃）
│          ueditor.vue
│          
├─router // 路由信息
│      index.js
│      navConfig.js // 主题首页二级导航
│      topNav.js // 登录前的顶部导航
│      topNavLogin.js // 登录后的顶部导航
│      user-children.js // 用户详情页的二级路由
│      
├─server // 封装发送请求的函数
│      index.js
│      
├─store // vuex
│      index.js
│      
└─views // 视图
    ├─detail // 用户详情页
    │      big-img.vue // 大图
    │      cnode-article.vue // 话题详情
    │      comments.vue // 评论
    │      detail.vue 
    │      reply-mavon.vue // 给话题写评论
    │      session-poptip.vue // 评论里的会话提示
    │      
    ├─login // 登录页
    │      about.vue // 关于
    │      login.vue
    │      
    ├─main // 主题首页
    │      article-item.vue // 一条话题
    │      list.vue // 话题列表
    │      main.vue
    │      sub-nav.vue // 二级导航
    │      
    ├─mymes // 未读消息
    │      former-mes.vue // 过往信息
    │      mymes.vue
    │      new-mes.vue // 新消息
    │      
    ├─publish // 发布和编辑主题
    │      guide.vue // 话题发布指南
    │      markdown.vue // Markdown 语法参考
    │      pub-card-mavon.vue 
    │      publish.vue
    │      
    └─user // 用户详情页
        │  recent-replies.vue // 最近参与的5个话题
        │  recent-topics.vue // 最近创建的5个话题
        │  user-info.vue // 用户信息
        │  user.vue
        │  
        └─user-topics // 用户的话题
                collections.vue // 收藏的话题
                replies.vue // 参与的话题
                topics.vue // 创建的话题
```

## 心得体会&技术难点
> 这是我的第一个完整的以 vue 为框架制作的项目，过程中遇到了很多问题，可以说是横垄地拉车，一步一个坎儿。不过经过我的不懈努力，网上查找资料、发帖，在技术群里提问，大部分难题解决了，非常感谢那些指点我的高手！整个项目一共花费了一个多月，实际上现在再看所需功能，似乎没有那么多，也不该用这么长时间。我想：随着对于 vue 经验的积累，以后能越做越熟练。
1. 在做登录后返回刚才浏览的页面时，一开始写的比较繁琐：
```javascript
this.$router.push({name: this.fromRoute, params: this.params, query: this.query});
```
**解决办法：**
```javascript
this.$router.back();
```
2. 想要在组件中修改 iview 中分页组件的样式，无法覆盖。  
**解决办法：**  
style 标签不能加 scoped 属性。
3. 无人回复的话题不够5条。  
**解决办法：**  
由于我先获取所有主题首页列表，从头截取一部分，再筛选出回复数为零的。只需要截取的条数多一些就可以了。
4. 第一次使用伪元素 :before。  
**解决办法：**  
在顶部导航中先根据 name 判断是未读消息链接，给它加上 badge 类名，再通过类名找到这个 a 元素，用 setAttribute 添加 mesCount 属性。在样式中通过属性选择器设置伪元素的样式。
5. 点击话题详情页表格中的图片时，大图的显示位置不对。  
**解决办法：**  
我先获取文中图片的 offsetTop，根据此值设置大图的位置。但是对于表格中 position: static 的元素，它的 offsetParent 是 td/th，所以不是想要的 offsetTop。把表格中的图片都设置为 position: relative，问题迎刃而解。
6. 为评论点赞时，报错：401 Unauthorized。  
**解决办法：**  
post 请求配置写错了，应该是 data 而不是 params。
7. 给评论回复时，显示、隐藏编辑器第一次用到内置组件 transition。  
**解决办法：**  
给 transition 组件设置 name="comsession"
```css
.comsession-enter-active, .comsession-leave-active {
  transition: opacity .5s linear;
}
.comsession-enter, .comsession-leave-to {
  opacity: 0;
}
```
8. 给评论进行回复，因为每条评论都能展开一个编辑器，那么编辑器该怎么绑定数据？  
**解决办法：**  
绑定这条评论所对应的数据时，写成动态的方式：
```bash
v-model="formData['value' + item.id]"
```
9. 给评论进行回复，显示编辑器时找不到新添加的评论对象属性。  
**解决办法：**  
对于向响应式对象上添加新属性，必须使用 Vue.set()，因为 Vue 无法探测普通的新增属性。
10. 渲染评论内容时，出现源码。  
**解决办法：**  
使用 vue-markdown 组件进行渲染，因为要与提交时的数据格式一致。
11. 因为 Detail, Edit 都属于一级路由，又使用了 router-view，从话题细览页跳转到编辑页，该怎么传递话题数据呢？  
**解决办法：**  
通过 params 进行传递：
```javascript
this.$router.push({
  name: 'Edit',
  params: {
    detailInfo: this.info,
    topicId: this.info.id
  }
});
```
在编辑页获取 params:
```javascript
this.$route.params.detailInfo
```
12. 相对时间的计算  
**解决办法：**  
网上找到一个 js 文件，可以获取两个时间之间的时间段。我写了一个插件，最后返回相对时间。
13. 刷新页面后 vuex 中的状态会消失。  
**解决办法：**  
先将数据存在 cookie 中，在 vuex 中通过 getters 从 cookie 获取：
```javascript
//从 cookie 中读取我的字段
getMyField(state) {
    if (!state.myInfo) {
        //刷新页面后
        state.myInfo = JSON.parse(Cookies.get('myField'));
    }

    return state.myInfo;
}
```
组件中再从 getters 里获取数据：
```javascript
//从 vuex 获取我的信息字段
myInfoKeys(){
  return this.$store.getters.getMyField;
}
```
14. 如何实现退出后的页面跳转？  
**解决办法：**  
在 Signout 路由独享的守卫里，判断点退出时浏览的页面是否需要登录，再进行 next() 跳转。
15. 子组件获得父组件传递的数据，进行渲染，报错：数据 undefined。  
**解决办法：**  
在子组件使用时加 v-if:
```bash
<author :authorName="loginname" v-if="loginname.length" @user-to-detail="otherTopics"></author>
```
16. cnode-article-vx.vue 中通知 vuex 发请求拿到话题数据，保存在 vuex 里。author.vue 中，我想拿到 vuex 存的话题数据中的作者，再发请求获取用户数据。但是我在获取作者时报错了。  
**解决办法：**  
子组件计算属性会先执行，当时 state.detail 还没有被赋值，也就是说还不具有 author 或者 loginname 属性，所以要在 authorName 中 return 之前，执行一次 commit 赋值；如：
```javascript
computed: {
  //从 vuex 获取作者名
  authorName(){
    this.$store.commit('detailMu',{detial:{author:{loginname:"456"}}});
    return this.$store.state.detail.author.loginname;
  }
}
```
17. 在子组件中发请求获取数据，但是有时候子组件渲染出来了，数据还没展示出来，该怎么解决呢？  
**解决办法：**  
给子组件最外层的标签加个 v-if。  
18. 进入话题细览页先看到回复的编辑器。  
**解决办法：**  
给回复组件添加 *v-if*，等获取到话题数据后，再渲染这部分。
```bash
<reply-mavon v-if="isLogin && loginname" @new-comment="newCommentDe"></reply-mavon>
```
---
**遗留问题：**  
19. detail 视图按住 ctrl 点击首页，不能重定向到首页。  
20. 在用户页面有该用户最近创建的主题列表，在点击某主题最后回复信息时，跳转到该主题页面，但不能定位到最后一条回复处，并出现报错。  
21. 在 vue 中使用 ueditor 时出现了问题，似乎使用 ueditor 所对应的路由必须是一级的，改成二级路由就会报错。

## 安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
