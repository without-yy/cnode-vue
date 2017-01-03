<template>
    <div id="footer" class="footer">
        <mt-tabbar v-model="selected">

            <mt-tab-item id="1" href="#/list">
                <img slot="icon" src="../assets/logo.png">
                首页
            </mt-tab-item>

            <mt-tab-item id="2">
                <img slot="icon" src="../assets/logo.png">
                发表
            </mt-tab-item>
            <mt-tab-item id="3">
                <img slot="icon" src="../assets/logo.png">
                消息
            </mt-tab-item>

            <mt-tab-item id="我的" href="#/user">
                <img slot="icon" src="../assets/logo.png">
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