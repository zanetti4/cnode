import Collections from '@/views/user/user-topics/collections';
import Topics from '@/views/user/user-topics/topics';
import Replies from '@/views/user/user-topics/replies';

let userChildren = [{
        path: 'collections',
        name: 'Collections',
        component: Collections
    },
    {
        path: 'topics',
        name: 'Topics',
        component: Topics
    },
    {
        path: 'replies',
        name: 'Replies',
        component: Replies
    }
];

export default userChildren;