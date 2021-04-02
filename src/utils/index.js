import { REG_EMAIL, REG_PHONE, URL_SERVER } from '@static'

/**
 * 校验邮箱
 */
export function checkEmail (rule, value, callback) {
    if (REG_EMAIL.test(value)) return callback()
    callback(new Error('邮箱不合法'))
}
/**
 * 校验手机
 */
export function checkPhone (rule, value, callback) {
    if (REG_PHONE.test(value)) return callback()
    callback(new Error('手机号码不合法'))
}
/**
 * 校验分数
 */
export function checkScore (rule, value, callback) {
    if (!Number.isInteger(value)) {
        callback(new Error('请输入数值'))
    } else {
        if (value < 0) {
            callback(new Error('分数不能小于0'))
        } else if (value > 50) {
            callback(new Error('分数不能大于50'))
        } else {
            callback()
        }
    }
}
/**
 * 绑定服务器端地址
 * @param {String} url
 * @returns
 */
export function bindURL (url) {
    return URL_SERVER + '/' + url
}
/**
 * 设置SessionStorage
 * @param {String} name
 * @param {Object|Array} data
 */
export function setSessionStorage (name, data) {
    sessionStorage.setItem(name, JSON.stringify(data))
}
/**
 * 获取SessionStorage
 * @param {String} name
 * @returns
 */
export function getSessionStorage (name) {
    return sessionStorage.getItem(name) && JSON.parse(sessionStorage.getItem(name))
}

/**
 * 根据当前时间获取考试状态
 * @param {Date} data
 * @returns
 */
export function getCurrentByDate (data) {
    data && data.forEach((item) => {
        if (item.startTime > Date.now()) item.current = 0
        else if (item.endTime < Date.now()) item.current = 2
        else item.current = 1
    })
    return data
}

/**
 * 简单深拷贝
 */
export function convertDeepCopy (data) {
    return JSON.parse(JSON.stringify(data))
}
/**
 * 转换URL
 * @param {Object} data
 * @returns
 */
export function convertURL (data) {
    const params = []
    for (const key in data) {
        params.push(`${key}=${data[key]}`)
    }
    return params.join('&')
}
/**
 * 获取uid
 */
export function getUid () {
    return Date.now() % 999999999
}
/**
 * 补0
 */
export function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}