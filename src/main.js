import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes.js';

import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import store from './store';

import './axiosConfig.js';

const router = new VueRouter({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
        if (to.path === '/') {
            return { x: 0, y: 0 };
        }
        return { x: 0, y: 150 };
    },
    routes
});

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')