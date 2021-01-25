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
                        localStorage.removeItem('refresh_token')
                        context.commit('destroyToken')
                        resolve(response)
                    })
                    .catch(err => {
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
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
            axiosBase.post('/api/v1/auth/login/', {
                email: credentials.email,
                password: credentials.password
            })
                // if successful update local storage:
                .then(response => {
                    context.commit('updateLocalStorage', {
                        access: response.data.access_token,
                        refresh: response.data.refresh_token
                    }) // store the access and refresh token in localstorage

                    // Update user details
                    context.commit('UPDATE_USER_INFO', response.data.user, {root: true})

                    // Set bearer token in axios
                    context.commit('SET_BEARER', response.data.access_token)

                    resolve()
                })
                .catch(err => {
                    console.log('heellloo');
                    reject(err)
                })
        })
    }


// // JWT
// loginJWT({commit}, payload) {
//
//     return new Promise((resolve, reject) => {
//         jwt.login(payload.userDetails.email, payload.userDetails.password)
//             .then(response => {
//                 // console.log('hehehehehehe');
//                 // console.log(response.data['user']);
//                 // console.log(response.data.user + 'hello');
//                 // If there's user data in response
//                 if (response.data.user) {
//                     // Navigate User to homepage
//                     router.push(router.currentRoute.query.to || '/')
//
//                     // Set accessToken
//                     localStorage.setItem('accessToken', response.data.access_token)
//
//                     // Update user details
//                     commit('UPDATE_USER_INFO', response.data.user, {root: true})
//
//                     // Set bearer token in axios
//                     commit('SET_BEARER', response.data.access_token)
//
//                     resolve(response)
//                 } else {
//                     reject({message: 'Wrong Email or Password'})
//                 }
//
//             })
//             .catch(error => {
//                 reject(error)
//             })
//     })
// },
// registerUserJWT({commit}, payload) {
//
//     const {displayName, email, password, confirmPassword} = payload.userDetails
//
//     return new Promise((resolve, reject) => {
//
//         // Check confirm password
//         if (password !== confirmPassword) {
//             reject({message: 'Password doesn\'t match. Please try again.'})
//         }
//
//         jwt.registerUser(displayName, email, password)
//             .then(response => {
//                 // Redirect User
//                 router.push(router.currentRoute.query.to || '/')
//
//                 // Update data in localStorage
//                 localStorage.setItem('accessToken', response.data.accessToken)
//                 commit('UPDATE_USER_INFO', response.data.userData, {root: true})
//
//                 resolve(response)
//             })
//             .catch(error => {
//                 reject(error)
//             })
//     })
// },
// fetchAccessToken() {
//     return new Promise((resolve) => {
//         jwt.refreshToken().then(response => {
//             resolve(response)
//         })
//     })
// }
}
