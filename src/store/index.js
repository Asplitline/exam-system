import Vue from 'vue'
import Vuex from 'vuex'
import { _getSubjectList, _getUser, _getContestList, _getProblemList } from '@api'
import { getSessionStorage, setSessionStorage } from '@utils'
Vue.use(Vuex)
// state
const state = {
    currentUser: getSessionStorage('currentUser'),
    allSubject: getSessionStorage('allSubject'),
    currentAIndex: sessionStorage.getItem('currentAIndex'),
    currentHIndex: sessionStorage.getItem('currentHIndex'),
    isIndex: sessionStorage.getItem('isIndex'),
    allUser: getSessionStorage('allUser'),
    currentPost: getSessionStorage('currentPost'),
    currentProblem: getSessionStorage('currentProblem'),
    currentContest: getSessionStorage('currentContest'),
    allContest: getSessionStorage('allContest'),
    allProblem: getSessionStorage('allProblem')
}
// mutations
const mutations = {
    setCurrentUser (state, data) {
        setSessionStorage('currentUser', data)
        state.currentUser = data
    },
    setAllSubject (state, data) {
        setSessionStorage('allSubject', data)
        state.allSubject = data
    },
    setCurrentAIndex (state, index) {
        setSessionStorage('currentAIndex', index)
        state.currentAIndex = index
    },
    setCurrentHIndex (state, index) {
        setSessionStorage('currentHIndex', index)
        state.currentHIndex = index
    },
    setAllUser (state, data) {
        setSessionStorage('allUser', data)
        state.allUser = data
    },
    setCurrentPost (state, data) {
        setSessionStorage('currentPost', data)
        state.currentPost = data
    },
    setCurrentProblem (state, data) {
        setSessionStorage('currentProblem', data)
        state.currentProblem = data
    },
    setCurrentContest (state, data) {
        setSessionStorage('currentContest', data)
        state.currentContest = data
    },
    setAllContest (state, data) {
        setSessionStorage('allContest', data)
        state.allContest = data
    },
    setAllProblem (state, data) {
        setSessionStorage('allProblem', data)
        state.allProblem = data
    }
}
// getters
const getters = {
    getMiniSubject: (state) => () => {
        return state.allSubject.map(({ id, name }) => { return { id, name } })
    },
    getSubjectById: (state) => (id) => {
        return state.allSubject.find(item => item.id === id)
    },
    getIsIndex: (state) => () => {
        return state.currentHIndex === '/index'
    },
    getUserById: (state) => (id) => {
        return state.allUser.find((item) => item.id === id)
    },
    getContestById: (state) => (id) => {
        return state.allContest.find(item => item.id === id)
    },
    getMiniContest: (state) => () => {
        return state.allContest.map(({ id, title }) => {
            return { id, title }
        })
    },
    getProblemById: (state) => (id) => {
        return state.allProblem.find(item => item.id === id)
    }
}
// actions
const actions = {
    async fetchAllSubject ({ commit }, query = { size: 999 }) {
        const { list } = await _getSubjectList(query)
        commit('setAllSubject', list)
    },
    async fetchAllUser ({ commit }) {
        const list = await _getUser()
        commit('setAllUser', list)
    },
    async fetchAllContest ({ commit }, query = { size: 999 }) {
        const { list } = await _getContestList(query)
        commit('setAllContest', list)
    },
    async fetchAllProblem ({ commit }, query = { size: 999 }) {
        const { list } = await _getProblemList(query)
        commit('setAllProblem', list)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
