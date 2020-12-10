import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAuthImage from 'vue-auth-image'
import jwt_decode from "jwt-decode";

Vue.use(VueAuthImage)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$server = ""
Vue.prototype.$host = ""
Vue.prototype.jwt_decode = jwt_decode

const token = localStorage.getItem('user-token')
Vue.prototype.$token = token;
if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
