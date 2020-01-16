import Vue from 'vue'
import Router from 'vue-router'


import Head from '../components/shouye/Head'
import commodityManagement from '../components/commodityManagement/commodity' //商品管理
import discountCoupon from '../components/PrivilegeManagement/discountCoupon' //优惠券管理
import orderForm from '../components/orderForm/orderForm' //订单管理
import login from '../login/login'

Vue.use(Router)
export default new Router({
  routes: [
    { path: '/login', component: login, hidden: true },
    //重定向
    { path: '/', redirect: '/head' },
    {
      path: '/head', component: Head, name: 'head', children: [
        { path: 'commodity', component: commodityManagement, name: 'commodity' },
        { path: 'discountCoupon', component: discountCoupon, name: 'discountCoupon' },
        { path: 'order', component: orderForm, name: 'order' },
      ]
    },
  ]

})
