<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-10">Compétences 🎯</h1>

    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 xl:w-1/2">
        <vx-card title="Toutes les compétences">
          <div slot="no-body" class="mt-4">
            <vs-table max-items="5" pagination
                      :data="competences"
                      class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM DE LA COMPÉTENCE</vs-th>
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
                  <vs-td :data="tr.id">
                    <span>
                      <vs-icon class="mr-2" @click="editCompetence(tr.id, tr.name, indextr)" icon="edit"></vs-icon>
                      <vs-icon color="danger" icon="delete" @click="clickDelete(tr.id, tr.name, indextr)"></vs-icon>
                    </span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/2 xl:w-1/2">
        <vx-card slot="no-body">
          <h4 class="text-center mb-3">Nouvelle compétence 🎯</h4>
          <p class="text-center mb-1">ID #{{ this.getID() }}</p>

          <vs-input color="success"
                    class="mt-8 w-full"
                    v-validate="'required|alpha_dash|min:1'"
                    name="competence"
                    v-model="competence"
                    label-placeholder="Nom de la compétence"/>

          <vs-button size="small" class="mt-8" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     :disabled="!validateForm()"
                     @click="insertCompetence()">
            Valider
          </vs-button>
        </vx-card>

      </div>

      <vs-popup title="Modification" :active.sync="popupEditActive">
        <h4 class="text-center mb-3">Modification de la compétence 🎯</h4>
        <p class="text-center mb-1">ID #{{ this.edit_id }}</p>
        <vs-input color="success"
                  class="mt-8 w-full"
                  v-validate="'required|alpha_dash|min:1'"
                  name="competence"
                  v-model="competence_edit"
                  label-placeholder="Nom de la compétence"/>
        <vs-button size="small" class="mt-8" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                   icon="icon-check"
                   :disabled="!validateEditForm()"
                   @click="saveCompetence()">
          Valider
        </vs-button>
      </vs-popup>

      <vs-popup title="Suppression" :active.sync="popupDeleteActive">
        <h4 class="text-center mb-3">Suppression de la compétence ID #{{ this.edit_id }} 🎯</h4>
        <p class="text-center mb-1">Êtes vous sûr de vouloir supprimer "{{ this.competence_edit }}" ?</p>
        <div class="vx-row">
          <div class="vx-col w-1/2">
            <vs-button size="small" class="mt-8" style="margin: auto" color="danger" type="gradient" icon-pack="feather"
                       icon="icon-check"
                       @click="deleteCompetence()">
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

    </div>
  </div>
</template>

<script>
import {axiosBase, getAPI} from "@/axios";

export default {
  data() {
    return {
      popupEditActive: false,
      popupDeleteActive: false,
      competences: [],
      competence: '',
      edit_id: 0,
      competence_edit: '',
      index_edit: 0,
    }
  },
  name: "Competences",
  components: {},

  methods: {
    insertCompetence() {
      this.$vs.loading()
      axiosBase.post('/app/competence/', {
            'name': this.competence,
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
            title: 'Compétence inserée',
            text: "La compétence a été inserée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.competences.push(response.data.content)
        } else {
          this.$vs.loading.close()
        }
      }).catch(error => {
        this.$vs.loading.close()
        //console.log(error)
        this.$vs.notify({
          title: 'Erreur',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },
    editCompetence(id, name, index) {
      this.edit_id = id
      this.competence_edit = name
      this.index_edit = index
      this.popupEditActive = true
    },
    saveCompetence() {
      this.$vs.loading()
      axiosBase.post('/app/competence/', {
            'id': this.edit_id,
            'name': this.competence_edit,
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
            title: 'Compétence modifiée',
            text: "La compétence a été modifiée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.competences[this.index_edit].name = this.competence_edit
          this.popupEditActive = false
        } else {
          this.$vs.loading.close()
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
    clickDelete(id, name, index) {
      this.edit_id = id
      this.competence_edit = name
      this.index_edit = index
      this.popupDeleteActive = true
    },
    deleteCompetence() {
      this.$vs.loading()
      axiosBase.post('/app/competence/' + this.edit_id, {},
          {
            headers: {
              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Compétence supprimée',
            text: "La compétence a été supprimeée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.getCompetences()
          this.popupDeleteActive = false
        } else {
          this.$vs.loading.close()
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
      return this.competence !== ''
    },
    validateEditForm() {
      return this.competence_edit !== ''
    },

    getID() {
      if (this.competences[this.competences.length - 1]) {
        return this.competences[this.competences.length - 1].id + 1
      }
      return 0
    },

    getCompetences() {
      this.$vs.loading()
      this.competences = []
      axiosBase.get('/app/competence/', {
        params: {
          page: 0,
          max: 100
        }
      }).then(response => {
        if (response) {
          this.$vs.loading.close()
          this.competences.push(...response.data.content)
        } else {
          this.$vs.loading.close()
        }
      }).catch(error => {
        this.$vs.loading.close()
        console.log(error)
      })
    },

  },

  created() {
    this.getCompetences()
  }
}
</script>

<style scoped>

</style>