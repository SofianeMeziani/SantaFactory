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
                  :statistic="this.lutins.length"
                  statisticTitle="Nombre total de lutins"
                  color="success"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="UserXIcon"
                  icon-right
                  :statistic="this.lutins_occupes.length"
                  statisticTitle="Lutins occupés"
                  color="warning"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="UserCheckIcon"
                  icon-right
                  :statistic="this.lutins_dispo.length"
                  statisticTitle="Lutins disponibles"
                  color="success"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">

              <download-csv
                  class="btn-download"
                  :data="lutins"
                  name="lutins.csv">
                <vs-button class="mt-5 w-full" style="margin: auto" color="success" type="gradient"
                           icon-pack="feather"
                           icon="icon-download"
                           :disabled="lutins.length<1">
                  Télécharger CSV
                </vs-button>
              </download-csv>
              <vs-button @click="downloadPDF()" class="mt-4 w-full" style="margin: auto" color="success" type="gradient"
                         icon-pack="feather"
                         icon="icon-download"
                         :disabled="lutins.length<1">
                Télécharger PDF
              </vs-button>

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

            <vs-input color="success" class="mt-8 w-full"
                      v-validate="'required|alpha_dash|min:1'"
                      v-model="name"
                      label-placeholder="Nom du lutin"/>


            <vs-input color="success"
                      class="mt-8 w-full"
                      v-validate="'required|email'"
                      type="email"
                      v-model="email"
                      label-placeholder="Adresse mail"/>

            <vs-input color="success" class="mt-8 w-full"
                      v-validate="'required|min:6'"
                      type="password"
                      v-model="password"
                      label-placeholder="Mot de passe"/>

            <p class="mt-3 mb-2">Compétences</p>
            <v-select name="competences"
                      multiple
                      :closeOnSelect="false"
                      v-model="selectedComp"
                      :options="options_competences"
                      :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
            <br>

            <vs-button size="small" class="mt-5" style="margin: auto" color="success" type="gradient"
                       icon-pack="feather"
                       icon="icon-check"
                       :disabled="!validateForm()"
                       @click="insertLutin()">
              Valider
            </vs-button>
          </vx-card>
          <vx-card v-if="edit_mode" slot="no-body">
            <h4 class="text-center mb-3">Modification Lutin 🧑🏻‍🎄</h4>
            <p class="text-center mb-1">ID #013</p>

            <vs-input color="success" class="mt-8 w-full"
                      v-validate="'required|alpha_dash|min:1'"
                      v-model="edit_name"
                      label-placeholder="Nom du lutin"/>


            <vs-input color="success"
                      class="mt-8 w-full"
                      v-validate="'required|email'"
                      type="email"
                      v-model="edit_email"
                      label-placeholder="Adresse mail"/>

            <vs-input color="success" class="mt-8 w-full"
                      v-validate="'required|min:6'"
                      type="password"
                      v-model="edit_password"
                      label-placeholder="Mot de passe"/>

            <p class="mt-3 mb-2">Compétences</p>
            <v-select name="competences"
                      multiple
                      :closeOnSelect="false"
                      v-model="editSelectedComp"
                      :options="options_competences"
                      :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
            <br>

            <vs-button size="small" class="mt-5" style="margin: auto" color="success" type="gradient"
                       icon-pack="feather"
                       icon="icon-check"
                       :disabled="!validateEditForm()"
                       @click="updateLutin()">
              Valider
            </vs-button>
          </vx-card>
          <vx-card v-if="!edit_mode && !new_lutin" title="Disponibilité des lutins">
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
    <vs-popup title="Suppression" :active.sync="popupDeleteActive">
      <h4 class="text-center mb-3">Suppression du lutin ID #{{ this.delete_id }} 🎯</h4>
      <p class="text-center mb-1">Êtes vous sûr de vouloir supprimer "{{ this.delete_name }}" ?</p>
      <div class="vx-row">
        <div class="vx-col w-1/2">
          <vs-button size="small" class="mt-8" style="margin: auto" color="danger" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     @click="deleteLutin()">
            Supprimer
          </vs-button>
        </div>
        <div class="vx-col w-1/2">
          <vs-button size="small" class="mt-8" style="margin: auto" color="dark" icon-pack="feather"
                     icon="icon-check"
                     @click="popupDeleteActive = false">
            Annuler
          </vs-button>
        </div>
      </div>
    </vs-popup>
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
                    <span>
                      <vs-icon class="mr-2" @click="editLutin(indextr)" icon="edit"></vs-icon>
                      <vs-icon color="danger" icon="delete" @click="clickDelete(indextr)"></vs-icon>
                    </span>
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
import JsonCSV from 'vue-json-csv'
import {jsPDF} from "jspdf";
import 'jspdf-autotable'

export default {
  data() {
    return {
      email: '',
      name: '',
      password: '',
      selectedComp: [],
      lutins: [],
      lutins_dispo: [],
      lutins_occupes: [],
      new_lutin: false,
      options_competences: [],
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
      selected: [],
      downloadImg: require('@/assets/images/lutins.jpg'),
      delete_id: 0,
      delete_name: '',
      popupDeleteActive: false,
      edit_id: 0,
      edit_name: '',
      edit_duree: 0,
      editSelectedComp: [],
      edit_mode: false,
      edit_email: '',
      edit_password: ''

    }
  },
  name: "Lutins",
  components: {
    StatisticsCardLine,
    'v-select': vSelect,
    VueApexCharts,
    'downloadCsv': JsonCSV
  },

  methods: {
    newLutin() {
      this.new_lutin = true
      this.edit_mode = false
    },

    updateLutin() {
      axiosBase.post('/app/user/', {
            'id': this.edit_id,
            'email': this.edit_email,
            'password': this.edit_password,
            'name': this.edit_name,
            'role': 'USER',
            'competences': this.editSelectedComp
          },
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Lutin inseré',
            text: "Le lutin a été inseré",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.lutins = []
          this.lutins_dispo = []
          this.lutins_occupes = []
          this.getFinalLutin()
        } else {
        }
      }).catch(error => {
        console.log(error)
        this.$vs.notify({
          title: 'Erreur',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },

    editLutin(index) {
      this.new_lutin = false

      this.edit_id = this.lutins[index].id
      this.edit_name = this.lutins[index].name
      this.edit_duree = this.lutins[index].duree
      this.edit_email = this.lutins[index].email

      this.edit_mode = true
    },

    clickDelete(index) {
      this.delete_id = this.lutins[index].id
      this.delete_name = this.lutins[index].name
      this.popupDeleteActive = true
    },

    deleteLutin() {
      axiosBase.post('/app/user/' + this.delete_id, {},
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Lutin supprimé',
            text: "Le lutin a été supprimé",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.lutins = []
          this.getFinalLutin()
          this.popupDeleteActive = false
        } else {
        }
      }).catch(error => {
        console.log(error)
        this.$vs.notify({
          title: 'Erreur',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
        this.popupEditActive = false
      })
    },

    validateForm() {
      return this.name !== '' && this.password !== '' && this.email !== ''
    },

    validateEditForm() {
      return this.edit_name !== '' && this.edit_password !== '' && this.edit_email !== ''
    },

    downloadPDF() {
      let doc = new jsPDF();
      let lutinTab = []

      for (let key in this.lutins) {
        lutinTab.push([this.lutins[key].id, this.lutins[key].name, this.lutins[key].email, this.lutins[key].available])
      }

      doc.text("Liste des lutins", 15, 10);
      doc.autoTable({
        head: [['ID', 'Nom', 'Email', 'Disponible']],
        body: lutinTab,
      })
      doc.save('Lutins.pdf');
    },

    insertLutin() {
      this.$vs.loading()
      axiosBase.post('/app/register/', {
            'email': this.email,
            'password': this.password,
            'name': this.name,
            'role': 'USER',
            'competences': this.selectedComp
          },
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Lutin inseré',
            text: "Le lutin a été inseré",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.lutins = []
          this.lutins_dispo = []
          this.lutins_occupes = []
          this.getFinalLutin()
        } else {
          this.$vs.loading.close()
        }
      }).catch(error => {
        this.$vs.loading.close()
        console.log(error)
        this.$vs.notify({
          title: 'Erreur',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },

    getCompetences() {
      this.competences = []
      axiosBase.get('/app/competence', {
        params: {
          page: 0,
          max: 100
        }
      }).then(response => {
        if (response) {
          this.options_competences.push(...response.data.content)
          this.replaceKey(this.options_competences)
        } else {
        }
      }).catch(error => {
      })
    },

    replaceKey(json) {
      for (var elt in json) {
        json[elt]['label'] = json[elt]['name']
      }
    },

    async getFinalLutin() {
      let DispoLutin = this.getLutinsDispo()
    },

    getLutins(res) {

      axiosBase.get('/app/users').then(response => {
        if (response) {
          let getLutinsAtt = this.addAvailableAttribute(response.data.content)

          for (var lutin in res) {
            getLutinsAtt.find(item => item.id === res[lutin].id)['available'] = true
          }
          this.lutins.push(...getLutinsAtt)
        } else {
        }
        this.$vs.loading.close()
      }).catch(error => {
        //console.log(error)
        this.$vs.loading.close()
      })
    },
    async getLutinsDispo() {
      this.$vs.loading()
      axiosBase.get('/app/availableUsers',).then((response) => {
        this.$vs.loading.close()
        if (response) {
          this.lutins_dispo.push(...response.data.content.availaible)
          this.lutins_occupes.push(...response.data.content.notAvailaible)
          this.series = [(this.lutins_dispo.length / (this.lutins_dispo.length + this.lutins_occupes.length) * 100).toFixed(1)]
          return this.addAvailableAttribute(response.data.content.availaible);
        } else {
          this.$vs.loading.close()
          return []
        }
      }).then(res => {
        this.$vs.loading.close()
        this.getLutins(res);
      }).catch(error => {
        this.$vs.loading.close()
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
    this.getCompetences()
  }
}
</script>

<style scoped>

</style>