const path = require('path')
function load (url) {
    return path.resolve(__dirname, url)
}

module.exports = {
    lintOnSave: true,
    chainWebpack: config => {
        // 配置生产阶段
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main.dev.js')
            // key - package中名字
            // value - 项目中变量名
            // import hljs from 'highlight.js'
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                'vue-quill-editor': 'VueQuillEditor',
                'highlight.js': 'hljs',
                "element-ui": "ElementUI"
            })
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        // 配置开发阶段出口
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.dev.js')
            // 定制首页样式
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })

        config.resolve.alias
            .set('@components', load('./src/components'))
            .set('@static', load('./src/static'))
            .set('@css', load('./src/assets/css'))
            .set('@api', load('./src/api'))
            .set('@mixins', load('./src/mixins'))
            .set('@utils', load('./src/utils'))
            .set('@plugins', load('./src/plugins'))
            .set('@store', load('./src/store'))
    }
}