<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-5">Commandes 📝</h1>

    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="ClipboardIcon"
            icon-right
            statistic="12"
            statisticTitle="Nombre total"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="LoaderIcon"
            icon-right
            statistic="12"
            statisticTitle="En cours"
            color="warning"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="CheckCircleIcon"
            icon-right
            statistic="12"
            statisticTitle="Terminées"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="ArchiveIcon"
            icon-right
            statistic="12"
            statisticTitle="Archivées"
            color="success"/>
      </div>

      <div class="vx-col w-full">
        <vs-button @click="newOrder()" class="mb-4" style="margin: auto" color="primary" type="gradient"
                   icon-pack="feather"
                   icon="icon-plus" v-if="!new_order">
          Nouvelle commande
        </vs-button>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full lg:w-2/3 xl:w-2/3">
        <vx-card title="Toutes les commandes">
          <div slot="no-body" class="mt-4">
            <vs-table class="table-dark-inverted">
              <template slot="thead">
                <vs-th>NUMÉRO</vs-th>
                <vs-th>DATE</vs-th>
                <vs-th>JOUET 👉🏼 LUTIN</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template>
                <vs-tr>
                  <vs-td>
                    <span>#0013</span>
                  </vs-td>
                  <vs-td>
                    <span>27/01/2020</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet15 👉🏼 Lutin5</span>
                  </vs-td>
                  <vs-td>
                      <span class="flex items-center px-2 py-1 rounded"><div
                          class="bg-warning h-3 w-3 rounded-full mr-2"></div>En cours
                    </span>
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
      <div class="vx-col w-full lg:w-1/3 xl:w-1/3" v-if="new_order">
        <vx-card slot="no-body">
          <h4 class="text-center mb-3">Nouvelle commande</h4>
          <p class="text-center mb-1">Numéro #013</p>

          <div :key="i" v-for="i in nbGames" class="mt-5">
            <p>Jouet {{ i }} :</p>
            <v-select class="mt-2 mb-2" :options="options_jouets" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
            <v-select class="mt-2 mb-2" :options="options_lutins" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
          </div>

          <div class="vx-row">

            <vs-button @click="addGame()" size="small" class="mt-5 vx-col " style="width: 40%; margin: auto"
                       color="#283046"
                       icon-pack="feather"
                       icon="icon-plus">
              Ajouter un jouet
            </vs-button>
            <vs-button @click="delGame()" size="small" class="mt-5 vx-col" style="width: 40%; margin: auto"
                       color="#283046"
                       icon-pack="feather"
                       icon="icon-x" :disabled="nbGames < 2">
              Supprimer un jouet
            </vs-button>
          </div>


          <vs-button size="small" class="mt-5" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     @click="$vs.notify({
                      title:'Primary',
                      position:'top-right',
                      text:'Lorem ipsum dolor sit amet, consectetur',
                      color:'success'})">
            Valider
          </vs-button>
        </vx-card>

      </div>
      <div class="vx-col w-full lg:w-1/3 xl:w-1/3 mb-base" v-else>
        <vx-card title="Statistiques">
          <!-- CHART -->
          <template slot="no-body">
            <div class="mt-0">
              <vue-apex-charts type="radialBar" height="240" :series="series" :options="chartOptions"/>
            </div>
          </template>

          <!-- DATA -->
          <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
              <p class="mt-4">Terminées</p>
              <p class="mb-4 text-3xl font-semibold">64</p>
            </div>
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
              <p class="mt-4">En cours</p>
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
import {axiosBase} from "@/axios";

export default {
  data() {
    return {
      options_jouets: [
        {id: 1, label: 'Jouet 1'},
        {id: 2, label: 'Jouet 2'},
        {id: 3, label: 'Jouet 3'},
      ],
      options_lutins: [
        {id: 1, label: 'Lutin 1'},
        {id: 2, label: 'Lutin 2'},
        {id: 3, label: 'Lutin 3'},
      ],
      new_order: false,
      nbGames: 1,
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
      commandes: []
    }
  },
  name: "Commandes",
  components: {
    StatisticsCardLine,
    'v-select': vSelect,
    VueApexCharts
  },

  methods: {
    newOrder() {
      this.new_order = true
    },
    addGame() {
      this.nbGames++
    },
    delGame() {
      this.nbGames--
    },
    getCommandes() {
      axiosBase.get('/app/commande', {
        params: {
          page: 0,
          max: 100
        },
        headers: {Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXBhQGFkbWluLmZyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJleHAiOjE2MTI2MDMzMDUsImlhdCI6MTYxMTczOTMwNX0.wFotiSTG3ZXXgnmYZ907o0YB03mfymcLNEvbZXWcnHb0IlJICwW9w2aYh4aawga6JYYGfB1yDfgopS_kV820lA`}
      }).then(response => {
        if (response) {
          this.commandes.push(...response.data.content)
        } else {
        }
      }).catch(error => {
      })
    }
  },

  created() {
    this.getCommandes()
  }
}
</script>

<style scoped>

</style>