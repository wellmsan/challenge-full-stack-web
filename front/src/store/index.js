import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Student from './modules/student'
import User from './modules/user'
// import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
/*
const vuexStorage = new VuexPersistence({
    key: process.env.VUE_APP_PROJECT_NAME,
    storage: window.localStorage
})
*/

export default new Vuex.Store({
    //plugins: [vuexStorage.plugin],
    modules: {
        Auth,
        Student,
        User
    }
})