/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import {getAPI} from '@/axios'

export default {
    SET_BEARER(state, accessToken) {
        getAPI.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    },

    updateLocalStorage(state, {access, refresh}) {
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        state.accessToken = access
        state.refreshToken = refresh
    },
    updateAccess(state, access) {
        localStorage.setItem('access_token', access)

        state.accessToken = access
    },
    destroyToken(state) {
        state.accessToken = null
        state.refreshToken = null
    }
}
