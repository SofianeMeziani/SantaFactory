<template>
  <vx-card no-shadow>
    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6'"
        type="password"
        name="old_password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Ancien mot de passe" v-model="old_password"
        class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('old_password') }}</span>
    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6'"
        type="password"
        name="new_password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Nouveau mot de passe" v-model="new_password"
        class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('new_password') }}</span>
    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6'"
        type="password"
        name="confirm_new_password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Confirmation du nouveau mot de passe"
        v-model="confirm_new_password"
        class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('confirm_new_password') }}</span>


    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button @click="updatePasswordApi" :disabled="!validateForm" class="ml-auto mt-2">Enregistrer
      </vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Annuler</vs-button>
    </div>
  </vx-card>
</template>

<script>
import {getAPI} from "@/axios";

export default {
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  methods: {
    updatePasswordApi() {
      this.$vs.loading()
      if (!this.validateForm) return

      getAPI.post('/api/v1/auth/password/change/', {
        new_password1: this.new_password,
        new_password2: this.confirm_new_password,
        old_password: this.old_password,
      }).then((response) => {
        setTimeout(() => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: response.data.detail,
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
      return !this.errors.any() && (this.new_password !== '' || this.confirm_new_password !== '' || this.old_password !== '')
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser

    }
  },
}
</script>
