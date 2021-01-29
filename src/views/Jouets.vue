<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-5">Jouets 🎁</h1>

    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="UsersIcon"
            icon-right
            statistic="12"
            statisticTitle="Nombre total de jouets"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="UserXIcon"
            icon-right
            statistic="12"
            statisticTitle="Durée minimale"
            color="warning"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="UserCheckIcon"
            icon-right
            statistic="12"
            statisticTitle="Durée maximale"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="UserCheckIcon"
            icon-right
            statistic="12"
            statisticTitle="Durée moyenne"
            color="success"/>
      </div>

      <div class="vx-col w-full">
        <vs-button @click="newGame()" class="mb-4" style="margin: auto" color="primary" type="gradient"
                   icon-pack="feather"
                   icon="icon-plus" v-if="!new_game">
          Nouveau jouet
        </vs-button>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full lg:w-2/3 xl:w-2/3">
        <vx-card title="Tous les jouets">
          <div slot="no-body" class="mt-4">
            <vs-table class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM</vs-th>
                <vs-th>COMPÉTENCE REQUISES</vs-th>
                <vs-th>CATÉGORIE</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template>

                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Compét1, Compétence 2</span>
                  </vs-td>
                  <vs-td>
                    <span>Catt 1</span>
                  </vs-td>
                  <vs-td>
                    <span>#0013</span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Compét1, Compétence 2</span>
                  </vs-td>
                  <vs-td>
                    <span>Catt 1</span>
                  </vs-td>
                  <vs-td>
                    <span>#0013</span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Compét1, Compétence 2</span>
                  </vs-td>
                  <vs-td>
                    <span>Catt 1</span>
                  </vs-td>
                  <vs-td>
                    <span>#0013</span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Compét1, Compétence 2</span>
                  </vs-td>
                  <vs-td>
                    <span>Catt 1</span>
                  </vs-td>
                  <vs-td>
                    <span>#0013</span>
                  </vs-td>
                </vs-tr>

              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/3 xl:w-1/3" v-if="new_game">
        <vx-card slot="no-body">
          <h4 class="text-center mb-3">Nouveau jouet 🎁</h4>
          <p class="text-center mb-1">ID #013</p>

          <vs-input color="success" class="mt-8 w-full" label-placeholder="Durée de réalisation (minutes)"/>

          <p class="mt-3">Catégorie :</p>
          <v-select class="mt-2 mb-2" :options="options_categories" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>

          <p class="mt-3 mb-2">Compétences</p>
          <v-select multiple :closeOnSelect="false" v-model="selected" :options="options"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
          <br>

          <vs-button size="small" class="mt-3" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     @click="$vs.notify({
                      title:'Primary',
                      position:'top-right',
                      text:'Valider',
                      color:'success'})">
            Valider
          </vs-button>
        </vx-card>

      </div>
      <div class="vx-col w-full lg:w-1/3 xl:w-1/3 mb-base" v-else>
        <vx-card title="Disponibilité">
          <!-- CHART -->
          <template slot="no-body">
            <div class="mt-0">
              <vue-apex-charts type="radialBar" height="240" :series="series" :options="chartOptions"/>
            </div>
          </template>

          <!-- DATA -->
          <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
              <p class="mt-4">Dispos</p>
              <p class="mb-4 text-3xl font-semibold">64</p>
            </div>
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
              <p class="mt-4">Occupés</p>
              <p class="mb-4 text-3xl font-semibold">12</p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'

export default {
  data() {
    return {
      new_game: false,
      options_competences: [
        {id: 1, label: 'Compétence 1'},
        {id: 2, label: 'Compétence 2'},
        {id: 3, label: 'Compétence 3'},
      ],
      options_categories: [
        {id: 1, label: 'Cat 1'},
        {id: 2, label: 'Cat 2'},
        {id: 3, label: 'Cat 3'},
      ],
      selected: [],
      options: ['Compétence 1', 'Compétence 2', 'Compétence 3'],
      chartOptions: {
        plotOptions: {
          radialBar: {
            size: 110,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '77%'
            },
            track: {
              background: '#bfc5cc',
              strokeWidth: '50%'
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 18,
                color: '#99a2ac',
                fontSize: '4rem'
              }
            }
          }
        },
        colors: ['#00db89'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#00b5b5'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        chart: {
          sparkline: {
            enabled: true
          },
          dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1
          }
        }
      },
      series: [79],
    }
  },
  name: "Jouets",
  components: {
    StatisticsCardLine,
    'v-select': vSelect,
    VueApexCharts
  },

  methods: {
    newGame() {
      this.new_game = true
    }
  }
}
</script>

<style scoped>

</style>