// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui' 
//导入mint-ui按需加入
//import { Tabbar, TabItem ,Button , Header , Swipe, SwipeItem,Lazyload } from 'mint-ui';
import 'mint-ui/lib/style.css'
//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入vue-resource
import VueResource from 'vue-resource'

import moment from 'moment'

import Vuex from 'vuex'

//获取本地存储购物车的数据，进行数据类型转换
var car=JSON.parse(localStorage.getItem("car"))|| [];

//使用vuex
Vue.use(Vuex);
var store=new Vuex.Store({
    state:{//this.$store.state.count
        //跟组件的data一样
        //组件想访问state通过 this.$store.state.count;
        //不推荐通过组件直接操作数据
        //因为通过本地存储，可以一开始获取本地存储里的数据
        count:0,
        car:car//将购物车商品用数组存储起来，car数组存商品对象，将商品对象设计
        //{id:商品id,count:购买数量count,price:商品price,selectd:true}
    },
    mutations:{//this.$store.commit('increment')
        //注意，如果操作store里的值，只能通过mutations来调用，不推荐直接操作，万一导致数据的混乱，不能快速定位错位原因
        //第一个参数是state
        //组件需要调用mutations的放法，通过this.$store.commit('increment') increment:方法名
        //调用mutations方法的格式，和this.$emit('父组件的方法名')
        //mutations里的方法最多两个参数，其中，参数1是state状态，参数2我们通过commit提交过来的参数，多个参数可以通过对象和数组传递处理
        increment(state){
            state.count++;
        },
        addToCar(state,goodsinfo){
            //通过some查找，找到就中断
            var flag=false;
            state.car.some((item)=>{
                if(item.id==goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag=true;
                    return true;
                }
            })
            //如果查找完毕，flag还是false就push进去，否则不走push
            if(!flag){
                state.car.push(goodsinfo);
            }   

            //当更新car后，把car数组存到本地的localStorage
            localStorage.setItem('car',JSON.stringify(state.car))         
        },
        //购物车里更新数量
        undataGoodsInfo(state,goodsInfo){
            state.car.some((item)=>{
                if(item.id==goodsInfo.id){
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            })
            //当更新car后，把car数组存到本地的localStorage
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFormcar(state,id){
            //根据id进行删除store对象的数据
            state.car.some((item,i)=>{
                if(item.id==id){
                   state.car.splice(i,1);
                   return true; 
                }
            })
            //把删除后的car数组存到本地的localStorage
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        undataSelected(state,info){
            state.car.some((item,i)=>{
                if(item.id==info.id){
                   item.selected=info.selected
                   return true; 
                }
            })
            //新的状态保存
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.optCount
        //注意，这里getters只负责提供数据，不负责修改数据，如果要修改数据，请找mutations  获取最新count值
        //如果要调用使用， this.$store.getters.optCount
        optCount:function(state){
            return state.count;
        },
        getAllCount:function(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count;
            })
            return c;
        },
        //跟组件的过滤器比较像，因为过滤器不会修改数据，都是把原来数据做一些包装，提供给调用者
        getGoodscount(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o;
        },
        getGoodsSelected(state){
            var j={};
            state.car.forEach(item=>{
                j[item.id]=item.selected
            })
            return j;
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,//勾选的数量
                amount:0//勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.count*item.price;
                }
            })
            return o;
        }
    }
})

 //引入veu-preview
import VuePreview from 'vue-preview'
//使用vue-preview
Vue.use(VuePreview)

// VueResource 请求
Vue.use(VueResource)

// mint-ui的局部加载
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(Button.name, Button);
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);

Vue.use(MintUI)
Vue.config.productionTip = false


//定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

Vue.http.options.root = 'http://www.liulongbin.top:3005/';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
