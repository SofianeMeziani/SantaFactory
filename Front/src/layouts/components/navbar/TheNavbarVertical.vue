<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton"
                 :color="navbarColorLocal"
                 :class="textColor">

        <!--        SM - OPEN SIDEBAR BUTTON-->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon"
                      @click.stop="showSidebar"/>

        <admin-buttons v-if="true" :navbarColor="navbarColor"/>

        <vs-spacer/>

        <vs-switch

            class="mr-4 li-darken switch-dark active"
            v-model="themeMode"
            icon-pack="feather"
            vs-icon-off="icon-sun"
            vs-icon-on="icon-moon"

        ></vs-switch>


        <profile-drop-down/>

      </vs-navbar>
    </div>
  </div>
</template>


<script>
import AdminButtons from './components/AdminButtons.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'

export default {
  name: 'the-navbar-vertical',
  props: {
    activeUserInfo2: {},
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    AdminButtons,
    ProfileDropDown
  },

  watch: {
    activeUserInfo2: function () {
      return this.$store.state.AppActiveUser
    },
    windowWidth() {
      this.setSidebarWidth()
    }
  },
  methods: {
    setSidebarWidth() {
      this.windowWidth < 992 ? this.$emit('updateNavbar', 'sticky') : this.$emit('updateNavbar', 'floating');
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  },
  computed: {
    activeUserInfo: {
      get() {
        return this.$store.state.AppActiveUser
      },
    },


    navbarTypeLocal: {
      get() {
        return this.navbarType
      },
      set(val) {
        this.$emit('updateNavbar', val)
      }
    },
    themeMode: {
      get() {
        return this.$store.state.theme === "dark" ? true : false;
      },
      set(val) {
        //console.log(val);
        if (val == true) {
          this.$store.dispatch("updateTheme", "dark");
        } else {
          this.$store.dispatch("updateTheme", "light");
        }
      }
    },

    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#161d31' : this.navbarColor
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor() {
      return {'text-white': (this.navbarColor !== '#161d31' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    // eslint-disable-next-line vue/return-in-computed-property
    classObj() {
      if (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth) return 'navbar-full'
    }
  },

}
</script>


