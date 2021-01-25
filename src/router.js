/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/',
                    name: 'home',
                    component: () => import('./views/Home.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/bilan',
                    name: 'bilan',
                    component: () => import('./views/pages/Bilan.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/contact',
                    name: 'contact',
                    component: () => import('./views/pages/Contact'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('./views/pages/Users'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/pronostic',
                    name: 'pronostic',
                    component: () => import('./views/pages/Pronostic'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'profile',
                    name: 'page-user-settings',
                    component: () => import('@/views/pages/user-settings/UserSettings.vue'),
                    meta: {
                        // breadcrumb: [
                        //     {title: 'Home', url: '/'},
                        //     {title: 'Pages'},
                        //     {title: 'User Settings', active: true}
                        // ],
                        requiresAuth: true,
                        rule: 'editor'
                    }
                },

            ],
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================

                {
                    path: '/pages/login',
                    name: 'login',
                    component: () => import('@/views/pages/login/Login.vue'),
                    meta: {
                        rule: 'editor',
                        requiresLogged: true
                    }
                },
                {
                    path: '/pages/register',
                    name: 'register',
                    component: () => import('@/views/pages/register/Register.vue'),
                    meta: {
                        rule: 'editor',
                        requiresLogged: true

                    }
                },
                {
                    path: '/cgu',
                    name: 'cgu',
                    component: () => import('./views/pages/Cgu.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/pages/forgot-password',
                    name: 'page-forgot-password',
                    component: () => import('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/reset-password',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/lock-screen',
                    name: 'page-lock-screen',
                    component: () => import('@/views/pages/LockScreen.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/comingsoon',
                    name: 'page-coming-soon',
                    component: () => import('@/views/pages/ComingSoon.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-500',
                    name: 'page-error-500',
                    component: () => import('@/views/pages/Error500.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/not-authorized',
                    name: 'page-not-authorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/maintenance',
                    name: 'page-maintenance',
                    component: () => import('@/views/pages/Maintenance.vue'),
                    meta: {
                        rule: 'editor'
                    }
                }
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})


router.beforeEach((to, from, next) => {
    next()

    // // if any of the routes in ./router.js has a meta named 'requiresAuth: true'
    // // then check if the user is logged in before routing to this path:
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //     console.log(store.getters["auth/loggedIn"])
    //     if (!store.getters["auth/loggedIn"]) {
    //         next({name: 'login'})
    //     } else {
    //         next()
    //     }
    // } else if (to.matched.some(record => record.meta.requiresLogged)) {
    //     // else if any of the routes in ./router.js has a meta named 'requiresLogged: true'
    //     // then check if the user is logged in; if true continue to home page else continue routing to the destination path
    //     // this comes to play if the user is logged in and tries to access the login/register page
    //     if (store.getters["auth/loggedIn"]) {
    //         next({name: 'home'})
    //     } else {
    //         next()
    //     }
    // } else {
    //     next()
    // }
})


export default router
