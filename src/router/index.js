import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main";
import GoodsList from "../views/GoodsList";
import GoodsDetail from "../views/GoodsDetail";
import Buy from "../views/Buy";
import Login from "../views/Login";
import Register from "../views/Register";
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path:'/',
      name:'home',
      component:Main
    },
    {
      path: '/goodslist',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/goodsdetail',
      name:'goodsdetail',
      component: GoodsDetail
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]

})

export default router
