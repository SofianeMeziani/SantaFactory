<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-5">Commandes 📝</h1>

    <div class="vx-row">
      <div class="vx-row w-full">
        <div class="vx-col w-2/3">
          <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="ClipboardIcon"
                  icon-right
                  :statistic="stats.totalCommandes"
                  statisticTitle="Nombre total de commandes"
                  color="success"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="LoaderIcon"
                  icon-right
                  :statistic="stats.nbrActiveCommande"
                  statisticTitle="Commandes en cours"
                  color="warning"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <statistics-card-line
                  hideChart
                  class="mt-5 mb-base"
                  icon="CheckCircleIcon"
                  icon-right
                  :statistic="stats.totalCommandes - stats.nbrActiveCommande"
                  statisticTitle="Commandes terminées"
                  color="success"/>
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">

              <download-csv
                  class="btn-download"
                  :data="commandes"
                  name="commandes.csv">
                <vs-button class="mt-5 w-full" style="margin: auto" color="success" type="gradient"
                           icon-pack="feather"
                           icon="icon-download"
                           :disabled="commandes.length<1">
                  Télécharger CSV
                </vs-button>
              </download-csv>
              <vs-button @click="downloadPDF()" class="mt-4 w-full" style="margin: auto" color="success" type="gradient"
                         icon-pack="feather"
                         icon="icon-download"
                         :disabled="commandes.length<1">
                Télécharger PDF
              </vs-button>

            </div>
            <div v-if="isAdmin()" class="vx-col w-full">
              <vs-button @click="newOrder()" class="mb-4" style="margin: auto" color="primary" type="gradient"
                         icon-pack="feather"
                         icon="icon-plus" v-if="!new_order">
                Nouvelle commande
              </vs-button>
            </div>
          </div>

        </div>
        <div class="vx-col w-1/3">
          <vx-card class="mb-5" v-if="new_order" slot="no-body">
            <h4 class="text-center mb-3">Nouvelle commande</h4>
            <p class="text-center mb-1">Numéro #013</p>
            <vs-input class="mt-5 mb-2 w-full"
                      label-placeholder="Nom de la commande"
                      v-validate="'required|alpha_dash|min:1'"
                      name="comment"
                      v-model="comment"/>
            <div :key="i" v-for="i in nbGames" class="mt-5">
              <p>Jouet {{ i }} :</p>
              <v-select class="mt-2 mb-2" v-model="selectedJouets[i]" :options="jouets" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
              <v-select class="mt-2 mb-2" v-model="selectedLutins[i]" :options="lutins" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
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


            <vs-button size="small" class="mt-5" style="margin: auto" color="success" type="gradient"
                       icon-pack="feather"
                       icon="icon-check"
                       @click="insertCommande()">
              Valider
            </vs-button>
          </vx-card>

          <!-- ________________________________________________________________________________ -->

          <vx-card class="mb-5" v-else-if="edit_mode" slot="no-body">
            <h4 class="text-center mb-3">Modification commande</h4>
            <p class="text-center mb-1">Numéro #{{ this.edit_id }}</p>
            <vs-input class="mt-10 w-full mb-2"
                      label-placeholder="Nom de la commande"
                      v-validate="'required|alpha_dash|min:1'"
                      name="edit_comment"
                      v-model="edit_comment"/>
            <div :key="i" v-for="i in nbEditGames" class="mt-5">
              <p>Jouet {{ i }} :</p>
              <v-select class="mt-2 mb-2" v-model="editSelectedJouets[i-1]" :options="jouets" label="name"
                        :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
              <v-select class="mt-2 mb-2" v-model="editSelectedLutins[i-1]" :options="lutins" label="name"
                        :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
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


            <vs-button size="small" class="mt-5" style="margin: auto" color="success" type="gradient"
                       icon-pack="feather"
                       icon="icon-check"
                       @click="updateOrder()">
              Valider
            </vs-button>
          </vx-card>
          <!-- ________________________________________________________________________________ -->

          <vx-card v-else title="Commandes terminées">
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
                <p class="mb-4 text-3xl font-semibold">{{ stats.totalCommandes - stats.nbrActiveCommande }}</p>
              </div>
              <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
                <p class="mt-4">En cours</p>
                <p class="mb-4 text-3xl font-semibold">{{ stats.nbrActiveCommande }}</p>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
    <!--  ______________________________________________________________________________ -->

    <vs-popup title="Suppression" :active.sync="popupDeleteActive">
      <h4 class="text-center mb-3">Suppression de la commande ID #{{ this.delete_id }} 🎯</h4>
      <p class="text-center mb-1">Êtes vous sûr de vouloir supprimer "{{ this.delete_name }}" ?</p>
      <div class="vx-row">
        <div class="vx-col w-1/2">
          <vs-button size="small" class="mt-8" style="margin: auto" color="danger" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     @click="deleteCommande()">
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
      <div :class="new_order||edit_mode ? 'lg:w-2/3 xl:w-2/3' : ''" class="vx-col w-full">
        <vx-card :data="commandes" title="Toutes les commandes">
          <div slot="no-body" class="mt-4">
            <vs-table max-items="5" pagination :data="commandes" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>NUMÉRO</vs-th>
                <vs-th>DATE DE CRÉATION</vs-th>
                <vs-th>LUTIN : JOUET</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th v-if="isAdmin()">ACTION</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.id">
                    <span>#{{ tr.id }}</span>
                  </vs-td>
                  <vs-td :data="tr.dateCreation">
                    <span>{{ interpretDateFull(tr.dateCreation) }}</span>
                  </vs-td>
                  <vs-td :data="tr.taches">
                    <span class="users-liked user-list" :key="index" v-for="(tache, index) in tr.taches">

                      <vx-tooltip class="mr-3 ml-3" :text="tache.lutin.name" position="bottom">
                        <vs-avatar :src="avatarLutin" size="30px"
                                   class="border-2 border-white border-solid -m-1"></vs-avatar>
                      </vx-tooltip>
                      {{ tache.lutin.name }}   <b> : {{ tache.jeux.name }}</b> <br><br>
                    </span>
                  </vs-td>
                  <vs-td :data="tr.statut">
                      <span class="flex items-center px-2 py-1 rounded" v-if="tr.statut=='EN_COURS'"><div
                          class="bg-warning h-3 w-3 rounded-full mr-2"></div>En cours
                    </span>
                    <span class="flex items-center px-2 py-1 rounded" v-else><div
                        class="bg-success h-3 w-3 rounded-full mr-2"></div>Terminée
                    </span>
                  </vs-td>
                  <vs-td v-if="isAdmin()">
                    <span>
                      <vs-icon class="mr-2" @click="editOrder(indextr)" icon="edit"></vs-icon>
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
import {axiosBase} from "@/axios";
import JsonCSV from 'vue-json-csv'
import {jsPDF} from "jspdf";
import 'jspdf-autotable'

export default {
  data() {
    return {
      avatarLutin: require('@/assets/images/portrait/small/avatar-s-11.png'),
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
      edit_mode: false,
      nbEditGames: 0,
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
      taches: [],
      edit_taches: [],
      editSelectedOrder: [],
      editSelectedJouets: [],
      editSelectedLutins: [],
      selectedJouets: [],
      selectedLutins: [],
      jouets: [],
      lutins_occupes: [],
      lutins: [],
      series: [0],
      edit_id: 0,
      commandes: [],
      commande: [],
      stats: [],
      delete_id: 0,
      delete_name: '',
      comment: '',
      edit_comment: '',
      popupDeleteActive: false,
      api_url: ''

    }
  },
  name: "Commandes",
  components: {
    StatisticsCardLine,
    'v-select': vSelect,
    VueApexCharts,
    'downloadCsv': JsonCSV
  },

  methods: {
    newOrder() {
      this.new_order = true
      this.edit_mode = false
    },

    editOrder(index) {
      this.new_order = false

      this.edit_comment = this.commandes[index].comment
      // console.log(this.commandes)
      this.editSelectedOrder = this.commandes[index].taches
      this.edit_id = this.commandes[index].id
      this.edit_mode = true
      this.nbEditGames = this.commandes[index].taches.length
      //console.log(this.editSelectedOrder[0].jeux)

      for (let j = 0; j <= this.nbEditGames - 1; j++) {
        //console.log(j)
        this.editSelectedJouets[j] = this.editSelectedOrder[j].jeux

        this.editSelectedLutins[j] = this.editSelectedOrder[j].lutin

      }
      //console.log(this.editSelectedLutins)
    },

    updateOrder() {
      console.log("update order")
      //console.log(this.editSelectedLutins + )
      for (let i = 0; i < this.editSelectedLutins.length; i++) {
        console.log(i)
        console.log("Lutin" + this.editSelectedLutins[i].id)
        this.edit_taches.push({jeux: {id: this.editSelectedJouets[i].id}, lutin: {id: this.editSelectedLutins[i].id}})

      }
      //console.log(this.edit_taches)
      //console.log(this.edit_id)
      this.updatedOrder()
    },

    updatedOrder() {
      this.$vs.loading()
      axiosBase.post('/app/commande/', {
            'id': this.edit_id,
            'comment': this.edit_comment,
            'taches': this.edit_taches
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
            title: 'Commande modifié',
            text: "La commande a été mis à jour",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.commandes = []
          this.getCommandes()
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

    lastOrder() {
      try {
        return this.interpretDate(commandes[commandes.length - 1].dateCreation)
      } catch (error) {
        return 'Aucune';
      }
    },
    addGame() {
      this.nbGames++
      this.nbEditGames++
    },
    delGame() {
      this.nbGames--
      this.nbEditGames--
    },
    getCommandes() {
      if (this.isAdmin()) {
        axiosBase.get('/app/commande/', {
          params: {
            page: 0,
            max: 100
          }
        }).then(response => {
          if (response) {
            this.commandes.push(...response.data.content)
            this.getStats()
          } else {
          }
        }).catch(error => {
        })
      } else {
        axiosBase.get('/app/commande/user/' + this.$store.state.AppActiveUser.id, {
          params: {
            page: 0,
            max: 100
          }
        }).then(response => {
          if (response) {
            this.commandes.push(...response.data.content)
          } else {
          }
        }).catch(error => {
        })
      }

    },

    getJouets() {
      this.jouets = []
      axiosBase.get('/app/jeux', {
        params: {
          page: 0,
          max: 100
        }
      }).then(response => {
        if (response) {
          this.jouets.push(...response.data.content)
          this.replaceKey(this.jouets)
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
      })
    },

    getLutinsDispo() {
      this.lutins = []
      axiosBase.get('/app/availableUsers').then(response => {
        if (response) {
          this.lutins.push(...response.data.content.availaible)
          this.replaceKey(this.lutins)
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
      })
    },

    replaceKey(json) {
      for (var elt in json) {
        json[elt]['label'] = json[elt]['name']
      }
    },

    isAdmin() {
      return this.$store.state.AppActiveUser.role == 'ADMIN';
    },

    insertCommande() {
      for (let i = 1; i < this.selectedJouets.length; i++) {
        this.taches.push({jeux: {id: this.selectedJouets[i].id}, lutin: {id: this.selectedLutins[i].id}})
      }
      console.log(this.taches)
      this.insererCommande()
    },

    insererCommande() {
      this.$vs.loading()
      axiosBase.post('/app/commande', {
            'comment': this.comment,
            'taches': this.taches
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
            title: 'commande inséré',
            text: "La tache a été inséré",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.commande.push(response.data.content)
          this.commandes = []
          this.getCommandes()
          this.new_order = false

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

    clickDelete(index) {
      this.delete_id = this.commandes[index].id
      this.delete_name = this.commandes[index].comment
      this.popupDeleteActive = true
    },

    deleteCommande() {
      axiosBase.post('/app/commande/' + this.delete_id, {},
          {
            headers: {

              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Commande supprimé',
            text: "La commande a été supprimé",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })
          this.getStats()
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

    getStats() {
      axiosBase.get('/app/dash',).then(response => {
        if (response) {
          this.stats = response.data.content
          this.series = [((this.stats.totalCommandes - this.stats.nbrActiveCommande) / (this.stats.totalCommandes) * 100).toFixed(1)]
        } else {
        }
      }).catch(error => {
      })
    },

    interpretDate(date) {
      var d = new Date(date)
      return d.getDate() + '/' + d.getMonth() + 1 + ' à ' + d.getHours() + 'h' + d.getMinutes();
    },

    interpretDateFull(date) {
      var d = new Date(date)
      return d.getDate() + '/' + d.getMonth() + 1 + '/' + d.getFullYear() + ' à ' + d.getHours() + 'h' + d.getMinutes();
    },

    downloadPDF() {
      let doc = new jsPDF();
      let commandesTab = []

      for (let key in this.commandes) {
        commandesTab.push([this.commandes[key].id, this.commandes[key].comment, this.interpretDateFull(this.commandes[key].dateCreation), this.commandes[key].taches.length, this.commandes[key].statut])
      }

      doc.text("Liste des commandes", 15, 10);
      doc.autoTable({
        head: [['ID', 'Nom', 'Date de création', 'Nombre Taches', 'Statut']],
        body: commandesTab,
      })
      doc.save('Commandes.pdf');
    },
  },

  created() {
    //this.insertCommande()
    if (this.isAdmin()) {
      this.getLutinsDispo()
      this.getJouets()
    }

    this.getCommandes()
    this.getStats()
  }
}
</script>

<style scoped>

</style>