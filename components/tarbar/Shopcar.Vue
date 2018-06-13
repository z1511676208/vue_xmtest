<template>
    <div class="carcon">
        <p>{{$store.getters.getGoodsSelected}}</p>
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selecteChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="" />   
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodscount[item.id]" :goodsId="item.id"></numbox>
                                <!-- 如何从购物车获取商品数量 -->
                                <!-- 创建一个空对象，然后循环购物车所有数据，吧当前id作为对象属性名，count作为对象的属相值，这样就可以把所以商品循环一遍，得到一个对象{88：2，88：9} -->
                                <a href="" @click.prevent="remove(item.id,i)">删除{{$store.getters.getGoodscount[item.id]}}</a>
                            </p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner alljisuan">
                    <div class="tongji">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import numbox from '../subcomponents/car_num.vue'
     export default{
        name:"Shopcar",
        data(){
            return{
                goodslist:[]
            }
        },
        created(){
            this.getgoodslist();
        },
        methods:{
            getgoodslist(){
                //获取store里所有商品id，然后拼接用,分割
                var idArr=[];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id);
                })
                if(idArr.length<=0){
                    return;//不存在数据，直接返回，否则报错
                }
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then((res)=>{
                    console.log(res)
                    if(res.body.status==0){
                        this.goodslist=res.body.message;
                    }
                })
            },
            remove(id,i){
                //删除操作
                //删除goodslist的，再删除store里的car
                this.goodslist.splice(i,1);
                this.$store.commit('removeFormcar',id)
            },
            selecteChange(id,val){
                //点击开关，把最新的状态同步到store
                console.log(id+','+val)
                this.$store.commit('undataSelected',{id:id,selected:val});
            }


        },
        components:{
            numbox
        }
     }
</script>
<style scoped lang="less">
@r:50rem;
    .carcon{
        background-color: #eee;
        overflow:hidden ;
        .goods-list{
            .mui-card-content-inner{
                display:flex;
                align-item:center;
            }
            img{
                width:60/@r;
                height:60/@r;
            }
            h3{
                font-size: 13/@r;
                margin-bottom: 10/@r;
            }
            .price{
                color:red;font-weight: bold;
            }
        }
    }
    .alljisuan{
        display:flex;
        justify-content:space-between;
        align-item:center;
        font-size: 14/@r;
        .red{
            color:red;
            font-size: 16/@r;
            font-weight: bold;
        }
    }
</style>