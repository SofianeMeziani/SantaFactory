<template>
  <div>

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
    <div id="dashboard-analytics" style="height: auto">

      <template>
        <div class="vx-row" style="align-items: center; justify-content: center ; display: flex">

          <div style="align-items: center; justify-content: center ; display: flex" class="vx-col w-full  mb-base">

            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'" class="greet-user">
              <h1 class="mb-6 text-white w-100 text-center">La fabrique du Père Noël 🎅🏻</h1>
              <div class="vx-row">
                <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                  <statistics-card-line
                      hideChart
                      class="mb-base"
                      icon="ServerIcon"
                      icon-right
                      statistic="98"
                      statisticTitle="Commandes"
                      color="danger"/>
                </div>

                <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                  <statistics-card-line
                      hideChart
                      class="mb-base"
                      icon="ServerIcon"
                      icon-right
                      statistic="12"
                      statisticTitle="Lutins dispo"
                      color="success"/>
                </div>
                <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                  <statistics-card-line
                      hideChart
                      class="mb-base"
                      icon="ServerIcon"
                      icon-right
                      statistic="23"
                      statisticTitle="Lutins occupés"
                      color="primary"/>
                </div>

                <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                  <statistics-card-line
                      hideChart
                      class="mb-base"
                      icon="ServerIcon"
                      icon-right
                      statistic="17"
                      statisticTitle="Commandes en cours"
                      color="warning"/>
                </div>
              </div>

            </vx-card>
          </div>


          <div style="align-items: center; justify-content: center ; display: flex"
               class="vx-col w-full  mb-base lg:w-1/3 dashboard-card"
               @click="redirectToPage('commandes')"
          >
            <vx-card slot="no-body"
                     :card-background="'linear-gradient(120deg ,rgba(233, 69, 96 ,0.2), rgba(233, 69, 96,.4)), url(' + card_bg_commandes + ')'"
                     style="background-size: cover"
                     :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center align-vs-card-home">
              <h1>Commandes</h1>
            </vx-card>
          </div>

          <div style="align-items: center; justify-content: center ; display: flex"
               class="vx-col w-full  mb-base lg:w-1/3 dashboard-card"
               @click="redirectToPage('jouets')">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     :card-background="'linear-gradient(120deg ,rgba(233, 69, 96 ,0.2), rgba(233, 69, 96,.4)), url(' + card_bg_jouets + ')'"
                     style="background-size: cover"
                     class="text-center align-vs-card-home">
              <h1>Jouets</h1>
            </vx-card>
          </div>

          <div style="align-items: center; justify-content: center ; display: flex"
               class="vx-col w-full  mb-base lg:w-1/3 dashboard-card"
               @click="redirectToPage('lutins')">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     :card-background="'linear-gradient(120deg ,rgba(233, 69, 96 ,0.2), rgba(233, 69, 96,.4)), url(' + card_bg_lutins + ')'"
                     style="background-size: cover"
                     class="text-center align-vs-card-home">
              <h1>Lutins</h1>
            </vx-card>
          </div>

          <div style="align-items: center; justify-content: center ; display: flex"
               class="vx-col w-full  mb-base lg:w-1/3 dashboard-card"
               @click="redirectToPage('categories')">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     :card-background="'linear-gradient(120deg ,rgba(233, 69, 96 ,0.2), rgba(233, 69, 96,.4)), url(' + card_bg_categories + ')'"
                     style="background-size: cover"
                     class="text-center align-vs-card-home">
              <h1>Catégories</h1>
            </vx-card>
          </div>

          <div style="align-items: center; justify-content: center ; display: flex"
               class="vx-col w-full  mb-base lg:w-1/3 dashboard-card"
               @click="redirectToPage('competences')">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     :card-background="'linear-gradient(120deg ,rgba(233, 69, 96 ,0.2), rgba(233, 69, 96,.4)), url(' + card_bg_competences + ')'"
                     style="background-size: cover"
                     class="text-center align-vs-card-home">
              <h1>Compétences</h1>
            </vx-card>
          </div>

          <div style="align-items: center; justify-content: center ; display: flex"
               class="vx-col w-full  mb-base lg:w-1/3 dashboard-card"
               @click="redirectToPage('manuel')">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     :card-background="'linear-gradient(120deg ,rgba(233, 69, 96 ,0.2), rgba(233, 69, 96,.4)), url(' + card_bg_manuel + ')'"
                     style="background-size: cover"
                     class="text-center align-vs-card-home">
              <h1>Manuel</h1>
            </vx-card>
          </div>

        </div>
      </template>


    </div>
  </div>
</template>
<script>
// import VueApexCharts from 'vue-apexcharts'
// import {VueContentLoading} from 'vue-content-loading'
import {getAPI} from '@/axios'
// import drag from '../assets/utils/download';
// import {saveAs} from 'file-saver';
import Snowf from 'vue-snowf';
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

export default {

  data() {
    return {
      output: "",

      loading: false,
      themeColors: ['#28C76F', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      getTheme: "dark",
      card_bg_img_1: require('@/assets/images/pages/card-bg-image-demo-1.jpg'),
      card_bg_commandes: require('@/assets/images/commandes.jpg'),
      card_bg_jouets: require('@/assets/images/jouets.jpg'),
      card_bg_lutins: require('@/assets/images/lutins.jpg'),
      card_bg_competences: require('@/assets/images/competences.jpg'),
      card_bg_categories: require('@/assets/images/categories.jpg'),
      card_bg_manuel: require('@/assets/images/manuel.jpg'),
    }
  },
  components: {
    Snowf,
    StatisticsCardLine
    // VueApexCharts,
    // VueContentLoading,
    //VclFacebook
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
    isSmallerScreen() {
      return this.$store.state.windowWidth < 800
    },
    themeMode: {
      get() {
        return this.$store.state.theme === "dark" ? true : false;
      },

    },
  },
  watch: {
    getTheme: function () {
      //console.log(this.$store.state.theme);
    }
  },
  methods: {
    redirectToPage(page) {
      this.$router.push(
          {
            path: '/' + page,
          }
      )
    }
  },
  created() {

  },
  mounted() {

  },

}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }

    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.dashboard-card .vx-card {
  min-height: 150px !important;
  cursor: pointer;
}

@keyframes floating {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.align-vs-card-home {
  align-items: center;
  justify-content: center;
  display: flex
}

</style>
