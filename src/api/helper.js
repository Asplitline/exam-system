import axios from 'axios'
import { URL_SERVE } from '@static'

const $http = axios.create({
    baseURL: URL_SERVE,
    timeout: 2000,
    withCredentials: false
})

// get 
export function _get (url, model = 1) {
    return function (params) {
        return $http.get(url, params)
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