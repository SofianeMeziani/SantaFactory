/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
    {
        url: "/",
        name: "Accueil",
        slug: "Dashboard",
        icon: "HomeIcon",
    },
    {
        url: "/bilan",
        name: "Bilan",
        slug: "Bilan",
        icon: "ActivityIcon",
    },
    {
        url: "/contact",
        name: "Contact",
        slug: "Contact",
        icon: "MailIcon",
    },
    {
        url: '/profile',
        slug: 'page-user-settings',
        name: 'Profile',
        icon: 'UserIcon',
        i18n: 'UserSettings'
    },
    {
        header: 'Réseaux sociaux',
        icon: 'LayersIcon',
        class: 'menu-social-links',
        items: []
    }

]
