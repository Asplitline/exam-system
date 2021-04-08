import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.less'
import './plugins/element'
// 自定义插件
import myPlugin from '@plugins/myPlugin'
Vue.use(myPlugin)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
