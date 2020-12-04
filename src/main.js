import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$server = "http://localhost:8080/"
Vue.prototype.$host = "http://localhost:8081/"

const token = localStorage.getItem('user-token')
Vue.prototype.$token = token;
if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token
  console.log(axios.defaults.headers.common['Authorization']);
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
