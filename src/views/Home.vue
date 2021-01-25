<template>
  <div id="dashboard-analytics">

    <template>
      <div v-if="Object.keys(pronostic).length !== 0" class="vx-row">
        <!-- CARD 1: MATCH -->
        <div class="vx-col w-full lg:w-1/2 mb-base">
          <div ref="matchCard">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center greet-user">
              <p class="text-center" style="font-size: 5rem">
                <img src="@/assets/images/logo/logo.png" alt="FOX"
                     style="height: 70px; margin: 0 auto; margin-bottom: 2rem">
              </p>

              <h1 class="mb-6 text-white">{{ pronostic.title }}</h1>
              <h2 class="mb-6 text-white">@{{ pronostic.cote }}</h2>

              <vs-row vs-align="center"
                      vs-type="flex" vs-justify="center" vs-w="12" v-if="pronostic.rencontres.length===1">
                <vs-col class=" w-1/5">
                  <img
                      :src="pronostic.rencontres[0].team_one.image_url?pronostic.rencontres[0].team_one.image_url:pronostic.rencontres[0].team_one.image"
                      alt="Team 1"
                      style=" margin: auto;" class="teamImg">
                </vs-col>
                <vs-col class="w-3/5">
                  <h4 class="text-white text-center"
                      style="vertical-align: middle;">
                    {{ pronostic.rencontres[0]['team_one']['name'] }} <b>-</b>

                    {{ pronostic.rencontres[0]['team_two']['name'] }}</h4>
                </vs-col>
                <vs-col class="w-1/5">
                  <img
                      :src="pronostic.rencontres[0].team_one.image_url?pronostic.rencontres[0].team_one.image_url:pronostic.rencontres[0].team_two.image"
                      alt="Team 2"
                      style="margin: auto;" class="teamImg">
                </vs-col>
              </vs-row>

              <vs-row vs-align="center"
                      vs-type="flex" vs-justify="center" vs-w="12" v-else>
                <vs-col class="w-1/5">
                  <img
                      :src="pronostic.rencontres[0].team_one.image_url?pronostic.rencontres[0].team_one.image_url:pronostic.rencontres[0].team_one.image"
                      alt="Team 1"
                      style=" margin: auto;" class="teamImgSmall">
                </vs-col>
                <vs-col class=" w-3/5">
                  <h4 class="text-white text-center"
                      style="vertical-align: middle;">
                    {{ pronostic.rencontres[0]['team_one']['name'] }} <b>-</b>

                    {{ pronostic.rencontres[0]['team_two']['name'] }}</h4>
                </vs-col>
                <vs-col class=" w-1/5">
                  <img
                      :src="pronostic.rencontres[0].team_one.image_url?pronostic.rencontres[0].team_one.image_url:pronostic.rencontres[0].team_two.image"
                      alt="Team 2"
                      style="margin: auto;" class="teamImgSmall">
                </vs-col>
                <vs-col class=" w-1/5">
                  <img
                      :src="pronostic.rencontres[1].team_one.image_url?pronostic.rencontres[1].team_one.image_url:pronostic.rencontres[1].team_one.image"
                      alt="Team 1"
                      style=" margin: auto;" class="teamImgSmall">
                </vs-col>
                <vs-col class=" w-3/5">
                  <h4 class="text-white text-center"
                      style="vertical-align: middle;">
                    {{ pronostic.rencontres[1]['team_one']['name'] }} <b>-</b>

                    {{ pronostic.rencontres[1]['team_two']['name'] }}</h4>
                </vs-col>
                <vs-col class=" w-1/5">
                  <img
                      :src="pronostic.rencontres[1].team_one.image_url?pronostic.rencontres[1].team_one.image_url:pronostic.rencontres[1].team_two.image"
                      alt="Team 2"
                      style="margin: auto;" class="teamImgSmall">
                </vs-col>
              </vs-row>


              <h3 class="mb-6 text-white" style="margin-top: 20px"><strong>{{
                  pronostic.pronostic
                }}</strong></h3>
              <h3 class="mb-6 text-white"><strong>{{ pronostic.pourcentage_de_mise }}% de mise</strong>
              </h3>

              <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">{{
                  pronostic.commentaire
                }}</p>

              <vs-button @click="saveProno" style="position: absolute; right: 1rem; bottom: 1rem"
                         color="primary"
                         type="filled"
                         icon-pack="feather"
                         icon="icon-download" class="downloadBtn" size="small"></vs-button>
            </vx-card>
          </div>

        </div>
        <div class="vx-col w-full lg:w-1/2 mb-base"
             :style="'background:linear-gradient(0deg, rgba(var(--vs-primary), 0.9), rgba(var(--vs-primary), 0.1)), url('+(pronostic.image_url?pronostic.image_url:pronostic.image)+');  background-size: cover; background-position: center; border-radius: .5rem'">

        </div>
        <div v-if="isSmallerScreen" class="vx-col w-full text-center" style="margin-top: -50px">
          <div class="vx-col w-full">
            <vs-button href="https://t.me/FoxSportif" type="gradient" class="mr-1 ml-1 mt-0"
                       style=" display: inline-flex"
                       icon-pack="feather" icon="icon-send">Telegram
            </vs-button>
            <vs-button href="https://www.instagram.com/foxsportif.fr/" type="gradient" class="mr-1 ml-1 mt-0"
                       style=" display: inline-flex" icon-pack="feather"
                       icon="icon-instagram">Instagram
            </vs-button>
          </div>
        </div>
        <div v-else class="vx-col w-full text-center ">
          <div class="vx-col w-full">
            <vs-button href="https://t.me/FoxSportif" target type="gradient" class="mr-1 ml-1 mt-0"
                       style=" display: inline-flex"
                       icon-pack="feather" icon="icon-send">
              Telegram
            </vs-button>
            <vs-button href="https://www.instagram.com/foxsportif.fr/" target type="gradient" class="mr-1 ml-1 mt-0"
                       style=" display: inline-flex" icon-pack="feather"
                       icon="icon-instagram">
              Instagram
            </vs-button>
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="vx-row">
        <!-- CARD 1: CONGRATS -->
        <div class="vx-col w-full  mb-base">
          <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                   class="text-center greet-user">
            <h1>Aucun pronostic n'est disponible, reviens plus tard 😉</h1>
          </vx-card>
        </div>

        <div class="vx-col w-full text-center">
          <div class="vx-col w-full">
            <vs-button href="https://t.me/FoxSportif" target class="mr-1 ml-1 mt-0" style=" display: inline-flex"
                       icon-pack="feather" icon="icon-send">
              Telegram
            </vs-button>
            <vs-button href="https://www.instagram.com/foxsportif.fr/" target class="mr-1 ml-1 mt-0"
                       style=" display: inline-flex" icon-pack="feather" icon="icon-instagram">
              Instagram
            </vs-button>
          </div>
        </div>
      </div>
    </template>


  </div>
</template>
<script>
// import VueApexCharts from 'vue-apexcharts'
// import {VueContentLoading} from 'vue-content-loading'
import {getAPI} from '@/axios'
// import drag from '../assets/utils/download';
// import {saveAs} from 'file-saver';


export default {

  data() {
    return {
      output: "",
      loading: false,
      themeColors: ['#28C76F', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      getTheme: "dark",
      pronostic: {},
      radarChart: {
        series: [{
          name: 'Series 1',
          data: [3, 4, 4, 5, 5, 4, 4],
        }],
        chartOptions: {
          colors: ['#28C76F', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          labels: ['Conditioning', 'Speed', 'Endurance', 'Soccer Basics', 'Technique', 'Tactical', 'Mental'],

        }
      },
      card_bg_img_1: require('@/assets/images/pages/card-bg-image-demo-1.jpg'),
      card_bg_img_2: require('@/assets/images/pages/card-bg-image-demo-2.jpg')
    }
  },
  components: {
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
    saveProno() {
      this.$vs.loading()
      const el = this.$refs.matchCard;
      const options = {
        type: 'dataURL',
        useCORS: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: function (element) {
          if (element.classList.contains('downloadBtn')) {
            return true;
          }
        }
      }
      window.scrollTo(0, 0);
      this.$html2canvas(el, options).then(output => {
        //this.output = output;
        var FileSaver = require('file-saver');
        FileSaver.saveAs(output, "pronostic.png");
        this.$vs.loading.close()
      });


    },


    getMatch() {
      this.loading = true
      getAPI.get('/api/v1/bet').then(response => {

        // commit('offerPosts', response.data)
        setTimeout(() => {
          this.loading = false
        }, 500);

        // console.log(response
        if (response) {

          this.pronostic = response.data['results'][0]
          console.log(this.pronostic)
        } else {

        }
        // console.log(response.data);
      }).catch(error => {
        this.loading = false
        // console.log(error);

      })
    }
  },
  created() {
    this.getMatch()
  },
  mounted() {
    //this.getProgram()
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

  .teamImg {
    height: 70px;
  }

  .teamImgSmall {
    height: 55px;
    padding: 10px;
  }

  @media(max-width: 776px) {
    .teamImg {
      height: 50px;
    }
    h4 {
      font-size: 16px;
    }
  }
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
</style>
