import Vue from 'vue'
import Vuex from 'vuex'
import { _getSubjectList } from '@api'
import { getSessionStorage, setSessionStorage } from '@utils'
Vue.use(Vuex)
// state
const state = {
    allSubject: getSessionStorage('allSubject')
}
// mutations
const mutations = {
    setAllSubject (state, data) {
        setSessionStorage('allSubject', data)
        state.allSubject = data
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
