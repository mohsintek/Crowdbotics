import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login/login.vue'
import Registration from './components/Registration/registration.vue'
import Dashboard from './components/Dashboard/dashboard.vue'
import Forgotpassword from './components/ForgotPassword/forgotPassword.vue'
import Passwordchange from './components/Passwordchange/passwordchange.vue'
import CreateApp from './components/CreateApp/createapp.vue'
import store from './store/store'
import terms from './components/terms/terms.vue'

Vue.use(Router)

const router = new Router({
    mode: "history",
    hash: false,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { guest: true }
    },
    {
        path: '/signup',
        name: 'signup',
        component: Registration,
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth: true},
      },
      {
        path: '/reset',
        name: 'Forgotpassword',
        component: Forgotpassword
      },
      {
        path: '/new-password',
        name: 'Passwordchange',
        component: Passwordchange
      },
      {
        path: '/create-app',
        name: 'dashboardapp',
        component: CreateApp,
        meta: {requiresAuth: true}
      },
      {
        path: '/terms',
        name: 'terms',
        component: terms,
        
      }
  ]
 
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})
export default router

