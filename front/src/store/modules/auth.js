// import Vue from 'vue';
// import Vue from 'vue';
import api from '../../config/api'
const endPoint = '/login'

const getInitialSate = () => {
  return {
    object: null
  }
}

// initial state
let state = getInitialSate()

// getters
const getters = {
  object: state => state.object,
}

// actions
const actions = {
  reset({ commit }) {
    commit('RESET');
  },

  async login({ commit }, body) {
    const res = await api.post(endPoint, body)
    commit('SET_OBJECT', res.data)
  },

  async logout({ commit }) {
    commit('DEL_OBJECT')
  },

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

  DEL_OBJECT(state) {
    state.object = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}