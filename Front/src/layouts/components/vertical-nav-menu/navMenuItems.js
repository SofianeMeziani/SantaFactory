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
        name: "Dashboard",
        slug: "Dashboard",
        icon: "HomeIcon",
    },
    {
        url: "/commandes",
        name: "Commandes",
        slug: "Commandes",
        icon: "ClipboardIcon",

    },
    {
        url: "/lutins",
        name: "Lutins",
        slug: "Lutins",
        icon: "UsersIcon",
        admin: true
    },
    {
        url: "/jouets",
        name: "Jouets",
        slug: "Jouets",
        icon: "GiftIcon",
        admin: true
    },
    {
        url: "/categories",
        name: "Catégories",
        slug: "Categories",
        icon: "ServerIcon",
        admin: true
    },
    {
        url: "/competences",
        name: "Compétences",
        slug: "Competences",
        icon: "CheckCircleIcon",
        admin: true
    },
    {
        url: '/profile',
        slug: 'page-user-settings',
        name: 'Profile',
        icon: 'UserIcon',
        i18n: 'UserSettings'
    },
    {
        url: '/manuel',
        slug: 'manuel',
        name: "Manuel d'utilisation",
        icon: 'BookOpenIcon',
        i18n: 'UserSettings'
    }

]
