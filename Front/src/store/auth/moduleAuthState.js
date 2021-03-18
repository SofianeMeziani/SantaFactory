/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
    accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
    // refreshing the page

    APIData: '', // received data from the backend API is stored here.
    // isUserLoggedIn: () => {
    //     let isAuthenticated = false
    //
    //     isAuthenticated = !!auth.isAuthenticated();
    //     return localStorage.getItem('userInfo') && isAuthenticated
    // }
}
