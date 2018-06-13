<template>
    <div class="goodsinfo-container">
        <!-- <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition> -->
        <transition name="donghau1" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="flag" ref="ball"></div>
        </transition>
        <!-- 商品详情轮播图 -->
        <swiper-box :lunbolist="lunbolist" :isfull="false"></swiper-box>
        <!-- 商品购买内容区 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now-price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <!-- 通过watch监听 -->
                    <p class="num">
                        购买数量：<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品评论 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goodsDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goodsComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>
<script type="text/javascript">
import swiper from '../subcomponents/swiper';
import numberbox from '../subcomponents/goodsinfo_num.vue';
import { Toast } from 'mint-ui';
     export default{
        name:'goodsinfo',
        data(){
            return{
                pageIndex:1,
                lunbolist:[],//轮播图数据
                id:this.$route.params.id,//路由获取id
                goodsinfo:{},//商品信息
                flag:false,//控制小球显示隐藏
                selectedCount:1//保存用户数量
            }
        },
        created(){
            this.getlunbotu();
            this.getGoodsInfo();//调用
        },
        
        methods:{
            getlunbotu(){
                this.$http.get('api/getthumimages/'+this.id).then((res)=>{
                    if(res.body.status==0){
                        res.body.message.forEach((item)=>{
                            item.img=item.src;
                        })
                        this.lunbolist=res.body.message;
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.id).then((res)=>{
                    if(res.body.status==0){
                        this.goodsinfo=res.body.message[0];
                    }
                })
            },
            goodsDesc(id){
                //点击使用编程时导航跳转,图文介绍
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goodsComment(id){
                //点击使用编程时导航跳转,评论
                 this.$router.push({name:'goodscomment',params:{id}})
            },
            addToShopCar() {
              // 添加到购物车
              this.flag = !this.flag
              // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
              // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
              var goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
              };
              // 调用 store 中的 mutations 来将商品加入购物车
              this.$store.commit("addToCar", goodsinfo);
            },
            beforeEnter(el) {
              // beforeEnter 表示动画入场之前
              // 设置小球开始动画之前的，起始位置
              el.style.transform = "translate(0, 0)";
            },
            enter(el, done){             
              // 可以认为 el.offsetWidth 会强制动画刷新
              el.offsetWidth
              // enter 表示动画 开始之后的样式，这里，可以设置小球完成动画之后的，结束状态
              // 获取小球的 在页面中的位置
              console.log(this.$refs)
              //小球
              const ballPosition = this.$refs.ball.getBoundingClientRect();
              //徽标
              const badgePosition=document.getElementById("badge").getBoundingClientRect();
              const xDist = badgePosition.left - ballPosition.left;
              const yDist = badgePosition.top - ballPosition.top;

              el.style.transform = `translate(${xDist}px, ${yDist}px)`;
              //el.style.transform = "translate(93px, 260px)"
              el.style.transition = 'all 1s ease'

              // 这里的 done， 起始就是 afterEnter 这个函数，也就是说：done 是 afterEnter 函数的引用
              done()
            },
            afterEnter(el){
              // 动画完成之后，会调用 afterEnter
              this.flag = !this.flag
            },
            getSelectedCount(count){
                //自组件把选中的值传给父
                this.selectedCount=count;
                console.log('父'+count)
            }
        },
        components:{
            "swiper-box":swiper,
            numberbox
        }
     }
</script>
<style lang="less" scoped>
@r:50rem;
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16/@r;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15/@r 0;
    }
  }

  .ball {
    width: 15/@r;
    height: 15/@r;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 360/@r;
    left: 146/@r;
  }
}
</style>