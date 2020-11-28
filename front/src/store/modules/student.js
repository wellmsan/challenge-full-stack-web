import api from '../../config/api'
const endPoint = '/students'

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
    data: state => state.data,
    object: state => state.object
}

// actions
const actions = {
    loadAll({ commit }, params) {
        return new Promise((resolve, reject) => {
            api.get(endPoint, params).then(async (res) => {
                if (res.status == 200) {
                    const list = await res.data.rows
                    commit('SET_DATA', list)
                    resolve(list)
                } else {
                    reject()
                }
            }).catch(e => {
                console.log(e)
                reject()
            })
        })
    },

    async get({ commit }, id) {
        return await new Promise((resolve, reject) => {
            api.get(endPoint + '/' + id).then(async (res) => {
                if (res.status == 200) {
                    const obj = await res.data
                    commit('SET_OBJECT', obj)
                    resolve(obj)
                } else {
                    reject()
                }
            }).catch(e => {
                console.log(e)
                reject()
            })
        })
    },

    async save({ commit }, body) {
        return await new Promise((resolve, reject) => {
            api.post(endPoint, body).then(async (res) => {
                if (res.status == 201) {
                    const obj = await res.data
                    commit('ADD_OBJECT', obj)
                    resolve(obj)
                } else {
                    reject()
                }
            }).catch((e) => {
                console.log(e)
                reject()
            })
        })
    },

    async update({ commit }, id, body) {
        return await new Promise((resolve, reject) => {
            api.put(endPoint + '/' + id, body).then(async (res) => {
                if (res.status == 201) {
                    const obj = await res.data
                    commit('SET_OBJECT', obj)
                    resolve(obj)
                } else {
                    reject()
                }
            }).catch((e) => {
                console.log(e)
                reject()
            })
        })
    },

    async delete({ commit }, id) {
        return await new Promise((resolve, reject) => {
            api.delete(endPoint + '/' + id).then(async (res) => {
                if (res.status == 201) {
                    commit('DEL_OBJECT', id)
                    resolve(id)
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

    SET_OBJECT(state, object) {
        state.object = object
    },

    SET_DATA(state, { data }) {
        state.data = data
    },

    ADD_OBJECT(state, { data }) {
        state.data.unshift(data)
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