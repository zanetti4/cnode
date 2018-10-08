import Login from '@/views/login/login';

let topNav = [{
        path: '/',
        name: 'Home',
        title: '首页',
        redirect: '/main/all'
    },
    /* {
        path: '/newcomer',
        name: 'Newcomer',
        title: '新手入门'
    },
    {
        path: '/api',
        name: 'Api',
        title: 'API'
    },
    {
        path: '/about',
        name: 'About',
        title: '关于'
    },
    {
        path: '/signup',
        name: 'Signup',
        title: '注册'
    }, */
    {
        path: '/login',
        name: 'Login',
        title: '登录',
        component: Login
    }
];

export default topNav;