import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@js/filters.js'
import 'reset.css'
import 'lib-flexible'
// axios 引入
import axios from 'axios'
//axios拦截器解决深度问题
import '@js/axios.config.js'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
