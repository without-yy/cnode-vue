<template>
    <div>
        <div v-html="content.content"></div>
    </div>
</template>

<script>

    import axios from 'axios'
    export default{
        data(){
          return{
              id:'',
              content:{}
          }
        },
        methods:{
            getContent(cb){
                let that = this;
                axios.get(`https://cnodejs.org/api/v1/topic/${that.id}`).then((res) => {
                    if (cb) {
                        cb(res.data.data);
                        return;
                    }
                    that.content = res.data.data;
                    console.log(that.content);
                    return true;
                });
            },
        },
        mounted(){
            this.id = this.$route.params.id;
            console.log(this.id);
            this.getContent();

        }
    }
</script>