// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import filters from './filter'
// 全局注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 引入 meta组件
import VueMeta from 'vue-meta'

//引入iView
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//引入图标样式
import './assets/iconfont.css';

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// axios.defaults.baseURL = 'https://www.baiduyuyue.com/management'; //线上地址
axios.defaults.baseURL = 'http://192.168.0.190:8080'; //测试地址

Vue.use(Vuex)

Vue.use(VueMeta)
Vue.config.productionTip = false
const store = new Vuex.Store({
  state: {
    name: '首页',//存储点击的值
  },
  mutations: {
    click(state, u) {
      state.name = u;
      // console.log(state.name)
    }
  }
})
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  if (to.path === '/login') {
    console.log(1)
    console.log(sessionStorage.getItem('auditorId'));
    console.log(sessionStorage.getItem('abc'));
    next()
  } else {
    if (sessionStorage.getItem('auditorId')) {
      console.log(sessionStorage.getItem('auditorId'));      
      console.log('正确')
      next()
      // next({})
    } else {
      console.log('错误')
      next({ path: '/login' })
    }

  }
  // if (to.path === '/login') {
  //    next() 
  //   }else {   //进入的不是登录路由
  //   if (!sessionStorage.getItem('accessToken')) {
  //      next({ path: '/login' }) 
  //     }else { next() }
  // }
})

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
