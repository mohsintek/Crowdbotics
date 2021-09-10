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
        register({ commit }, data) {
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/registration/`, data.payload, headers)
                // .then(response => {
                //     localStorage.setItem('accessToken', response.data.key)
                //     commit('SET_REGISTER_CREDS', response.config.data)
                //     commit('SET_REGISTER_USERS', response.data.key)
                //     commit('SET_VERIFY_USERS', response.data.key)
                //     Router.push('/')
                // })
                .then(response => {
                    localStorage.setItem('accessToken', response.data.key)
                    commit('SET_REGISTER_CREDS', response.config.data)
                    commit('SET_REGISTER_USERS', response.data.key)
                    commit('SET_VERIFY_USERS', response.data.key)

                    data.vm.$bvToast.toast('Successfully Registered', {
                        title: 'Register',
                        variant: 'success',
                        solid: true,
                    })

                }, Router.push('/'))



                .catch(error => {
                    console.log(error)
                    data.vm.$bvToast.toast('A user is already registered with this e-mail address.', {
                        title: 'Error',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
        verifyemail({ commit }, payload) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/registration/verify-email/`, { key: payload }, { headers })
            commit('SET_VERIFY_USERS', payload)
        },
        login({ commit }, data) {
            let headers = {
                'Content-Type': 'application/json'
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/login/`, data.payload, { headers })

                .then(response => {
                    commit('SET_LOGIN_USERS', response.data.key)
                    localStorage.setItem('accessToken', response.data.key)
                    data.vm.$bvToast.toast('Successfully Logged In', {
                        title: 'Log In',
                        variant: 'success',
                        solid: true,
                    })

                }, Router.push('/dashboard'))
                .catch(error => {
                    console.log(error)
                    data.vm.$bvToast.toast('Please try again', {
                        title: 'Error',
                        variant: 'danger',
                        solid: true,
                    })
                })

        },
        reset({ commit }, data) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                'Content-Type': 'application/json',
                "authorization": `Token ${token}`
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/password/reset/`, data.payload, { headers })
                .then(response => {
                    commit('SET_RESET', response.data)
                    data.vm.$bvToast.toast('Password reset email has been sent', {
                        title: 'Reset Password',
                        variant: 'success',
                        solid: true,
                    })

                }, Router.push('/new-password'))
        },
        newpassword({ commit }, data) {
            let token = localStorage.getItem('accessToken')

            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }

            axios.post(`${process.env.VUE_APP_BASE_URL}/rest-auth/password/change/`, data.payload, { headers })
                .then(res => commit('SET_PASSWORD_CHANGE', res.ok, console.log(res),
                    data.vm.$bvToast.toast('New password has been saved.', {
                        title: 'Password',
                        variant: 'success',
                        solid: true,
                    })

                ), Router.push('/'))




                .catch(error => {
                    console.log(error)
                    data.vm.$bvToast.toast('This password is too short. It must contain at least 8 characters.', {
                        title: 'Try Again',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
        createapp({ commit }, data) {
            let token = localStorage.getItem('accessToken')
            const requestOptions = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    "authorization": `Token ${token}`
                },
            };

            axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/apps/`, data.payload, requestOptions)
                .then(res => {
                    commit('SET_APPS', '', console.log(res))

                    data.vm.$bvToast.toast('You Created an App', {
                        title: 'Dashboard',
                        variant: 'success',
                        solid: true,
                    })

                }, Router.push('/dashboard'))
                .catch((error) => {
                    console.error(error)
                })


        },

        getcreatedapps({ commit }) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/apps/`, {
                headers
            }).then(res => commit('GET_CREATED_APPS', res.data))

                .catch((error) => {
                    console.error(error)
                })
        },
        deleteApp({ commit }, id) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }
            axios.delete(`${process.env.VUE_APP_BASE_URL}/api/v1/apps/${id}/`, {
                headers
            }).then(() => {
                commit('DELETE_APP', id)
            })
        },
        purchasePlan({ commit }) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/plans/`, { headers })
                .then(res => commit('GET_PLAN', res.data))
                .catch(error => console.log(error))
        },
        planById({ commit }, id) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }
            axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/plans/${id}`, { headers })
                .then(res => commit('GET_PLAN_BY_ID', res.data))
                .catch(error => console.log(error))
        },
        subscriptions({ commit }, data) {
            let token = localStorage.getItem('accessToken')
            console.log(data)
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
            }
            axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/subscriptions/`, data.payload, { headers })
                .then(res => commit('GET_SUBSCRIPTION', res.data, console.log(res.data),
                    data.vm.$bvToast.toast('Subscription Activated', {
                        title: 'Subscription',
                        variant: 'success',
                        solid: true,
                    })
                )
                )

                .catch(error => {
                    data.vm.$bvToast.toast(error.response.data[0], {
                        title: 'Already Exist',
                        variant: 'danger',
                        solid: true,
                    })
                })

        },
        getSubscriptions({ commit }) {
            let token = localStorage.getItem('accessToken')
            let headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Token ${token}`
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