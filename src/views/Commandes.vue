<template>
  <div style="min-height: 70vh">
    <Snowf
        :amount="70"
        :size="5"
        :speed="1.5"
        :wind="0"
        :opacity="0.8"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="true"
        color="#ccc"
    />

    <h1 class="v-100 text-center mb-6">Commandes 📝</h1>

    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="ClipboardIcon"
            icon-right
            statistic="12"
            statisticTitle="Commandes"
            color="success"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="LoaderIcon"
            icon-right
            statistic="12"
            statisticTitle="En cours"
            color="warning"/>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
            hideChart
            class="mt-5 mb-base"
            icon="CheckCircleIcon"
            icon-right
            statistic="12"
            statisticTitle="Terminées"
            color="success"/>
      </div>

      <div class="vx-col w-full">
        <vs-button @click="newOrder()" class="mb-5" style="margin: auto" color="primary" type="gradient"
                   icon-pack="feather"
                   icon="icon-plus" v-if="!new_order">
          Nouvelle commande
        </vs-button>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full" :class="new_order ? 'lg:w-2/3 xl:w-2/3' : ''">
        <vx-card title="Toutes les commandes">
          <div slot="no-body" class="mt-4">
            <vs-table :data="Orders" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>NUMÉRO</vs-th>
                <vs-th>DATE</vs-th>
                <vs-th>JOUET --> LUTIN</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>ACTION</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>#{{ data[indextr].orderNo }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2"
                                                                           :class="'bg-' + data[indextr].statusColor"></div>{{
                        data[indextr].status
                      }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <ul class="users-liked user-list">
                      <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                        <vx-tooltip :text="user.name" position="bottom">
                          <vs-avatar :src="user.img" size="30px"
                                     class="border-2 border-white border-solid -m-1"></vs-avatar>
                        </vx-tooltip>
                      </li>
                    </ul>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].location }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].distance }}</span>
                    <vs-progress :percent="data[indextr].distPercent" :color="data[indextr].statusColor"></vs-progress>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].startDate }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].estDelDate }}</span>
                  </vs-td>
                </vs-tr>
                <!-- Fake -->
                <vs-tr>
                  <vs-td>
                    <span>#0013</span>
                  </vs-td>
                  <vs-td>
                    <span>27/01/2020</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet15 -> Lutin5</span>
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
                <vs-tr>
                  <vs-td>
                    <span> <feather-icon icon="CornerDownRightIcon"/></span>
                  </vs-td>
                  <vs-td>
                    <span></span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet7 --> Lutin3</span>
                  </vs-td>
                  <vs-td>
                    <span></span>
                  </vs-td>
                  <vs-td>
                    <span></span>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td>
                    <span>#0014</span>
                  </vs-td>
                  <vs-td>
                    <span>27/01/2020</span>
                  </vs-td>
                  <vs-td>
                    <span>Jouet15 -> Lutin5</span>
                  </vs-td>
                  <vs-td>
                    <span class="flex items-center px-2 py-1 rounded"><div
                        class="bg-success h-3 w-3 rounded-full mr-2"></div>Terminée
                    </span>
                  </vs-td>
                  <vs-td>
                    <span>#0014</span>
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
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import Snowf from 'vue-snowf';
import vSelect from 'vue-select'

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
      nbGames: 1
    }
  },
  name: "Commandes",
  components: {
    StatisticsCardLine,
    Snowf,
    'v-select': vSelect,
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
    }
  }
}
</script>

<style scoped>

</style>