<template>
    <div id="footer" class="footer">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="list" href="#/list">
                <i slot="icon" class="icon-anchor"></i>
                首页
            </mt-tab-item>
            <mt-tab-item id="create" href="#/create">
                <i slot="icon" class="icon-mail-reply-all"></i>
                发表
            </mt-tab-item>
            <mt-tab-item id="mytopic" href="#/mytopic">
                <i slot="icon" class="icon-comments"></i>
                主题
            </mt-tab-item>

            <mt-tab-item id="user" href="#/user">
                <i slot="icon" class="icon-user"></i>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                selected: ''
            }
        },
        watch: {
            $route(){
//                this.selected = this.$route.path.substring(1);
                this.selected = this.$route.path.split('/')[1];
            }
        },
        mounted(){
            this.selected = this.$route.path.split('/')[1];
        }
    }
</script>
<style scoped>
    .footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
    }


</style>