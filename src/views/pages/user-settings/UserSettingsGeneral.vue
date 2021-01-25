<template>
  <vx-card no-shadow>

    <!-- Info -->
    <vs-input class="w-full mb-base"
              v-validate="'required|alpha_dash|min:3'"
              data-vv-validate-on="blur"
              label-placeholder="Username"
              name="Username"
              placeholder="Username"
              v-model="username"></vs-input>
    <vs-input class="w-full mb-base" v-validate="'required|alpha_dash|min:3'"
              data-vv-validate-on="blur"
              label-placeholder="Nom"
              name="Nom"
              placeholder="Nom"
              v-model="last_name"></vs-input>
    <vs-input class="w-full mb-base" v-validate="'required|alpha_dash|min:3'"
              data-vv-validate-on="blur"
              label-placeholder="Nom"
              name="name"
              placeholder="Prénom"
              v-model="first_name"></vs-input>
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
      username: this.$store.state.AppActiveUser.username,
      first_name: this.$store.state.AppActiveUser.first_name,
      last_name: this.$store.state.AppActiveUser.last_name,
      email: this.$store.state.AppActiveUser.email,
      // company: 'SnowMash Technologies Pvt Ltd'
    }
  },

  methods: {
    updateProfileApi() {
      this.$vs.loading()
      if (!this.validateForm) return

      this.$store.dispatch('updateProfileApi', {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
      }).then(() => {
        setTimeout(() => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: "Profile a été update avec success",
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })
        }, 2000);


      })
          .catch(error => {

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
      return !this.errors.any() && (this.username !== '' || this.email !== '')
    }
    ,
    activeUserInfo() {
      return this.$store.state.AppActiveUser

    }
  }
}
</script>
