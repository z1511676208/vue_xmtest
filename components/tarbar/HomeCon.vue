<template>
    <div class="">
        <!-- <p>首页</p> -->
        <!-- 轮播图 -->
        <swiper-box :lunbolist="lunbolist" :isfull="true"></swiper-box>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../image/menu1.png" alt="" />
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                   <img src="../../image/menu2.png" alt="" />
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../image/menu3.png" alt="" />
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../image/menu4.png" alt="" />
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../image/menu5.png" alt="" />
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../image/menu6.png" alt="" />
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>
<script type="text/javascript">
import swiper from '../subcomponents/swiper'
import { Toast } from "mint-ui"
     export default{
        name:"HomeCon",
        data(){
            return{
                lunbolist:[]
            }
        },
        created(){
            this.getlunbotu();
        },
        methods:{
            getlunbotu(){//获取轮播图
                let that=this;
                that.$http.get('api/getlunbo').then(res=>{
                    console.log(res)
                    if(res.body.status==0){
                        that.lunbolist=res.body.message;
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 5000
                        });
                    }
                })
            }
        },
        components:{
            "swiper-box":swiper
        }
     }
</script>
<style scoped lang="less">
@r:50rem;
    .mint-swipe{
        height: 200/@r;
        .mint-swipe-item{
            background-color: #ccc;
        }
        img{width:100%;height:100%;}
    }
    .mui-media-body{
        font-size: 16/@r;
    }
    .mui-table-view-cell img{width:60/@r;height:60/@r;}
</style>