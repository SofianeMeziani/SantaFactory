<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-10">Catégories 🎯</h1>

    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 xl:w-1/2">
        <vx-card title="Toutes les catégories">
          <div slot="no-body" class="mt-4">
            <vs-table max-items="5" pagination
                      :data="categories"
                      class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM DE LA CATÉGORIE</vs-th>
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
                      <vs-icon class="mr-2" @click="editCategorie(tr.id, tr.name, indextr)" icon="edit"></vs-icon>
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
          <h4 class="text-center mb-3">Nouvelle catégorie 🎯</h4>
          <p class="text-center mb-1">ID #{{
              (this.categories[this.categories.length - 1]) ? this.categories[this.categories.length - 1].id + 1 : 0
            }}</p>

          <vs-input color="success"
                    class="mt-8 w-full"
                    v-validate="'required|alpha_dash|min:1'"
                    name="categorie"
                    v-model="categorie"
                    label-placeholder="Nom de la catégorie"/>

          <vs-button size="small" class="mt-8" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                     icon="icon-check"
                     :disabled="!validateForm()"
                     @click="insertCategorie()">
            Valider
          </vs-button>
        </vx-card>

      </div>

      <vs-popup title="Modification" :active.sync="popupEditActive">
        <h4 class="text-center mb-3">Modification de la catégorie 🎯</h4>
        <p class="text-center mb-1">ID #{{ this.edit_id }}</p>
        <vs-input color="success"
                  class="mt-8 w-full"
                  v-validate="'required|alpha_dash|min:1'"
                  name="categorie"
                  v-model="categorie_edit"
                  label-placeholder="Nom de la catégorie"/>
        <vs-button size="small" class="mt-8" style="margin: auto" color="success" type="gradient" icon-pack="feather"
                   icon="icon-check"
                   :disabled="!validateEditForm()"
                   @click="saveCategorie()">
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
      popupEditActive: false,
      categories: [],
      categorie: '',
      edit_id: 0,
      categorie_edit: '',
      index_edit: 0,
    }
  },
  name: "Competences",
  components: {},

  methods: {
    insertCategorie() {
      this.$vs.loading()
      axiosBase.post('/app/cat/', {
            'name': this.categorie,
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
            title: 'Catégorie inserée',
            text: "La catégorie a été inserée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.categories.push(response.data.content)
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
    editCategorie(id, name, index) {
      this.edit_id = id
      this.categorie_edit = name
      this.index_edit = index
      this.popupEditActive = true
    },
    saveCategorie() {
      this.$vs.loading()
      axiosBase.post('/app/cat/', {
            'id': this.edit_id,
            'name': this.categorie_edit,
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
            title: 'Catégorie modifiée',
            text: "La catégorie a été modifiée",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })

          this.categories[this.index_edit].name = this.categorie_edit
          this.popupEditActive = false
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
      return this.categorie !== ''
    },
    validateEditForm() {
      return this.categorie_edit !== ''
    },
    getCategories() {
      this.$vs.loading()
      this.categories = []
      axiosBase.get('/app/cat', {
        params: {
          page: 0,
          max: 100
        }
      }).then(response => {
        this.$vs.loading.close()
        if (response) {
          this.categories.push(...response.data.content)
        } else {
        }
      }).catch(error => {
        this.$vs.loading.close()
      })
    }
  },

  created() {
    this.getCategories()
  }
}
</script>

<style scoped>

</style>