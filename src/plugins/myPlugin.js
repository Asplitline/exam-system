import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { pad0 } from '@utils'
const myPlugin = {}

myPlugin.install = function (Vue) {
    Vue.directive('focus', {
        inserted (el) {
            el.querySelector('input').focus()
        }
    })

    Vue.filter('formatDate', (date, model = 0) => {
        date = new Date(date)
        const year = date.getFullYear()
        const month = pad0(date.getMonth() + 1)
        const day = pad0(date.getDate())
        const hour = pad0(date.getHours())
        const minute = pad0(date.getMinutes())
        const second = pad0(date.getSeconds())
        if (model === 0)
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        else if (model === 1)
            return `${year}-${month}-${day}`
    })

    Vue.directive('highlight', function (el) {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    })

}

export default myPlugin