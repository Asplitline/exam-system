import Vue from 'vue'
import Vuex from 'vuex'
import { _getSubjectList } from '@api'
import { getSessionStorage, setSessionStorage } from '@utils'
Vue.use(Vuex)
// state
const state = {
    currentUser: getSessionStorage('currentUser'),
    allSubject: getSessionStorage('allSubject'),
    currentAIndex: sessionStorage.getItem('currentAIndex')
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
    }
}
// getters
const getters = {

}
// actions
const actions = {
    async fetchAllSubject ({ commit }, query = { size: 999 }) {
        const { list } = await _getSubjectList(query)
        commit('setAllSubject', list)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
