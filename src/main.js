import Vue from 'vue'
import App from './App.vue'
import { request } from './utils/request'

import antd from 'ant-design-vue/lib/index'
import 'ant-design-vue/dist/antd.css'

import './assets/css/reset.less'

import router from  './router.js'


antd.install(Vue)
Vue.config.productionTip = false

Vue.prototype.$request = request;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
