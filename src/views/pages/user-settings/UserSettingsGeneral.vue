<template>
  <vx-card no-shadow>

    <!-- Info -->
    <vs-input class="w-full mb-base"
              v-validate="'required|alpha_dash|min:3'"
              data-vv-validate-on="blur"
              label-placeholder="Nom"
              name="Name"
              placeholder="Nom"
              v-model="name"></vs-input>
    <vs-input class="w-full" v-validate="'required|email'"
              data-vv-validate-on="blur"
              name="email"
              type="email"
              label-placeholder="Email"
              placeholder="Email"
              v-model="email"></vs-input>
    <vs-input class="w-full" v-validate="'required|password'"
              data-vv-validate-on="blur"
              name="password"
              type="password"
              label-placeholder="Mot de passe"
              placeholder="Mot de passe"
              v-model="password"></vs-input>

    <p v-if="!isAdmin()" class="mt-3 mb-2">Compétences</p>
    <v-select v-if="!isAdmin()" name="competences"
              multiple
              class="mb-20"
              :closeOnSelect="false"
              v-model="selectedComp"
              :options="options_competences"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"/>


    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end mt-10 pt-10">
      <vs-button class="ml-auto mt-2" @click="updateProfileApi" :disabled="!validateForm">Enregistrer</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Annuler</vs-button>
    </div>
  </vx-card>
</template>

<script>
import {axiosBase} from "@/axios";
import vSelect from "vue-select";

export default {
  data() {
    return {
      name: this.$store.state.AppActiveUser.name,
      email: this.$store.state.AppActiveUser.email,
      id: this.$store.state.AppActiveUser.id,
      options_competences: [],
      selectedComp: [],
      password: '',
    }
  },

  created() {
    this.getCompetences()
  },
  components: {
    'v-select': vSelect,
  },
  methods: {
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

    updateProfileApi() {
      this.$vs.loading()
      if (!this.validateForm) return

      this.$store.dispatch('updateProfileApi', {
        id: this.id,
        name: this.name,
        email: this.email,
      }).then(() => {
        setTimeout(() => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Mise à jour réussie',
            text: "Profile a été mis à jour avec success",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })
        }, 50);
      }).catch(error => {

        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })


    },
    isAdmin() {
      return this.$store.state.AppActiveUser.role == 'ADMIN';
    },
  }
  ,

  computed: {
    validateForm() {
      return !this.errors.any() && (this.name !== '' || this.email !== '')
    }
    ,
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
