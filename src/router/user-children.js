import Collections from '@/views/user/user-topics/collections';
import Topics from '@/views/user/user-topics/topics';
import Replies from '@/views/user/user-topics/replies';

const defaultTitle = 'CNode：Node.js专业中文社区';

let userChildren = [{
        path: 'collections',
        name: 'Collections',
        component: Collections,
        meta: {
            title: defaultTitle
        }
    },
    {
        path: 'topics',
        name: 'Topics',
        component: Topics,
        meta: {
            title: defaultTitle
        }
    },
    {
        path: 'replies',
        name: 'Replies',
        component: Replies,
        meta: {
            title: defaultTitle
        }
    }
];

export default userChildren;