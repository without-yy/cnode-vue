<template>
    <div>
        <mt-header title="发表"></mt-header>
        <div class="content">
            <mt-field label="标题:" placeholder="标题字数10字以上" v-model="title"></mt-field>
            <!--板块选择-->
            <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text">板块:</span>
                    </div>
                    <div class="mint-cell-value">
                        <select v-model="tab" class="selTab">
                            <option value="">请选择</option>
                            <option value="share">分享</option>
                            <option value="ask">问答</option>
                            <option value="job">招聘</option>
                        </select>
                    </div>
                </div>
                <div class="mint-cell-right"></div> <!----></a>
            <mt-field label="内容:" type="textarea" rows="4" v-model="content"></mt-field>
        </div>
        <div class="action">
            <mt-button @click.native="openLoginPage" v-if="!isLogin" plain type="danger" size="large">请登录</mt-button>
            <mt-button @click.native="create" v-if="isLogin" plain type="primary" size="large">提交</mt-button>
        </div>
    </div>
</template>
<script>
    import AssToken from '../util/setAssToken'
    import router from '../vueRouter.config'
    import axios from 'axios'
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                tab: '',
                title: '',
                content: '',
                isLogin: true
            }
        },
        methods: {
            refresh(){
                AssToken.getAssToken() ? this.isLogin = true : this.isLogin = false;
            },
            openLoginPage(){
                router.push('user');
            },
            create(){
                let that = this;
                return new Promise((resolve, reject) => {
                    if(!that.tab){
                        let instance = Toast('请选择板块');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                        reject(new Error('请选择板块'));

                    }else {
                        axios.post('https://cnodejs.org/api/v1/topics', {
                            'accesstoken': AssToken.getAssToken(),
                            'title': that.title,
                            'tab': that.tab,
                            'content': that.content
                        }).then(function (response) {
                            console.log(response);
                            let instance = Toast('成功');
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                            resolve(response);
                        }).catch(function (error) {
                            console.error(error);
                            let instance = Toast('发送失败请检查');
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                            reject(new Error('请选择板块'));
                            reject(error);
                        });
                    }

                });
            }
        },
        activated(){ //重新切换回来这个页面执行
            this.refresh();
        }
    }
</script>
<style scoped>
    .mint-header {
        background: #70ACB1;
        position: fixed;
        width: 100%;
        top: 0;
    }

    .content {
        margin-top: 40px;
    }

    .selTab {
        -webkit-appearance: none;
        border: 1px solid #333;
        background: #fff;
        width: 50%;
        padding: 4px 10px;
        margin-left: 10px;
    }

    .selTab:focus {
        outline: none;
    }

    .action {
        margin-top: 20px;
        padding: 0 10px;
    }
</style>