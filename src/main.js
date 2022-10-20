import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import 'amfe-flexible'
import './plugin.js'

import vueEsign from 'vue-esign'
Vue.use(vueEsign)

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
