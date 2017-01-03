<template>
    <div id="footer" class="footer">
        <mt-tabbar v-model="selected">

            <mt-tab-item id="list" href="#/list">
                <i slot="icon" class="icon-anchor"></i>
                首页
            </mt-tab-item>

            <mt-tab-item id="2">
                <i slot="icon" class="icon-mail-reply-all"></i>
                发表
            </mt-tab-item>
            <mt-tab-item id="3">
                <i slot="icon" class="icon-comments"></i>
                消息
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
                selected: '1'
            }
        },
        watch: {
        },
        mounted(){
            this.selected = this.$route.path.substring(1);
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