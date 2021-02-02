import Vue from 'vue'

// 格式化日期
Vue.prototype.formatDate = function (date) {
    date = new Date(date)
    const year = date.getFullYear()
    const month = pad0(date.getMonth() + 1)
    const day = pad0(date.getDate())
    const hour = pad0(date.getHours())
    const minute = pad0(date.getMinutes())
    return year + '-' + month + '-' + day + '   ' + hour + ':' + minute
}

// 获取图片地址
Vue.prototype.bindSrc = function (src) {
    return 'http://localhost:8088/' + src
}

function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}

// 进行深拷贝
Vue.prototype.toConvert = function (data) {
    return JSON.parse(JSON.stringify(data))
}
