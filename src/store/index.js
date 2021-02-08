import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

// 维护当前考试信息
// 维护当前用户信息
const store = new Vuex.Store({
    state: {
        problemList: [],
        postList: [],
        userList: JSON.parse(sessionStorage.getItem('userList')),
        contestList: JSON.parse(sessionStorage.getItem('contestList')),
        currentUser: JSON.parse(sessionStorage.getItem('userInfo')),
        currentContest: JSON.parse(sessionStorage.getItem('contestInfo'))
    },
    mutations: {
        initProblemList (state, list) {
            state.problemList = list
        },
        initPostList (state, list) {
            state.postList = list
        },
        initUserList (state, list) {
            sessionStorage.setItem('userList', JSON.stringify(list))
            state.userList = list
        },
        initContestList (state, list) {
            sessionStorage.setItem('contestList', JSON.stringify(list))
            state.contestList = list
        },
        initUser (state, data) {
            sessionStorage.setItem('userInfo', JSON.stringify(data))
            state.currentUser = data
        },
        initCurrentContest (state, data) {
            sessionStorage.setItem('contestInfo', JSON.stringify(data))
            state.currentContest = data
        }
    },
    getters: {
        getCurrentProblem: state => id => {
            return state.problemList.find(item => item.id === id)
        },
        getCurrentPost: state => id => {
            return state.postList.find(item => item.id === id)
        },
        getUserById: state => id => {
            return state.userList.find(item => item.id === id)
        },
        getContestById: state => id => {
            return state.contestList.find(item => item.id === id)
        }
    },
    actions: {
        setUserList ({ commit }) {
            Axios.get('/account/list').then(({ data }) => {
                commit('initUserList', data)
            })
        }
    }
})

export default store
