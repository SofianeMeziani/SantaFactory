/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import {axiosBase, getAPI} from '@/axios'


export default {

    // run the below action to get a new access token on expiration
    refreshToken(context) {

        return new Promise((resolve, reject) => {
            axiosBase.post('api/v1/auth/token/refresh/', {
                refresh: context.state.refreshToken
            }) // send the stored refresh token to the backend API
                .then(response => { // if API sends back new access and refresh token update the store
                    console.log('New access successfully generated')

                    console.log(response.data.access)
                    context.commit('updateAccess', response.data.access)
                    // Set bearer token in axios
                    context.commit('SET_BEARER', response.data.access)
                    console.log(getAPI.defaults.headers.common)
                    resolve({access: response.data.access, status: response.status})
                })
                .catch(err => {
                    console.log('error in refreshToken Task')
                    reject(err) // error generating new access and refresh token because refresh token has expired
                })
        })
    },
    registerUser(context, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            axiosBase.post('api/v1/registration/', {
                email: data.email,
                username: data.username,
                password1: data.password1,
                password2: data.password2,
                profile_type: "PLAYER"
            })
                .then(response => {
                    context.commit('updateLocalStorage', {
                        access: response.data.access_token,
                        refresh: response.data.refresh_token
                    }) // store the access and refresh token in localstorage

                    // Update user details
                    context.commit('UPDATE_USER_INFO', response.data.user, {root: true})

                    // Set bearer token in axios
                    context.commit('SET_BEARER', response.data.access_token)

                    resolve(response)
                })
                .catch(error => {

                    reject(error)
                })
        })
    },
    logoutUser(context) {
        if (context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
                axiosBase.post('/api/v1/auth/logout/')
                    .then(response => {
                        localStorage.removeItem('access_token')

                        context.commit('destroyToken')
                        resolve(response)
                    })
                    .catch(err => {
                        localStorage.removeItem('access_token')

                        context.commit('destroyToken')
                        resolve(err)
                    })
            })
        }
    },
    loginUser(context, credentials) {
        return new Promise((resolve, reject) => {
            console.log(credentials)
            // send the username and password to the backend API:
            axiosBase.post('/app/login', {
                email: credentials.email,
                password: credentials.password
            })
                // if successful update local storage:
                .then(response => {

                    console.log('hello')
                    context.commit('updateLocalStorage', {
                        access: response.data.token
                    })
                    // Update user details
                    context.commit('UPDATE_USER_INFO', response.data.content, {root: true})
                    // Set bearer token in axios
                    context.commit('SET_BEARER', response.data.token)

                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
