<template>
    <div class="doodsbox">
        <h3>{{info.title}}</h3>
        <hr />
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script type="text/javascript">
     export default{
        name:'goodsdesc',
        data(){
            return{
                id:this.$route.params.id,
                info:{}
            }
        },
        created(){
            this.getgoodsdesc();
        },
        methods:{
            getgoodsdesc(){
                this.$http.get('api/goods/getdesc/'+this.id).then((res)=>{
                    console.log(res);
                    if(res.body.status==0){
                        this.info=res.body.message[0];
                    }
                })
            }
        }
     }
</script>
<style lang="less">
@r:50rem;
.doodsbox{
    padding:4/@r;
    h3{
        font-size: 16/@r;
        color:#226aff;
        text-align: center;
        margin:15/@r;
    }

}
    .content img{width:100%;}

</style>