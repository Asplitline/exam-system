import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import './plugins/function'
import './assets/fonts/iconfont.css'
import axios from 'axios'
// 富文本
import VueQuillEditor from 'vue-quill-editor'

// 代码高亮
import hljs from 'highlight.js'

Vue.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
Vue.use(VueQuillEditor /* { default global options } */)

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
    store,
    router,
    render: h => h(App)
}).$mount('#app')
