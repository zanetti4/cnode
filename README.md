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

## Build Setup

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
