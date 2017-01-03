<template>
    <div id="content" class="contentBox">
        <!--标题-->
        <mt-header title="详情">
            <router-link to="/list" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!--loading-->
        <div class="loading" v-show="isLoading">
            <mt-spinner :size="30" type="triple-bounce"></mt-spinner>
        </div>

        <div class="markdownBox" v-if="!isLoading">
            <h2 v-text="content.title"></h2>
            <p v-show="!isLoading">发布于<span>{{getTime(content.create_at)}}</span> 作者:<span>{{content.author.loginname}}</span> <span>{{content.visit_count}}次浏览</span></p>
            <div  v-html="content.content"></div>

            <!--回复信息-->

            <div class="replyBox" v-if="content.reply_count>0">
                <p class="reply-count">{{content.reply_count}}条回复</p>
                <ul class="replyList">
                    <li v-for="(item,key) in content.replies">
                        <p class="replyItem">
                            <img :src="item.author.avatar_url">
                            <span>{{item.author.loginname}}</span>
                            <span>{{key+1}}楼</span>
                            <span>{{getTime(item.create_at)}}</span>
                        </p>
                        <p v-html="item.content"></p>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data(){
            return {
                id: '',
                title: 'hahha',
                isLoading:true,
                content: {}
            }
        },
        methods: {
            getContent(cb){
                let that = this;
                axios.get(`https://cnodejs.org/api/v1/topic/${that.id}`).then((res) => {
                    if (cb) {
                        cb(res.data.data);
                        return;
                    }
                    that.content = res.data.data;
                    this.isLoading = false;
                    return true;
                });
            },
            refresh(){
                this.isLoading = true;
                this.content = {};
                this.id = this.$route.params.id;
                this.getContent();

            },
            getTime(str){//2016-11-03T10:07:10.155Z
                let time = new Date(str);
                let now = new Date();
                if (time.getFullYear() != now.getFullYear()) {
                    return now.getFullYear() - time.getFullYear() + '年前'
                }
                if (time.getMonth() != now.getMonth()) {
                    return now.getMonth() - time.getMonth() + '月前';
                }
                if (time.getDate() != now.getDate()) {
                    return now.getDate() - time.getDate() + '天前';
                }
                if (time.getHours() != now.getHours()) {
                    return now.getHours() - time.getHours() + '小时前';
                }
                if (time.getMinutes() != now.getMinutes()) {
                    return now.getMinutes() - time.getMinutes() + '分钟前';
                }
                if (time.getSeconds() != now.getSeconds()) {
                    return now.getSeconds() - time.getSeconds() + '秒前';
                }
                return 'Now';
            }
        },
        mounted(){
            this.refresh();
        },
        activated(){
            this.refresh();
        }
    }
</script>
<style scoped>
    @import url('../assets/css/markdown.css');
    .loading{
        width: 40px;
        margin: 0 auto;
    }
    .contentBox{
        padding-top: 40px;
        padding-bottom: 55px;
    }
    .markdownBox{
        padding: 0 10px;
    }
    .mint-header{
        background: #369;
        position: fixed;
        width: 100%;
        top: 0;
    }
    .replyBox{
        background: #f6f6f6;
    }
    .replyList li{
        padding: 5px 10px;
        border-top: 1px solid #e0e0e0;
    }
    .replyItem img{
        width: 30px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .replyItem span{
        vertical-align: middle;
        margin-top: 3px;
        font-size: 13px;
    }
    .reply-count{
        padding-top: 20px;
        padding-left: 10px;
    }
</style>