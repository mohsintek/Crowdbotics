import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './routes'
import store from './store/store'
import { ToastPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin)


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
