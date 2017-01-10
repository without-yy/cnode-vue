import List from './components/List.vue'
import User from './components/User.vue'
import Content from './components/Content.vue'
import Topic from './components/Topic.vue'
import Create from './components/Create.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/list'},
        {path: '/list', component: List},
        {path: '/user', component: User},
        {path: '/topic/:id', component: Content},
        {path: '/mytopic', component: Topic},
        {path: '/create', component: Create},
        {path: '*', redirect: '/list'}
    ]
});

export default  router