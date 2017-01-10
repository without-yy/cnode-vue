<template>
    <div id="message">
        <mt-loadmore :top-method="refresh" class="loadMoreBox" id="loadMoreBox" ref="loadmore">
            <div>
                <div class="isLogin" v-show="!isLogin">
                    您还未
                    <router-link to="/user">登录</router-link>
                </div>
                <ul v-if="list">

                    <li class="item" v-for="item in list">
                        <a class="gotoContent" :href="'#/topic/'+item.id">
                            <div>
                                <p class="item-title">
                                    <span>{{item.title}}</span>
                                </p>
                                <div class="authorInfo">
                                    <p class="flex1 replyTime">
                                        <span>创建: {{getTime(item.last_reply_at)}}</span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>


        </mt-loadmore>
    </div>
</template>
<script>
    import AssToken from '../util/setAssToken'
    import CheckLogin from '../util/checkAssToken'
    import axios from 'axios'
    export default{
        data(){
            return {
                isLogin: true,
                username: '',
                list: []
            }
        },
        methods: {
            refresh(){
                CheckLogin().then(this.getMessage).then((req) => {
                    this.isLogin = true;
                    this.$refs.loadmore.onTopLoaded();
                }).catch((err) => {
                    this.isLogin = false;
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            getMessage(name){
                return new Promise((resolve, reject) => {
                    let username = '';
                    let that = this;
                    typeof name === 'string' ? username = name : username = name.data.loginname;
                    this.username = username;
                    axios.get(`https://cnodejs.org/api/v1/user/${username}`).then((req) => {
                        that.list = req.data.data.recent_topics;
                        resolve(req);
                    }).catch((err) => {
                        reject(err);
                    })
                });

            },
            getTime(str){
                let date = new Date(str);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                return year + ' - ' + month + ' - ' + day;
            }
        },
        mounted(){
            document.getElementById('loadMoreBox').style.height = window.innerHeight + 'px';
            AssToken.getAssToken() ? this.isLogin = true : this.isLogin = false;
            this.refresh();
        },
        activated(){ //重新切换回来这个页面执行
            this.refresh();
        }
    }
</script>
<style scoped>

    .item {
        padding: 5px 10px;
        background: #eee;
        margin: 10px 5px;
        border-radius: 5px;
    }

    .item a {
        text-decoration: none;
    }
</style>