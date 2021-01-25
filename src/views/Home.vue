<template>
  <div style="height: 100vh;">

    <Snowf
        :amount="60"
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
        <div class="vx-row">

          <div class="vx-col w-full  mb-base">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
              <h1>Welcome Santa ! 🎅🏻</h1>
              <p>// La fabrique du pere noel // stats et pallette rouge </p>
            </vx-card>
          </div>

          <div class="vx-col w-full  mb-base lg:w-1/3 dashboard-card">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
              <h1>Commandes</h1>
            </vx-card>
          </div>

          <div class="vx-col w-full  mb-base lg:w-1/3 dashboard-card">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
              <h1>Jouets</h1>
            </vx-card>
          </div>

          <div class="vx-col w-full  mb-base lg:w-1/3 dashboard-card">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
              <h1>Lutins</h1>
            </vx-card>
          </div>

          <div class="vx-col w-full  mb-base lg:w-1/3 dashboard-card">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
              <h1>Catégories</h1>
            </vx-card>
          </div>

          <div class="vx-col w-full  mb-base lg:w-1/3 dashboard-card">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
              <h1>Compétences</h1>
            </vx-card>
          </div>

          <div class="vx-col w-full  mb-base lg:w-1/3 dashboard-card">
            <vx-card slot="no-body" :class="themeMode?'':'bg-primary-gradient'"
                     class="text-center">
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
    Snowf
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
}

.dashboard-card .vx-card {
  min-height: 200px !important;
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
