import Router from '../routes';
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";



Vue.use(Vuex)


const store = new Vuex.Store({


    state: {

        users: '',
        logInUsers: [],
        errorMessage: '',
        reset: [],
        passwordchange: [],
        verify: "",
        apps: [],
        isAuthenticated: false,
        authKey: '',
        creds: [],
        setApp: '',
        plan: [],
        planByID: [],
        subscription: [],
        error: ''
    },
    plugins: [createPersistedState()],


    mutations: {
        SET_VERIFY_USERS(state, users) {
            state.authKey = users
        },
        SET_REGISTER_USERS(state, users) {
            state.users = users
        },
        SET_LOGIN_USERS(state, users) {
            state.logInUsers = users
        },
        SET_RESET(state, resetpass) {
            state.reset = resetpass
        },
        SET_PASSWORD_CHANGE(state, passwordchange) {
            state.passwordchange = passwordchange
        },
        VERIFY_EMAIL(state, verify) {
            state.verify = verify
        },
        CREATE_APP(state, createapp) {
            state.createapp = createapp

        },
        GET_CREATED_APPS(state, apps) {
            state.apps = apps

        },
        SET_REGISTER_CREDS(state, creds) {
            state.creds = creds

        },
        DELETE_APP(state, id) {
            let index = state.apps.findIndex(app => app.id == id);
            state.apps.splice(index, 1);
        },
        SET_APPS(state, app) {
            state.setApp = app
        },
        GET_PLAN(state, plan) {
            state.plan = plan
        },
        GET_PLAN_BY_ID(state, plan) {
            state.planByID = plan
        },
        GET_SUBSCRIPTION(state, subscription) {
            state.subscription = subscription
        },
        SET_ERROR(state, error) {
            state.error = error
        }
    },
    actions: {
        register({ commit }, user) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/registration/`, user, headers)
                .then(response => {
                    localStorage.setItem('accessToken', response.data.key)
                    commit('SET_REGISTER_CREDS', response.config.data)
                    commit('SET_REGISTER_USERS', response.data.key)
                    commit('SET_VERIFY_USERS', response.data.key)
                    Router.push('/')
                })
        },
        verifyemail({ commit }, payload) {

            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/registration/verify-email/`, { key: payload }, { headers })
            commit('SET_VERIFY_USERS', payload)
        },
        login({ commit }, user) {
            let headers = {
                'Content-Type': 'application/json'
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/login/`, user, { headers })

                .then(response => {
                    commit('SET_LOGIN_USERS', response.data.key)
                    localStorage.setItem('accessToken', response.data.key)
                    Router.push('/dashboard')
                })

        },
        reset({ commit }, user) {
            let headers = {
                'Content-Type': 'application/json',
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/password/reset/`, user, { headers })
                .then(response => {
                    commit('SET_RESET', response.data)
                    Router.push('/new-password')
                })
        },
        newpassword({ commit }, user, authToken) {
                console.log('here is auth key', authToken)

            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }

            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/password/change/`, user, { headers })
                .then(response => {

                    commit('SET_PASSWORD_CHANGE', response.ok)
                    Router.push('/')
                })
        },
        createapp({ commit }, user) {
            const requestOptions = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    "authorization": `Token ${this.getters.authKey}`
                },
            };

            axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/apps/`, user, requestOptions)
                .catch((error) => {
                    console.error(error)
                })
            commit('SET_APPS', '')
            Router.push('/dashboard')

        },

        getcreatedapps({ commit }) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/apps/`, {
                headers
            }).then(res => commit('GET_CREATED_APPS', res.data))

                .catch((error) => {
                    console.error(error)
                })
        },
        deleteApp({ commit }, id) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.delete(`${process.env.VUE_APP_BASE_URL}/api/v1/apps/${id}/`, {
                headers
            }).then(() => {
                commit('DELETE_APP', id)
            })
        },
        purchasePlan({ commit }) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/plans/`, { headers })
                .then(res => commit('GET_PLAN', res.data))
                .catch(error => console.log(error))
        },
        planById({ commit }, id) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/plans/${id}`, { headers })
                .then(res => commit('GET_PLAN_BY_ID', res.data))
                .catch(error => console.log(error))
        },
        subscriptions({ commit }, data) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/subscriptions/`, data, { headers })
                .then(res => commit('GET_SUBSCRIPTION', res.data))
                .then(()=>alert('Subscription successfully activated'))
                .catch((err) => {
                    alert('Subscription Already exist',err);
                })

        },
        getSubscriptions({ commit }) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${this.getters.authKey}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/subscriptions/`, { headers })
                .then(res => commit('GET_SUBSCRIPTION', res.data))
                .catch(error => commit("GET_SUBSCRIPTION", error.message))
        },

        logOut({ commit }) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('vuex')
            commit('SET_REGISTER_USERS', '')
            Router.push('/')
        }


    },
    getters: {
        errorMessage: state => {
            return state.errorMessage
        },
        isAuthenticated: state => {
            return state.users
        },
        authKey: state => {
            return state.authKey
        },
        creds: state => {
            return state.creds
        }
    }
})
export default store