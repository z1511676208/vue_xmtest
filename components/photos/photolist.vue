<template>
    <div>
        <!-- <p>顶部滑动条quyu </p> -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in categorylist" :key="item.id" @tap="getphotoslist(item.id)">
                    {{item.title}}
                </a>
            </div>
        </div>
        <ul class="ptlist">
            <router-link v-for="(item,index) in list" :key="index" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url" width="100%">
                <div class="ptinfo">
                    <p class="ptinfo-title">{{item.title}}</p>
                    <p class="ptinfo-body">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>

    </div>
</template>
<script type="text/javascript">
    // 引入muijs
    import mui from '../../lib/mui/js/mui.min.js'
    import { Toast } from 'mint-ui';
    
    export default{
        name:'photolist',
        data(){
            return{
                categorylist:[],
                list:[]//获取图片地址
            }
        },
        created(){
            this.getimgcategory();
            this.getphotoslist(0);
        },
        mounted() {
            // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
            // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
            // 2. 初始化滑动控件
            mui(".mui-scroll-wrapper").scroll({
              deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getimgcategory(){
                this.$http.get('api/getimgcategory').then((res)=>{
                    console.log(res);
                    if(res.body.status==0){
                        res.body.message.unshift({title:'全部',id:0})
                        this.categorylist=res.body.message;
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 3000
                        });
                    }
                })
            },
            getphotoslist(cateId){
                this.$http.get('api/getimages/'+cateId).then((res)=>{
                    console.log(res);
                    if(res.body.status==0){
                        this.list=res.body.message;
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 3000
                        });
                    }
                })
            }
        }
        
    }
</script>
<style lang="less" scoped>
@r:50rem;
    *{touch-action:pan-y;}
    .ptlist{
        padding:10/@r;
       
        padding-bottom: 0;
        li{
            background-color: #ccc;
            position:relative;
            text-align: center;
            margin-bottom: 10/@r;
            box-shadow: 0 0 9/@r #999;
            img{
                vertical-align: middle;
            }
            img[lazy=loading] {
              width: 40px;
              height: 300px;
              margin: auto;
            }
        }
    }
    .ptinfo{
        position:absolute;
        bottom:0;
        max-height: 86/@r;
        padding:4/@r;
        background-color: rgba(0,0,0,.2);
        p{margin-bottom: 0;color:#fff;text-align: left;}
        .ptinfo-title{
            font-size: 14/@r;
        }
        .ptinfo-body{
            font-size: 12/@r;
        }
    }
    .mui-bar~.mui-content .mui-fullscreen {
                top: 44px;
                height: auto;
            }
            
    .mui-pull-top-tips {
        position: absolute;
        top: -20px;
        left: 50%;
        margin-left: -25px;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        z-index: 1;
    }
    .mui-slider-indicator.mui-segmented-control[data-v-55e1dba5]{
        background-color: #f9f9f9;
    }
    
</style>