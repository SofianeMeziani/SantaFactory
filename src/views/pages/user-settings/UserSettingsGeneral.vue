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


    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="updateProfileApi" :disabled="!validateForm">Enregistrer</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Annuler</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.AppActiveUser.name,
      email: this.$store.state.AppActiveUser.email,
      id: this.$store.state.AppActiveUser.id,
    }
  },

  methods: {
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


    }
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
