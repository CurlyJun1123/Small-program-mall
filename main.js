import Vue from 'vue'
import App from './App'
import request from './components/pocky-request/index';

Vue.config.productionTip = false
Vue.prototype.request = request // 封装request请求

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
