<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.name">
    <div class="text-right leading-tight hidden sm:block">
      <p style="margin-bottom: 5px" class="font-semibold">@{{ activeUserInfo.name }}</p>
      <small>
        🎅🏻 {{ activeUserInfo.role == 'USER' ? 'Lutin' : 'Admin' }}</small>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class=" ml-3">
        <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.avatar" alt="user-img"
             width="40" height="40" class=" shadow-md cursor-pointer block" style="box-shadow: none !important"/>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 12rem">

          <li @click="pushRouteHome"
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Accueil</span>
          </li>

          <li @click="pushRoute"
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1"/>

          <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Se déconnecter</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    pushRoute() {
      this.$router.push('/profile')
    },
    pushRouteHome() {
      this.$router.push('/')
    },
    logout() {

      // If JWT login
      if (localStorage.getItem('access_token')) {
        this.$store.dispatch('auth/logoutUser')
            .then(() => {
              this.$router.push({name: 'login'})
            })
      }


    }
  },
  created() {
    store.commit('SET_USER_INFO')
  },

}
</script>
