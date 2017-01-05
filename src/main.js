import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Mint from 'mint-ui'
import routerConfig from './vueRouter.config'
import 'mint-ui/lib/style.css';
import './assets/css/base.css';
import './assets/css/font-awesome.css';
import checkIsLogin from './util/checkAssToken'


Vue.use(Mint);
Vue.use(VueRouter);
const router = new VueRouter(routerConfig);

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    mounted(){
        checkIsLogin();
    }
});
