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

import store from './store/store'

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
                        requiresAuth: true
                    }
                },
                {
                    path: '/categories',
                    name: 'categories',
                    component: () => import('./views/Categories.vue'),
                    meta: {
                        requiresAuth: true,
                        is_admin: true
                    }
                },
                {
                    path: '/commandes',
                    name: 'commandes',
                    component: () => import('./views/Commandes.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/competences',
                    name: 'competences',
                    component: () => import('./views/Competences.vue'),
                    meta: {
                        requiresAuth: true,
                        is_admin: true
                    }
                },
                {
                    path: '/jouets',
                    name: 'jouets',
                    component: () => import('./views/Jouets.vue'),
                    meta: {
                        requiresAuth: true,
                        is_admin: true
                    }
                },
                {
                    path: '/lutins',
                    name: 'lutins',
                    component: () => import('./views/Lutins.vue'),
                    meta: {
                        requiresAuth: true,
                        is_admin: true
                    }
                },
                {
                    path: '/manuel',
                    name: 'manuel',
                    component: () => import('./views/Manuel.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'profile',
                    name: 'page-user-settings',
                    component: () => import('@/views/pages/user-settings/UserSettings.vue'),
                    meta: {
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
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue'),
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


    if (to.matched.some(record => record.meta.is_admin)) {

        console.log(store.state.AppActiveUser.role)
        if (store.state.AppActiveUser.role !== 'USER') {
            next()
        } else {
            next({name: 'home'})
        }
    }

    // if any of the routes in ./router.js has a meta named 'requiresAuth: true'
    // then check if the user is logged in before routing to this path:
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log(store.getters["auth/loggedIn"])
        if (!store.getters["auth/loggedIn"]) {
            next({name: 'login'})
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresLogged)) {
        // else if any of the routes in ./router.js has a meta named 'requiresLogged: true'
        // then check if the user is logged in; if true continue to home page else continue routing to the destination path
        // this comes to play if the user is logged in and tries to access the login/register page
        if (store.getters["auth/loggedIn"]) {
            next({name: 'home'})
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router
