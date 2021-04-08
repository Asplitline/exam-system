import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.less'
import myPlugin from '@plugins/myPlugin'
// 富文本
Vue.config.productionTip = false
Vue.use(myPlugin)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
