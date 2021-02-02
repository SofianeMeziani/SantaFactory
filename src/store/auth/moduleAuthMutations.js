/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import {axiosBase} from '@/axios'

export default {
    SET_BEARER(state, accessToken) {
        axiosBase.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    },

    updateLocalStorage(state, {access}) {
        console.log('hello local storage')
        localStorage.setItem('access_token', access)

        state.accessToken = access

    },
    updateAccess(state, access) {
        localStorage.setItem('access_token', access)

        state.accessToken = access
    },
    destroyToken(state) {
        state.accessToken = null

    }
}
