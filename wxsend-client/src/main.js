import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:4600/api/'
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization  = window.sessionStorage.getItem('token')
  return config
})
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
// axios.defaults.withCredentials = false
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
