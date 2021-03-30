import axios from 'axios'
import { URL_SERVER } from '@static'
const $http = axios.create({
    baseURL: URL_SERVER,
    timeout: 2000,
    withCredentials: false
})

// get 
export function _get (url, model = 1) {
    return function (params) {
        return $http.get(url, { params })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

export function _post (url, model = 1) {
    return function (params) {
        return $http.post(url, params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

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
