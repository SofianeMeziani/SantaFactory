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
                  <vs-td>
                    <span>Action</span>
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
          <p class="text-center mb-1">ID #013</p>

          <vs-input color="success" class="mt-8 w-full" label-placeholder="Nom de la compétence"/>

          <vs-button size="small" class="mt-8" style="margin: auto" color="success" type="gradient" icon-pack="feather"
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
    </div>
  </div>
</template>

<script>
import {axiosBase, getAPI} from "@/axios";

export default {
  data() {
    return {
      competences: []
    }
  },
  name: "Competences",
  components: {},

  methods: {
    getCompetences() {
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