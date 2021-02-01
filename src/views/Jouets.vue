<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-5">Jouets 🎁</h1>

    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="HashIcon"
            icon-right
            :statistic="game_duration.length"
            statisticTitle="Nombre de jouets"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="ClockIcon"
            icon-right
            :statistic="Math.min(...game_duration) + ' min'"
            statisticTitle="Durée minimale"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="ClockIcon"
            icon-right
            :statistic="Math.max(...game_duration)"
            statisticTitle="Durée maximale"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="ClockIcon"
            icon-right
            :statistic="(game_duration.reduce(function(a, b){
        return a + b;
    }, 0)/game_duration.length).toFixed(2)"
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
      <div :class="new_game||edit_mode ? 'lg:w-2/3 xl:w-2/3' : ''" class="vx-col w-full">
        <vx-card title="Tous les jouets">
          <div slot="no-body" class="mt-4">
            <vs-table max-items="5" pagination :data="jouets" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM</vs-th>
                <vs-th>COMPÉTENCE REQUISES</vs-th>
                <vs-th>DURÉE (minutes)</vs-th>
                <vs-th>CATÉGORIE</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template slot-scope="{data}">

                <vs-tr
                    :state="jouets[indextr].archived ? 'danger':''"
                    :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.id">
                    <span>#{{ tr.id }}</span>
                  </vs-td>
                  <vs-td :data="tr.name">
                    <span>{{ tr.name }}</span>
                  </vs-td>
                  <vs-td :data="tr.competences">
                    <span :key="index" v-for="(competence, index) in tr.competences">- {{
                        competence.name
                      }} <br> </span>
                  </vs-td>
                  <vs-td :data="tr.duree">
                    <span>{{ tr.duree }}</span>
                  </vs-td>
                  <vs-td :data="tr.categorieName">
                    <span>{{ tr.categorieName }}</span>
                  </vs-td>
                  <vs-td :data="tr.archived">
                    <span class="flex items-center px-2 py-1 rounded" v-if="tr.archived">
                        <div class="bg-warning h-3 w-3 rounded-full mr-2"></div>Archivé
                    </span>
                    <span class="flex items-center px-2 py-1 rounded" v-else>
                        <div class="bg-success h-3 w-3 rounded-full mr-2"></div>Disponible
                    </span>
                  </vs-td>
                  <vs-td>
                    <span>
                      <vs-icon class="mr-2" @click="editJouet(indextr)" icon="edit"></vs-icon>
                      <vs-icon color="danger" icon="delete" @click="clickDelete(indextr)"></vs-icon>
                    </span>
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
          <p class="text-center mb-1">ID #0{{ this.getID() }}</p>

          <vs-input color="success" class="mt-8 w-full"
                    label-placeholder="Nom du jouet"
                    v-validate="'required|alpha_dash|min:1'"
                    name="jouet"
                    v-model="jouet"/>

          <vs-input color="success" class="mt-8 w-full"
                    label-placeholder="Durée de réalisation (minutes)"
                    v-validate="'digits'"
                    name="duree"
                    type="number"
                    v-model="duree"/>

          <p class="mt-3">Catégorie</p>
          <v-select v-model="selectedCat" name="categorie" class="mt-2 mb-2" :options="options_categories"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"/>

          <p class="mt-3 mb-2">Compétences</p>
          <v-select name="competences"
                    multiple
                    :closeOnSelect="false"
                    v-model="selectedComp"
                    :options="options_competences"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
          <br>

          <vs-button size="small" class="mt-3" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     :disabled="!validateForm()"
                     @click="insertJouet()">
            Valider
          </vs-button>
        </vx-card>

      </div>

      <vs-popup title="Suppression" :active.sync="popupDeleteActive">
        <h4 class="text-center mb-3">Suppression du jouet</h4>
        <p class="text-center mb-1">Êtes vous sûr de vouloir archiver "{{ this.jouet_delete }}" ?</p>
        <div class="vx-row">
          <div class="vx-col w-1/2">
            <vs-button size="small" class="mt-8" style="margin: auto" color="danger" type="gradient" icon-pack="feather"
                       icon="icon-check"
                       @click="deleteJouet()">
              Archiver
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

      <div class="vx-col w-full lg:w-1/3 xl:w-1/3" v-if="edit_mode">
        <vx-card slot="no-body">
          <h4 class="text-center mb-3">Modification du jouet</h4>
          <p class="text-center mb-1">ID #0{{ this.edit_id }}</p>

          <vs-input color="success" class="mt-8 w-full"
                    label-placeholder="Nom du jouet"
                    v-validate="'required|alpha_dash|min:1'"
                    name="jouet"
                    v-model="edit_name"/>

          <vs-input color="success" class="mt-8 w-full"
                    label-placeholder="Durée de réalisation (minutes)"
                    v-validate="'digits'"
                    name="duree"
                    type="number"
                    v-model="edit_duree"/>

          <p class="mt-3">Catégorie</p>
          <v-select v-model="editSelectedCat" name="categorie" class="mt-2 mb-2" :options="options_categories"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"/>

          <p class="mt-3 mb-2">Compétences</p>
          <v-select name="competences"
                    multiple
                    :closeOnSelect="false"
                    v-model="editSelectedComp"
                    :options="options_competences"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
          <br>

          <vs-button size="small" class="mt-3" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     :disabled="!validateEditForm()"
                     @click="updateJouet()">
            Valider
          </vs-button>
        </vx-card>

      </div>
      <div class="vx-col w-full lg:w-1/3 xl:w-1/3 mb-base" v-if="false">
        <vx-card title="Statistiques">
          <div slot="no-body">
            <vue-apex-charts class="mt-3 mb-6" type="donut" height="300" :options="chartOptions" :series="series"/>
          </div>

        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import {axiosBase, getAPI} from "@/axios";

export default {
  data() {
    return {
      edit_id: 0,
      edit_name: '',
      editSelectedComp: [],
      edit_duree: 0,
      edit_mode: false,
      editSelectedCat: [],
      popupDeleteActive: false,
      jouet_delete: '',
      id_delete: 0,

      new_game: false,
      game_duration: [],
      jouets_categories: [],
      options_competences: [],
      options_categories: [],
      selectedComp: [],
      selectedCat: [],
      analyticsData: {},
      options: [],
      series: [58.6, 34.9, 6.5],
      chartOptions: {
        labels: ['Cat 1', 'Cat 2', 'Cat 3'],
        dataLabels: {
          enabled: true
        },
        legend: {show: false},
        chart: {
          offsetY: 30,
          type: 'donut',
          toolbar: {
            show: true
          }
        },
        stroke: {width: 0},
        colors: ['#7961F9', '#FF9F43', '#EA5455'],
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#9c8cfc', '#FFC085', '#f29292']
          }
        }
      },
      jouets: [],
      jouet: '',
      duree: 0
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
      this.edit_mode = false
    },
    editJouet(index) {
      this.new_game = false

      this.edit_id = this.jouets[index].id
      this.edit_name = this.jouets[index].name
      this.edit_duree = this.jouets[index].duree
      this.editSelectedCat.push(this.jouets[index].categorieName)

      this.edit_mode = true
    },
    clickDelete(index) {
      this.jouet_delete = this.jouets[index].name
      this.id_delete = this.jouets[index].id
      this.popupDeleteActive = true
    },
    deleteJouet() {
      this.$vs.loading()
      axiosBase.post('/app/jeux/' + this.id_delete, {},
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        this.$vs.loading.close()
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Jouet archivé',
            text: "Le jouet a été archivé",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.jouets = []
          this.getJouets()
          this.popupDeleteActive = false
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
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
      return this.jouet !== '' && this.duree !== '' && this.duree > 0
    },
    validateEditForm() {
      return this.edit_name !== '' && this.edit_duree !== '' && this.edit_duree > 0
    },

    insertJouet() {
      this.$vs.loading()
      axiosBase.post('/app/jeux/', {
            'name': this.jouet,
            'duree': this.duree,
            'categorieId': this.selectedCat.id,
            'competences': this.selectedComp
          },
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        this.$vs.loading.close()
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Jouet inseré',
            text: "Le jouet a été inseré",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.jouets.push(response.data.content)
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Erreur',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },

    updateJouet() {
      this.$vs.loading()
      axiosBase.post('/app/jeux/', {
            'id': this.edit_id,
            'name': this.edit_name,
            'duree': this.edit_duree,
            'categorieId': this.editSelectedCat.id,
            'competences': this.editSelectedComp
          },
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        this.$vs.loading.close()
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Jouet modifié',
            text: "Le jouet a été mis à jour",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.jouets = []
          this.getJouets()
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Erreur',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },

    getID() {
      try {
        return this.jouets[this.jouets.length - 1].id + 1
      } catch (error) {
        return 1
      }
    },

    getJouets() {
      this.$vs.loading()
      axiosBase.get('/app/jeux', {
        params: {
          page: 0,
          max: 100
        }
      }).then(response => {
        this.$vs.loading.close()
        if (response) {
          this.jouets.push(...response.data.content)
          this.getDurations(response.data.content)
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
      })
    },

    getDurations(jouets) {
      for (var jouet in jouets) {
        this.game_duration.push(jouets[jouet]['duree'])
        var cat = jouets[jouet]['categorieName']
      }

      var groups = jouets['categorieName'].map(function (value, index) {
        return value['categorieName']
      });

      groups.forEach(function (value, index) {
        if (value in this.jouets_categories) {
          this.jouets_categories[value] += 1;
        } else {
          this.jouets_categories[value] = 1;
        }
      });
      console.log(this.jouets_categories)
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
    getCategories() {
      this.categories = []
      axiosBase.get('/app/cat', {
        params: {
          page: 0,
          max: 100
        }
      }).then(response => {
        if (response) {
          this.options_categories.push(...response.data.content)
          this.replaceKey(this.options_categories)
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
  },

  created() {
    this.getJouets()
    this.getCompetences()
    this.getCategories()
  }
}
</script>

<style scoped>

</style>