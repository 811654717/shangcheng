import Vue from 'vue'
import Router from 'vue-router'


import Head from '../components/shouye/Head'
import commodityManagement from '../components/commodityManagement/commodity' //商品管理
import jurisdiction from '../components/rolePermission/jurisdiction' //角色权限
import Audit from '../components/AuditCenter/AuditCenter' //审核中心
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
        { path: 'jurisdiction', component: jurisdiction, name: 'jurisdiction' },
        { path: 'Audit', component: Audit, name: 'Audit' },
      ]
    },
  ]

})
