import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import routes from './router'
import VuePluralize from 'vue-pluralize'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(VuePluralize)
Vue.use(Loading, {
  loader: 'spinner',
  color: '#0033cc'
}, {
  // slots
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: routes,
  render: h => h(App)
}).$mount('#app')
