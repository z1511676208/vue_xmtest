<template>
    <div>
        <cmtbox :id="id"></cmtbox>
    </div>
</template>
<script type="text/javascript">
import cmtbox from '../subcomponents/comment.vue'
     export default{
        name:'goodscomment',
        data(){
            return{
                id:this.$route.params.id,
                goodscomment:{}
            }
        },
        created(){

        },
        methods:{

        },
        components:{
            cmtbox
        }
     }
</script>
<style lang="less" scoped>
    
</style>