import List from './components/List.vue'
import User from './components/User.vue'
import Content from './components/Content.vue'
import Topic from './components/Topic.vue'
import Create from './components/Create.vue'
// const scrollBehavior = (to, from, savedPosition) => {
//     console.log(to);
//     console.log(from);
//     console.log(savedPosition);
//     return to;
// };
export default  {
    routes: [
        {path: '/', redirect: '/list'},
        {path: '/list', component: List},
        {path: '/user', component: User},
        {path: '/topic/:id', component: Content},
        {path: '/mytopic', component: Topic},
        {path: '/create', component: Create},
        {path: '*', redirect: '/list'}
    ]
}