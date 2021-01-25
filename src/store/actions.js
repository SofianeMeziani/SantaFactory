/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import {getAPI} from "@/axios";

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({commit}, width) {
        commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({commit}, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({commit}, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({commit}, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({commit}) {
        commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({commit}, val) {
        commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({commit}, payload) {
        commit('UPDATE_USER_INFO', payload)
    },
    updateProfileApi(context, payload) {
        return new Promise((resolve, reject) => {

            // send the username and password to the backend API:
            getAPI.patch('/api/v1/auth/user/', payload)
                .then(response => {
                    console.log(response.data)
                    // Update user details
                    context.commit('UPDATE_USER_INFO', response.data, {root: true})
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })


    }
}

export default actions
