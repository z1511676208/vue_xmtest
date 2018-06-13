<template>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
        <!-- 谁使用谁传播lunbolist -->
        <!-- lunbolist父向子传值 -->
      <mt-swipe-item v-for="(item,index) in lunbolist" :key="item.id">
          <a :href="item.url" target="_blank"><img :class="{'full':isfull}" :src="item.img" alt="" /></a>
      </mt-swipe-item>
    </mt-swipe>
</template>
<script type="text/javascript">
     export default{
        name:'swiper',
        data(){
            return{
            }
        },
        created(){

        },
        methods:{

        },
        props:["lunbolist","isfull"]
     }
</script>
<style scoped lang="less">
@r:50rem;
    .mint-swipe{
        height: 200/@r;
        .mint-swipe-item{
            background-color: #fff;
            text-align: center;
        }
        img{height:100%;}
        .full{width:100%;}
    }
    .mui-media-body{
        font-size: 16/@r;
    }
    .mui-table-view-cell img{width:60/@r;height:60/@r;}
</style>