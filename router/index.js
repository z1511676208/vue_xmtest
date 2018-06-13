import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomeCon from '@/components/tarbar/HomeCon'
import MemberCon from '@/components/tarbar/MemberCon'
import SearchCon from '@/components/tarbar/SearchCon'
import Shopcar from '@/components/tarbar/Shopcar'
import newslist from '@/components/news/newslist'
import newsinfo from '@/components/news/newsinfo'
import photolist from '@/components/photos/photolist'
import photoinfo from '@/components/photos/photoinfo'
import goodslist from '@/components/goods/goodslist'
import goodsinfo from '@/components/goods/goodsinfo'
import goodsdesc from '@/components/goods/goodsDesc'
import goodscomment from '@/components/goods/goodsComment'

Vue.use(Router)

export default new Router({
  routes: [//配置路由规则
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'HomeCon',
      component: HomeCon
    },
    {
      path: '/member',
      name: 'MemberCon',
      component: MemberCon
    },
    {
      path: '/search',
      name: 'SearchCon',
      component: SearchCon
    },
    {
      path: '/shopcart',
      name: 'Shopcar',
      component: Shopcar
    },
    {
      path: '/home/newslist',
      name: 'newslist',
      component: newslist
    },
    {
      path: '/home/newsinfo/:id',
      name: 'newsinfo',
      component: newsinfo
    },
    {
      path: '/home/photolist',
      name: 'photolist',
      component: photolist
    },
    {
      path: '/home/photoinfo/:id',
      name: 'photoinfo',
      component: photoinfo
    },
    {
      path: '/home/goodslist',
      name: 'goodslist',
      component: goodslist
    },
    {
      path: '/home/goodsinfo/:id',
      name: 'goodsinfo',
      component: goodsinfo
    },
    {
      path: '/home/goodsdesc/:id',
      name: 'goodsdesc',
      component: goodsdesc
    },
    {
      path: '/home/goodscomment/:id',
      name: 'goodscomment',
      component: goodscomment
    }
  ],
  linkActiveClass:'mui-active'//覆盖默认高亮的类 router-lick-active
})
