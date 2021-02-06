import Vue from 'vue'

// TODO>> 应该用过滤器实现
// 格式化日期
// Vue.prototype.formatDate = function (date) {
//     date = new Date(date)
//     const year = date.getFullYear()
//     const month = pad0(date.getMonth() + 1)
//     const day = pad0(date.getDate())
//     const hour = pad0(date.getHours())
//     const minute = pad0(date.getMinutes())
//     return year + '-' + month + '-' + day + '   ' + hour + ':' + minute
// }

Vue.filter('formatDate', date => {
    date = new Date(date)
    const year = date.getFullYear()
    const month = pad0(date.getMonth() + 1)
    const day = pad0(date.getDate())
    const hour = pad0(date.getHours())
    const minute = pad0(date.getMinutes())
    const second = pad0(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

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

// 获取简化版科目科目表
Vue.prototype.getMiniSubject = async function () {
    const size = sessionStorage.getItem('total') || 30
    const miniSubjects = {}
    const { data, status } = await this.$http.get(
        '/subject/api/pageSubjects',
        {
            params: {
                size
            }
        }
    )
    if (status === 200) {
        data.list.map(({ name, id }) => {
            miniSubjects[id] = name
        })
    } else {
        this.$message.error('请求失败')
    }
    return miniSubjects
}
