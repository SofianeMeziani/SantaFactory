<template>

  <div
      style="background-color: rgb(22, 29, 49);">
    <Snowf
        :amount="70"
        :size="5"
        :speed="1.5"
        :wind="0"
        :opacity="0.8"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="true"
        color="#ccc"
    />

    <vs-row style="justify-content: space-between; ">

      <div class="vx-col flex items-center hidden lg:block lg:w-3/4 xl:3/4"
           :style="'background-image: url(' + background + ')'" style="background-size: cover">
      </div>

      <div class="vx-col w-full center-card-log  sm:w-full md:w-full lg:w-1/4 xl:1/4"
           :style="themeMode?' background-color: rgba(40, 48, 70, 0.9)':'background-color:antiquewhite'"
           style=" z-index: 2;   min-height: 101vh; padding-bottom: 6rem; border-left: 1px solid #283046; border-left: 2px solid #2e3048">
        <div class="px-8 pt-8 mx-auto" style="">
          <a style="margin-top: -40px; opacity: 0.9" class="weatherwidget-io"
             href="https://forecast7.com/fr/49d441d10/rouen/"
             data-label_1="ROUEN"
             data-label_2="Météo" data-font="Play" data-icons="Climacons Animated" data-mode="Current" data-days="3"
             data-theme="original" data-basecolor="rgb(37,47,66)" data-highcolor="#ffffff" data-cloudfill="#283046">ROUEN
            Météo</a>
          <div>

            <router-link tag="div" class=" mb-10 vx-logo cursor-pointer flex items-center"
                         to="/">
              <logo class="ml-auto  w-50 mr-4 fill-current text-primary"/>
              <span class="  mr-auto vx-logo-text "
                    :class="themeMode?'text-white':'text-dark'"
                    style="font-size: 35px;"
              ></span>
            </router-link>

            <div class="vx-card__title mb-10" style="text-align: center">
              <h4 class="mb-4">Connexion</h4>
              <p>Connectez-vous pour gérer les commandes 🎅🏻</p>
            </div>

            <login-jwt></login-jwt>
          </div>
        </div>
      </div>
    </vs-row>

  </div>
</template>


<script>
import LoginJwt from './LoginJWT.vue'
import Logo from '../../../layouts/components/Logo'
import Snowf from "vue-snowf";

export default {
  data() {
    return {
      background: require('@/assets/images/LoginBack.png'),
    }
  },
  components: {
    LoginJwt,
    Logo,
    Snowf
  },
  methods: {
    smallScreen() {
      return window.width < 800;
    }
  },
  computed: {
    themeMode: {
      get() {
        return this.$store.state.theme === "dark" ? true : false;
      },

    },
  },
  created() {
    !function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'weatherwidget-io-js');
  }

}
</script>

<style lang="scss">
.center-card-log {
  justify-content: center;
  display: flex;
  align-items: center;
}

.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}

.hidden {
  display: none;
}

</style>
