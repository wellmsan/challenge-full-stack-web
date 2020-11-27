import api from '../../config/api'

// initial state
let state = {
  token: '',
  username: '',
  userId: '',
  isAuth: false,
}

// getters
const getters = {
  token: state => state.token,
  username: state => state.username,
  userId: state => state.userId,
  isAuth: state => state.isAuth
}

// actions
const actions = {
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      params.client_id = process.env.VUE_APP_API_KEY
      // params.password = Buffer.from(params.password, 'utf16le')            
      api.post('/login', params).then(res => {
        api.post('/decode', { token: res.data.token, client_id: params.client_id }).then(decode => {
          res.data.payload = decode.data
          commit('login', res.data)
          resolve(res)
        })
      }).catch(e => {
        reject(e)
      })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('logout')
      } catch (e) {
        reject(e)
      }

    })
  },
  check({ commit }, params) {
    return new Promise((resolve, reject) => {
      params.client_id = process.env.VUE_APP_API_KEY
      api.post('check', params).then(res => {
        if (!res.data.auth) {
          commit('logout')
          reject()
        } else {
          resolve(res)
        }
      }).catch(e => {
        commit('logout')
        reject(e)
      })
    })
  }
}

// mutations
const mutations = {
  login(state, data) {
    state.token = data.token
    state.isAuth = data.auth
    state.username = data.username
    state.userId = data.userId
  },
  logout(state) {
    state.token = ''
    state.isAuth = false
    state.username = ''
    state.userId = ''
    localStorage.removeItem(process.env.VUE_APP_PROJECT_NAME)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}