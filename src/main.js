import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './plugins/element'
import './plugins/function'
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false

// 配置axios
// 配置基础路径
axios.defaults.baseURL = 'http://127.0.0.1:8088/'

// 请求拦截
axios.interceptors.request.use(conf => {
  return conf
})
// 相应拦截
axios.interceptors.response.use(conf => {
  return conf
})
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
