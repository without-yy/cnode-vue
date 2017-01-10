import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Mint from 'mint-ui'
import router from './vueRouter.config'
import 'mint-ui/lib/style.css';
import './assets/css/base.css';
import './assets/css/font-awesome.css';

Vue.use(Mint);
new Vue({
    el: '#app',
    render: h => h(App),
    router
});
