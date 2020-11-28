// import Vue from 'vue';
import api from '../../config/api'
const endPoint = '/users'

const getInitialSate = () => {
    return {
        data: [],
        object: null
    }
}

// initial state
let state = getInitialSate()

// getters
const getters = {
    object: state => state.object,
    data: (state) => { return state.data }
}

// actions
const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async loadAll({ commit }, params) {
        const res = await api.get(endPoint, params)
        commit('SET_DATA', res.data.rows)
    },

    async get({ commit }, id) {
        const res = await api.get(endPoint + '/' + id)
        commit('SET_OBJECT', res.data)
    },

    async save({ commit }, body) {
        const res = await api.post(endPoint, body)
        commit('ADD_OBJECT', res.data)
    },

    async update({ commit }, id, body) {
        const res = await api.put(endPoint + '/' + id, body)
        commit('SET_OBJECT', res.data)
    },

    async delete({ commit }, id) {
        await api.delete(endPoint + '/' + id)
        commit('DEL_OBJECT', id)
    }
}

// mutations
const mutations = {
    RESET(state) {
        const newState = getInitialSate();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },

    SET_OBJECT(state, object) {
        state.object = object
    },

    SET_DATA(state, data) {
        state.data = data
    },

    ADD_OBJECT(state, { data }) {
        let list = [...state.data, data]
        state.data = list
        // Vue.set(state, data, [...data])
    },

    DEL_OBJECT(state, id) {
        const index = state.data.findIndex(obj => obj.id == id)
        state.data.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}