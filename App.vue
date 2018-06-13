<template>
  <div id="app">
    <!-- 顶部 -->
    <!-- <mt-header fixed title="易看易购"></mt-header>-->    
    <mt-header fixed title="易看易购">
      <span slot="left" @click="goback" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
      <mt-button icon="more" slot="right" v-show="fnone"></mt-button>
    </mt-header>
    <!-- 中间路由存放 -->
    <transition>
      <router-view/>
    </transition>
    <!-- 底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-ex" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-ex" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-ex" to="/shopcart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-ex" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return{
      flag:false,
      fnone:false
    }
  },
  created(){
    console.log(this.$router);
    this.flag=this.$router.history.current.path=='/home'?false:true
  },
  watch:{
    "$route.path":function(newVal){
      console.log(this.$router.path);
      if(newVal=="/home"){
        this.flag=false;
      }else{
        this.flag=true;
      }
    }
  },
  methods:{
    //点击后退
    goback(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less">
@r:50rem;
.mint-header.is-fixed{z-index: 99;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding-top: 40/@r;
  padding-bottom: 50/@r;
  overflow-x: hidden;
}
body,.mui-grid-view.mui-grid-9{background-color: #fff;}
*{margin:0;padding:0;}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{border:0;}
.v-enter{
  opacity: 0;
  transform: translateX(100%);  
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position:absolute;
}
.v-enter-active,
.v-leave-active{
  transition: all .5s ease;
}
.mui-bar-tab .mui-tab-item-ex.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-ex {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-ex .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-ex .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
