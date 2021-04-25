import axios from 'axios'
import { URL_SERVER } from '@static'
const $http = axios.create({
    baseURL: URL_SERVER,
    timeout: 2000,
    withCredentials: false
})

/**
 * GET
 * @param {*} url
 * @param {*} mode
 * @returns
 */
export function _get (url, model = 1) {
    return function (params) {
        if (model) {
            return $http.get(url, { params })
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        } else if (model === 0) {
            return $http.get(`${url}/${params}`)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}

/**
 * POST
 * @param {*} url
 * @param {*} model
 * @returns
 */
export function _post (url, model = 1) {
    return function (params) {
        if (model === 1) {
            return $http.post(url, params)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        } else if (model === 0) {
            return $http.post(`${url}?${params}`)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}

/**
 * DELETE
 * @param {*} url
 * @param {*} model
 * @returns
 */
export function _delete (url, model = 1) {
    return function (params) {
        let URL
        if (model === 1) {
            URL = `${url}/${params}`
            return $http.delete(URL)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}

/**
 * PUT
 * @param {*} url
 * @param {*} model
 * @returns
 */
export function _put (url, model = 1) {
    return function (params) {
        return $http.put(url, params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}
