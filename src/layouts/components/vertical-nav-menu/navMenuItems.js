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
        name: "Lutins",
        slug: "Bilan",
        icon: "ActivityIcon",
    },
    {
        url: "/contact",
        name: "Commandes",
        slug: "Contact",
        icon: "MailIcon",
    },
    {
        url: '/profile',
        slug: 'page-user-settings',
        name: 'Profile',
        icon: 'UserIcon',
        i18n: 'UserSettings'
    }

]
