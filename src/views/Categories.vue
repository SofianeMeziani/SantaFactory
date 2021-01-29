<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-10">Catégories 📋</h1>

    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 xl:w-1/2">
        <vx-card title="Toutes les catégories">
          <div slot="no-body" class="mt-4">
            <vs-table class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID</vs-th>
                <vs-th>NOM DE LA CATÉGORIES</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template>

                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Catégorie 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Action</span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Catégorie 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Action</span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Catégorie 1</span>
                  </vs-td>
                  <vs-td>
                    <span>Action</span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#13</span>
                  </vs-td>
                  <vs-td>
                    <span>Catégorie 1</span>
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
          <h4 class="text-center mb-3">Nouvelle catégories 📋</h4>
          <p class="text-center mb-1">ID #013</p>

          <vs-input color="success" class="mt-8 w-full" label-placeholder="Nom de la catégorie"/>

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
export default {
  data() {
    return {}
  },
  name: "Categories",
  components: {},

  methods: {}
}
</script>

<style scoped>

</style>