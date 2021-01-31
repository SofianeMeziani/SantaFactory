<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-5">Lutins 🧑🏻‍🎄</h1>

    <div class="vx-row">
      <div class="vx-row w-full">
        <div class="vx-col w-2/3">
          <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="UsersIcon"
                  icon-right
                  statistic="12"
                  statisticTitle="Nombre total de lutins"
                  color="success"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="UserXIcon"
                  icon-right
                  statistic="12"
                  statisticTitle="Lutins occupés"
                  color="warning"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="UserCheckIcon"
                  icon-right
                  statistic="12"
                  statisticTitle="Lutins disponibles"
                  color="success"/>
            </div>
            <div class="vx-col w-full">
              <vs-button @click="newLutin()" class="mb-4" style="margin: auto" color="primary" type="gradient"
                         icon-pack="feather"
                         icon="icon-plus" v-if="!new_lutin">
                Nouveau Lutin
              </vs-button>
            </div>
          </div>

        </div>
        <div class="vx-col w-1/3">
          <vx-card v-if="new_lutin" slot="no-body">
            <h4 class="text-center mb-3">Nouveau Lutin 🧑🏻‍🎄</h4>
            <p class="text-center mb-1">ID #013</p>

            <vs-input color="success" class="mt-8 w-full" label-placeholder="Nom du lutin"/>

            <p class="mt-3 mb-3">Compétences :</p>
            <v-select multiple :closeOnSelect="false" v-model="selected" :options="options_competences"
                      :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
            <br>

            <vs-button size="small" class="mt-5" style="margin: auto" color="success" type="gradient"
                       icon-pack="feather"
                       icon="icon-check"
                       @click="$vs.notify({
                      title:'Primary',
                      position:'top-right',
                      text:'Valider',
                      color:'success'})">
              Valider
            </vs-button>
          </vx-card>
          <vx-card v-else title="Disponibilité des lutins">
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
                <p class="mb-4 text-3xl font-semibold">{{ lutins_dispo.length }}</p>
              </div>
              <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
                <p class="mt-4">Occupés</p>
                <p class="mb-4 text-3xl font-semibold">{{ lutins_occupes.length }}</p>
              </div>
            </div>
          </vx-card>
        </div>
      </div>

    </div>
    <div class="vx-row mt-5">
      <div class="vx-col w-full">
        <vx-card title="Tous les lutins">
          <div slot="no-body" class="mt-4">
            <vs-table max-items="5" pagination :data="lutins" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM</vs-th>
                <vs-th>EMAIL</vs-th>
                <vs-th>COMPÉTENCE(S)</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template slot-scope="{data}">

                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.id">
                    <span>#{{ tr.id }}</span>
                  </vs-td>
                  <vs-td :data="tr.name">
                    <span>{{ tr.name }}</span>
                  </vs-td>
                  <vs-td :data="tr.email">
                    <span>{{ tr.email }}</span>
                  </vs-td>
                  <vs-td :data="tr.competences">
                    <span :key="index" v-for="(competence, index) in tr.competences">{{ competence.name }}, </span>
                  </vs-td>
                  <vs-td :data="tr.available">
                      <span class="flex items-center px-2 py-1 rounded" v-if="tr.available">
                        <div class="bg-success h-3 w-3 rounded-full mr-2"></div>Disponible
                    </span>

                    <span class="flex items-center px-2 py-1 rounded" v-else>
                        <div class="bg-warning h-3 w-3 rounded-full mr-2"></div>Occupé
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
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'
import {axiosBase, getAPI} from "@/axios";

export default {
  data() {
    return {
      lutins: [],
      lutins_dispo: [],
      lutins_occupes: [],
      new_lutin: false,
      options_competences: [
        {id: 1, label: 'Compétence 1'},
        {id: 2, label: 'Compétence 2'},
        {id: 3, label: 'Compétence 3'},
      ],
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
      series: [0],
      selected: []
    }
  },
  name: "Lutins",
  components: {
    StatisticsCardLine,
    'v-select': vSelect,
    VueApexCharts
  },

  methods: {
    newLutin() {
      this.new_lutin = true
    },

    async getFinalLutin() {
      let DispoLutin = this.getLutinsDispo()
    },

    getLutins(res) {
      axiosBase.get('/app/users', {
        headers: {Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXBhQGFkbWluLmZyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJleHAiOjE2MTI2MDMzMDUsImlhdCI6MTYxMTczOTMwNX0.wFotiSTG3ZXXgnmYZ907o0YB03mfymcLNEvbZXWcnHb0IlJICwW9w2aYh4aawga6JYYGfB1yDfgopS_kV820lA`}
      }).then(response => {
        if (response) {
          let getLutinsAtt = this.addAvailableAttribute(response.data.content)

          for (var lutin in res) {
            getLutinsAtt.find(item => item.id === res[lutin].id)['available'] = true
          }
          this.lutins.push(...getLutinsAtt)
        } else {
        }
      }).catch(error => {
        console.log(error)
      })
    },
    async getLutinsDispo() {
      axiosBase.get('/app/availableUsers', {
        headers: {Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXBhQGFkbWluLmZyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJleHAiOjE2MTI2MDMzMDUsImlhdCI6MTYxMTczOTMwNX0.wFotiSTG3ZXXgnmYZ907o0YB03mfymcLNEvbZXWcnHb0IlJICwW9w2aYh4aawga6JYYGfB1yDfgopS_kV820lA`}
      }).then((response) => {
        if (response) {
          this.lutins_dispo.push(...response.data.content.availaible)
          this.lutins_occupes.push(...response.data.content.notAvailaible)
          this.series = [this.lutins_dispo.length / (this.lutins_dispo.length + this.lutins_occupes.length) * 100]
          return this.addAvailableAttribute(response.data.content.availaible);
        } else {
          return []
        }
      }).then(res => {
        this.getLutins(res);
      }).catch(error => {
        alert(error)
      })
    },

    addAvailableAttribute(lutins) {
      for (var lutin in lutins) {
        lutins[lutin]['available'] = false
      }
      return lutins;
    }
  },

  created() {
    this.getFinalLutin()
  }
}
</script>

<style scoped>

</style>ßƒrzgsszdv