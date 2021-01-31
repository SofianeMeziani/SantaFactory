<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-10">Compétences 🎯</h1>

    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 xl:w-1/2">
        <vx-card title="Toutes les compétences">
          <div slot="no-body" class="mt-4">
            <vs-table :data="competences" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM DE LA COMPÉTENCE</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template>

                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in competences">
                  <vs-td :data="tr.id">
                    <span>#{{ tr.id }}</span>
                  </vs-td>
                  <vs-td :data="tr.name">
                    <span>{{ tr.name }}</span>
                  </vs-td>
                  <vs-td class="text-center">
                    <span @click="editCompetence(tr.id, tr.name, indextr)">
                      <vs-icon icon="edit"></vs-icon>
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
          <p class="text-center mb-1">ID #{{ this.competences[this.competences.length - 1].id + 1 }}</p>

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

      <vs-popup title="Modification" :active.sync="popupActive">


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

    </div>
  </div>
</template>

<script>
import {axiosBase, getAPI} from "@/axios";

export default {
  data() {
    return {
      popupActive: false,
      competences: [],
      competence: '',
      edit_id: 0,
      competence_edit: '',
      index_edit: 0
    }
  },
  name: "Competences",
  components: {},

  methods: {
    insertCompetence() {
      axiosBase.post('/app/competence/', {
            'name': this.competence,
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXBhQGFkbWluLmZyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJleHAiOjE2MTI2MDMzMDUsImlhdCI6MTYxMTczOTMwNX0.wFotiSTG3ZXXgnmYZ907o0YB03mfymcLNEvbZXWcnHb0IlJICwW9w2aYh4aawga6JYYGfB1yDfgopS_kV820lA`,
              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Compétence inserée',
            text: "La compétence a été inserée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.competences.push(response.data.content)
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
    editCompetence(id, name, index) {
      this.edit_id = id
      this.competence_edit = name
      this.index_edit = index
      this.popupActive = true
    },
    saveCompetence() {
      axiosBase.post('/app/competence/', {
            'id': this.edit_id,
            'name': this.competence_edit,
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXBhQGFkbWluLmZyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJleHAiOjE2MTI2MDMzMDUsImlhdCI6MTYxMTczOTMwNX0.wFotiSTG3ZXXgnmYZ907o0YB03mfymcLNEvbZXWcnHb0IlJICwW9w2aYh4aawga6JYYGfB1yDfgopS_kV820lA`,
              'Content-Type':
                  'application/json',
            }
          }).then(response => {
        if (response.data.success == true) {
          this.$vs.notify({
            title: 'Compétence modifiée',
            text: "La compétence a été modifiée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.competences[this.index_edit].name = this.competence_edit
          this.popupActive = false
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
        this.popupActive = false
      })
    },
    validateForm() {
      return this.competence !== ''
    },
    validateEditForm() {
      return this.competence_edit !== ''
    },
    getCompetences() {
      this.competences = []
      axiosBase.get('/app/competence', {
        params: {
          page: 0,
          max: 100
        },
        headers: {Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXBhQGFkbWluLmZyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJleHAiOjE2MTI2MDMzMDUsImlhdCI6MTYxMTczOTMwNX0.wFotiSTG3ZXXgnmYZ907o0YB03mfymcLNEvbZXWcnHb0IlJICwW9w2aYh4aawga6JYYGfB1yDfgopS_kV820lA`}
      }).then(response => {
        if (response) {
          this.competences.push(...response.data.content)
        } else {
        }
      }).catch(error => {
      })
    }
  },

  created() {
    this.getCompetences()
  }
}
</script>

<style scoped>

</style>