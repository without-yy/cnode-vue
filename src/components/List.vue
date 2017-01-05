<template>

    <div>
        <!--tab切换-->
        <div class="header">
            <mt-navbar v-model="selected">
                <mt-tab-item id="all">全部</mt-tab-item>
                <mt-tab-item id="good">精华</mt-tab-item>
                <mt-tab-item id="ask">问答</mt-tab-item>
                <mt-tab-item id="share">分享</mt-tab-item>
                <mt-tab-item id="job">招聘</mt-tab-item>
            </mt-navbar>
        </div>
        <!--内容区域-->
        <div class="content">
            <!--加载动画-->
            <div v-if="isLoading" class="loading">
                <mt-spinner :size="30" type="triple-bounce"></mt-spinner>
            </div>

            <div class="loadingList" id="loadingList" @touchend="doScroll">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded"
                             :auto-fill="false"
                             :topLoadingText="''" :bottomLoadingText="''" ref="loadmore">
                    <ul class="list">
                        <li v-for="(item,key) in list">
                            <a class="gotoContent" :href="'#/topic/'+item.id">
                                <div>
                                    <p class="item-title">
                                    <span class="tip">
                                        <span class="top" v-if="item.top">置顶</span>
                                        <span class="tabClass" v-show="selected=='all'" v-if="(!item.top)">{{classes[item.tab]}}</span>
                                    </span>
                                        <span>{{item.title}}</span>
                                    </p>
                                    <div class="authorInfo">
                                        <p class="flex2">
                                            <img class="author-photo" :src="item.author.avatar_url" alt="">
                                            <span class="author-name">{{item.author.loginname}}</span>
                                        </p>
                                        <p class="flex1 reply">
                                            <span class="replyCount">{{item.reply_count}}</span>
                                            <span>/</span>
                                            <span class="visitCount">{{item.visit_count}}</span>
                                        </p>
                                        <p class="flex1 replyTime">
                                            <span>{{getTime(item.last_reply_at)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                selected: 'all',
                isLoading: true,//判断是否显示加载图标
                list: [],
                bottomAllLoaded: false,
                page: 1, //页数
                tab: '', //分类
                classes: {//存储分类的变量
                    ask: '问答',
                    share: '分享',
                    job: '招聘',
                    good: '精华'
                },
                scrollTop: 0
            }
        },
        methods: {
            loadTop(){
                this.page = 1;
                let that = this;
                this.getContent((data) => {
                    that.list = data;
                    this.$refs.loadmore.onTopLoaded();

                });
            },
            loadBottom(){
                this.page++;
                let that = this;
                this.getContent((data) => {
                    for (let i = 0, len = data.length; i < len; i++) {
                        that.list.push(data[i]);
                    }
                    this.$refs.loadmore.onBottomLoaded();
                });
            },
            getContent(cb){
                let that = this;
                axios.get(`https://cnodejs.org/api/v1/topics?page=${that.page}&tab=${that.tab}&limit=20`).then((res) => {
                    if (cb) {
                        cb(res.data.data);
                        return;
                    }
                    return true;
                });
            },
            changeTab(){
                let that = this;
                this.tab = this.selected;
                if (this.selected == 'all') {
                    this.tab = '';
                }
                this.page = 1;
                this.list = [];
                this.isLoading = true;
                this.getContent((data) => {
                    that.list = data;
                    that.isLoading = false;
                });
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
            },
            doScroll(e){
                this.scrollTop = document.getElementById('loadingList').scrollTop;
            }
        },
        mounted(){

            let that = this;
            //加载数据
            this.getContent((data) => {
                that.list = data;
                that.isLoading = false;
                console.log(data);
            });
            //设置list高度
            document.getElementById('loadingList').style.height = window.innerHeight - 46 - 55 + 'px';
        },
        watch: {
            selected: 'changeTab'
        },
        activated(){
            document.getElementById('loadingList').scrollTop = this.scrollTop;
        }
    }
</script>
<style scoped>
    .header {
        margin-bottom: 3px;
    }

    .loading {
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }

    .loadingList {
        overflow-y: scroll;
    }

    .list {
        height: 100%;
    }

    .loading .mint-loadmore-content {
        height: 95%;
    }

    .loadingList li {
        margin: 10px 5px;
        background-color: #eee;
        padding: 10px 10px 3px 10px;
        border-radius: 4px;
    }

    .item-title {
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*width: 100%;*/
        /*font-size: 1rem;*/
        margin: 0;
        padding-bottom: 10px;
        line-height: 1.5rem;
    }

    .author-photo {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
    }

    .author-name {
        display: inline-block;
        line-height: 25px;
        vertical-align: middle;
        padding-left: 5px;
        padding-top: 5px;
        font-size: 0.9rem;
    }

    .create {
        font-size: 0.9rem;
        float: right;
        padding-right: 10px;
        margin-top: 10px;
    }

    .tip {
        margin-right: 5px;
    }

    .top {
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        font-size: 0.9rem;
    }

    .tabClass {
        background: #e5e5e5;
        color: #999;
        padding: 2px 4px;
        border-radius: 3px;
    }

    .authorInfo {
        display: flex;
    }

    .reply {
        text-align: center;
        font-size: 0.9rem;
        vertical-align: middle;
        margin-top: 23px;
    }

    .replyTime {
        text-align: center;
        font-size: 0.9rem;
        vertical-align: middle;
        margin-top: 23px;
    }

    .replyCount {
        color: #9e78c0;
    }

    .visitCount {
        color: #b4b4b4;
    }

    .flex1 {
        flex: 1;
    }

    .flex2 {
        flex: 2;
    }

    .gotoContent {
        color: #000;
        text-decoration: none;
    }
</style>