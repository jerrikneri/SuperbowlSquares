import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import store from './store';

new Vue({
    render: h => h(App),
    store
}).$mount('#app')