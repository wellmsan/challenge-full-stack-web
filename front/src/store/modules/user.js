import api from '../../config/api'
const endPoint = '/users'

const getInitialSate = () => {
    return {
        users: [],
        user: []
    }
}

// initial state
let state = getInitialSate()

// getters
const getters = {
    data: state => state.data,
    objeto: state => state.objeto
}

// actions
const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    loadAll({ commit }) {
        return new Promise((resolve, reject) => {
            api.get(endPoint).then(async (res) => {
                if (res.status == 200) {
                    commit('SET_USERS', await res)
                    resolve()
                } else {
                    reject()
                }
            }).catch(e => {
                console.log(e)
                reject()
            })
        })
    },

    get({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.get(endPoint + '/' + id).then(async (res) => {
                if (res.status == 200) {
                    commit('SET_USER', await res)
                    resolve()
                } else {
                    reject()
                }
            }).catch(e => {
                console.log(e)
                reject()
            })
        })
    },

    save({ commit }, body) {
        return new Promise((resolve, reject) => {
            api.post(endPoint, body).then(async (res) => {
                if (res.status == 201) {
                    commit('SET_USER', await res.data)
                    resolve()
                } else {
                    reject()
                }
            }).catch((e) => {
                console.log(e)
                reject()
            })
        })
    },

    update({ commit }, id, body) {
        return new Promise((resolve, reject) => {
            api.put(endPoint + '/' + id, body).then(async (res) => {
                if (res.status == 201) {
                    commit('SET_USER', await res.data)
                    resolve()
                } else {
                    reject()
                }
            }).catch((e) => {
                console.log(e)
                reject()
            })
        })
    },

    delete({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.delete(endPoint + '/' + id).then(async (res) => {
                if (res.status == 201) {
                    commit('DEL_USER', id)
                    resolve()
                } else {
                    reject()
                }
            }).catch((e) => {
                console.log(e)
                reject()
            })
        })
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

    SET_USER(state, object) {
        state.user = object
    },

    SET_USERS(state, { data }) {
        state.users = data
    },

    DEL_USER(state, id) {
        const index = state.users.findIndex(obj => obj.id == id)
        state.users.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}