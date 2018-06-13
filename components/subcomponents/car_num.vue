<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" @change="countChange" type="number" :value="initcount" ref="numbox" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

</template>
<script type="text/javascript">
import mui from '../../lib/mui/js/mui.min.js'
     export default{
        name:'number',
        data(){
            return{

            }
        },
        mounted(){
            //初始化数字选择框
            mui(".mui-numbox").numbox();

        },
        watch:{
            /*'max':function(newVal,oldVal){
                mui(".mui-numbox").numbox().setOption('max',newVal)
            }*/
        },
        methods:{
            countChange(){
                //改成就传递给父组件
                console.log(this.$refs.numbox.value);
                var goodsInfo={
                    id:this.goodsId,
                    count:this.$refs.numbox.value
                }
                this.$store.commit('undataGoodsInfo',goodsInfo)
            }
        },
        props:['max','initcount',"goodsId"]
     }
</script>
<style lang="less" scoped>
    @r:50rem;
    .mui-numbox{height:25/@r;}
</style>