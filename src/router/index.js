import Vue from 'vue'
import Router from 'vue-router';
import Cookies from 'js-cookie';
import Main from '@/views/main/main';
import Detail from '@/views/detail/detail';
import User from '@/views/user/user';
import Publish from '@/views/publish/publish';
import topNav from '@/router/topNav';
import userChildren from '@/router/user-children';
import Mymes from '@/views/mymes/mymes';
import Setting from '@/views/setting/setting';

Vue.use(Router);

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition;
    } else {
        const position = {}
            // new navigation.
            // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};

const defaultTitle = 'CNode：Node.js专业中文社区';

let router = new Router({
    mode: 'history',
    scrollBehavior,
    routes: [
        ...topNav,
        {
            path: '/main/:tab?',
            name: 'Main',
            component: Main,
            meta: {
                title: defaultTitle
            }
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
            meta: {
                scrollToTop: true
            }
        },
        {
            path: '/publish',
            name: 'Publish',
            component: Publish,
            meta: {
                isLogin: true,
                title: defaultTitle
            }
        },
        {
            // path: '/edit',
            path: '/edit/:topicId',
            name: 'Edit',
            component: Publish,
            meta: {
                isLogin: true,
                title: defaultTitle
            }
        },
        {
            path: '/user/:loginname',
            name: 'User',
            component: User,
            meta: {
                scrollToTop: true
            },
            children: [...userChildren]
        },
        {
            path: '/mymes',
            name: 'Mymes',
            //title: '未读消息',
            component: Mymes,
            meta: {
                isLogin: true,
                title: defaultTitle
            }
        },
        {
            path: '/setting',
            name: 'Setting',
            //title: '设置',
            component: Setting,
            meta: { isLogin: true }
        },
        {
            path: '/signout',
            name: 'Signout',
            //title: '退出',
            meta: { isLogin: true },
            beforeEnter: (to, from, next) => {
                if (from.matched.some(item => item.meta.isLogin)) {
                    //点退出时浏览的页面需要登录
                    next({
                        path: '/main/all'
                    });
                } else {
                    //点退出时浏览的页面不需要登录
                    // console.log(11111111);

                    next({
                        name: from.name,
                        params: from.params,
                        query: from.query
                    });
                }
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        //要进入的路由有默认标题
        document.title = to.meta.title;
    }

    if (to.matched.some(item => item.meta.isLogin)) {
        //需要登录
        let isLogin = Cookies.get('success');

        if (isLogin) {
            //登录了
            next();
        } else {
            //没登录
            next({
                name: 'Login',
                query: { ref: to.name }
            });
        }
    } else {
        //不需要登录
        next();
    }
});

export default router;