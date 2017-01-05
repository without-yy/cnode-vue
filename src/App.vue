<template>
    <div id="app">
        <keep-alive include="List">
            <router-view></router-view>
        </keep-alive>
        <!--底部tabbar-->
        <FooterBar></FooterBar>
    </div>
</template>

<script>
    import FooterBar from './components/Footer.vue'
    export default {
        name: 'app',
        data () {
            return {}
        },
        components: {
            FooterBar
        }
    }
</script>