import Vue from 'vue'
import Vuex from 'vuex'
import { _getSubjectList, _getUser } from '@api'
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
    currentPost: getSessionStorage('currentPost')
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
        return state.currentHIndex === "/index"
    },
    getUserById: (state) => (id) => {
        return state.allUser.find((item) => item.id === id)
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
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
