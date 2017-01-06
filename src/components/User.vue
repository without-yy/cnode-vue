<template>
    <div id="user">
        <div class="background" v-show="!isLogin">
            <div class="login">
                <input class="assToken" type="text" placeholder="Access Token" v-model="assToken">
                <mt-button @click.native="login" class="loginBtn" size="large" type="primary">登录</mt-button>
            </div>
        </div>
        <div class="top">
            <mt-loadmore :top-method="refresh" id="loadMoreBox" ref="loadmore">
                <div  v-if="isLogin">
                    <div class="userImgBox">
                        <div>
                            <img class="photo" :src="userInfo.avatar_url" alt="">
                            <p class="loginName">{{userInfo.loginname}}</p>
                        </div>
                    </div>
                    <ul class="list">
                        <li>
                            <a class="item">
                                <i class="icon-mail-reply-all"></i>
                                <span>发表主题</span>
                            </a>
                        </li>
                        <li>
                            <a class="item">
                                <i class="icon-comments"></i>
                                <span>我的消息</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="item" @click="loginOut">
                                <i class="icon-upload-alt"></i>
                                <span>退出</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>

    import {Toast} from 'mint-ui';
    import AssToken from '../util/setAssToken'
    import CheckToken from '../util/checkAssToken'
    export default{
        data(){
            return {
                assToken: '',
                isLogin: true,
                userInfo: {}
            }
        },
        methods: {
            loadTop(){
                alert('top');
                this.$refs.loadmore.onTopLoaded();
            },
            login(){
                let that = this;
                CheckToken(this.assToken)
                    .then((req) => {
                        AssToken.writeAssToken(that.assToken);
                        that.isLogin = true;
                    })
                    .catch((err) => {
                        console.error(err);
                        let instance = Toast('登录失败');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    });
            },
            loginOut(){
                AssToken.delAssToken();
                this.refresh();
            },
            refresh(){
                let that = this;
                CheckToken().then((req) => {
                    that.userInfo = req.data;
                    that.isLogin = true;
                    console.log(req.data);
                    that.$refs.loadmore.onTopLoaded();
                }).catch(() => {
                    that.isLogin = false;
                })
            }
        },
        mounted(){
            document.getElementById('loadMoreBox').style.height = window.innerHeight + 'px';
            this.refresh();
        }
    }
</script>
<style scoped>
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #e7e7e7;
    }

    .login {
        width: 80%;
        margin: 200px auto;
    }

    .loginBtn {
        margin-top: 30px;
    }

    .assToken {
        width: 100%;
        border: 1px solid #ccc;
        line-height: 30px;
        border-radius: 5px;
        padding: 3px 10px;
        box-sizing: border-box;
    }

    .assToken:focus {
        outline: none;
        border-color: #369;
    }

    .userImgBox {
        width: 100%;
        height: 200px;
        background: #70ACB1;
        overflow: hidden;
    }

    .photo {
        width: 25%;
        height: 25%;
        border-radius: 50%;
        display: block;
        margin: 40px auto 0 auto;
    }

    .loginName {
        text-align: center;
        color: #F0FFF3;
    }

    .list {
        margin-top: 50px;
    }

    /*.item:first-child{*/
    /*border-top: 1px solid #f6f6f6;*/
    /*}*/
    .item {
        padding-left: 15px;
        line-height: 2.5rem;
        border-bottom: 1px solid #fff;
        background: #f2f2f2;
        display: block;
        text-decoration: none;
    }
    .item span{
        padding-left: 10px;
    }
    .loginOut{
        margin-top: 50px;
    }
</style>