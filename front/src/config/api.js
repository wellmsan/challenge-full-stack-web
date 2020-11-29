import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '../store'

Vue.use(VueAxios, axios)

const api = Vue.axios.create({
    baseURL: process.env.VUE_APP_API_HOST
})

// Verify token in localstorage
api.interceptors.request.use(
    (config) => {
        try {
            let token
            const auth = store.state['Auth'].object
            if (auth != undefined) token = auth.token
            if (token) {
                config.headers['x-access-token'] = token
            }
            return config
        } catch (e) {
            console.error(e.message)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api