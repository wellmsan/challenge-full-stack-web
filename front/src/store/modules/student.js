import api from '../../config/api'
const endPoint = '/students'

const getInitialSate = () => {
    return {
        students: [],
        student: []
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
                    commit('SET_DATA', await res)
                    resolve()
                } else {
                    reject()
                }
            }).catch(e => {
                reject(e.message)
            })
        })
    },

    get({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.get(endPoint + '/' + id).then(async (res) => {
                if (res.status == 200) {
                    commit('SET_OBJECT', await res)
                    resolve()
                } else {
                    reject()
                }
            }).catch(e => {
                reject(e.message)
            })
        })
    },

    save({ commit }, body) {
        return new Promise((resolve, reject) => {
            api.post(endPoint, body).then(async (res) => {
                if (res.status == 201) {
                    commit('SET_OBJECT', await res.data)
                    resolve()
                } else {
                    reject()
                }
            }).catch((e) => {
                reject(e.message)
            })
        })
    },

    update({ commit }, id, body) {
        return new Promise((resolve, reject) => {
            api.put(endPoint + '/' + id, body).then(async (res) => {
                if (res.status == 201) {
                    commit('SET_OBJECT', await res.data)
                    resolve()
                } else {
                    reject()
                }
            }).catch((e) => {
                reject(e.message)
            })
        })
    },

    delete({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.delete(endPoint + '/' + id).then(async (res) => {
                if (res.status == 201) {
                    commit('DEL_STUDENT', id)
                    resolve()
                } else {
                    reject()
                }
            }).catch((e) => {
                reject(e.message)
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

    SET_STUDENT(state, object) {
        state.student = object
    },

    SET_STUDENTS(state, { data }) {
        state.students = data
    },

    DEL_STUDENT(state, id) {
        const index = state.students.findIndex(obj => obj.id == id)
        state.students.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}