<template>
    <div class="goods-list">
        <!-- 第一种通过router-link标签跳转 -->
        <!-- <router-link tag="div" :to="'/home/goodsinfo/'+item.id" class="goods-item" v-for="(item,index) in goodslist" :key="index">
            <img :src="item.img_url" alt="" />
            <h2>{{item.title}}</h2>
            <div class="ginfo">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <!-- 第二种通过js跳转 -->
        <div class="goods-item" v-for="(item,index) in goodslist" :key="index" @click="godetail(item.id)">
            <img :src="item.img_url" alt="" />
            <h2>{{item.title}}</h2>
            <div class="ginfo">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <!-- <div class="goods-item">
            <img src="http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg" alt="" />
            <h2>标题标题标题标题标题标题标题标题</h2>
            <div class="ginfo">
                <p class="price">
                    <span class="now">￥1000.00</span>
                    <span class="old">￥3000.30</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩30件</span>
                </p>
            </div>
        </div> -->
        <mt-button type="danger" size="large" @click="getnextgoodslist">加载更多</mt-button>

    </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
     export default{
        name:'goodslist',
        data(){
            return{
                pageIndex:1,
                goodslist:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+this.pageIndex).then((res)=>{
                    console.log(res)
                    if(res.body.status==0){
                        this.goodslist=this.goodslist.concat(res.body.message);
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 3000
                        });
                    }
                })
            },
            getnextgoodslist(){
                this.pageIndex++;
                this.getGoodsList();
            },
            godetail(id){
                //注意：区分this.$route和this.router这两个对象，
                //其中this.$route是路由参数对象，所以路由参数，params，path属于它
                //其中，this.$router是一个路由导航对象，使用js代码，用它可以方便使用前进后台，跳转链接
                this.$router.push('/home/goodsinfo/'+id);
            }
        }
     }
</script>
<style lang="less" scoped>
@r:50rem;
    .goods-list{
        display:flex;
        flex-wrap:wrap;
        padding:6/@r;
        justify-content:space-between;
        .goods-item{
            width:49%;
            border:1px solid #e4e4e4;
            margin-bottom: 8/@r;
            box-shadow: 0 0 8/@r #ddd;
            img{width:100%;}
            padding:2/@r;
            min-height: 285/@r;
            display:flex;
             flex-direction: column ;
             justify-content:space-between;
            h2{
                font-size: 14/@r;
            }
            .ginfo{
                background-color: #f1f1f1;
                p{margin:0;padding:0/@r 5/@r 5/@r 5/@r;}
                .price{
                    .now{
                        color:red;
                        font-weight: 600;
                        font-size: 15/@r;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12/@r;
                        margin-left: 10/@r;
                    }
                }
                .sell{
                    display:flex;
                    font-size: 12/@r;
                    justify-content: space-around;
                }
            }
        }
    }
</style>