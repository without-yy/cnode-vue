<template>
    <div id="user">
        <div class="background" v-show="!isLogin">
            <div class="login">
                <input class="assToken" type="text" placeholder="Access Token" v-model="assToken">
                <mt-button @click.native="login" class="loginBtn" size="large" type="primary">登录</mt-button>
            </div>
        </div>
        <div class="top" v-if="isLogin">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <ul>
                    <li>
                        {{isLogin}}
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>

    import {Toast} from 'mint-ui';
    import AssToken from '../util/setAssToken'
    import Cookie from '../util/setCookie'
    import CheckToken from '../util/checkAssToken'
    export default{
        data(){
            return {
                assToken: '',
                isLogin: false,
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
                        let instance = Toast('登录失败');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    });
            }
        },
        mounted(){
            let that = this;
            if (Cookie.get('l') == '2') {
                that.isLogin = true;
            }else {
                CheckToken().then(()=>{
                    that.isLogin = true;
                });
            }
        }
    }
</script>
<style>
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
</style>