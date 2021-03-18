<template>
  <div>
    <vs-input color="success"
              v-validate="'required|email'"
              data-vv-validate-on="blur"
              name="email"
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Email"
              v-model="email"
              class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input color="success"
              data-vv-validate-on="blur"
              v-validate="'required'"
              type="password"
              name="password"
              icon-no-border
              icon="icon icon-lock"
              icon-pack="feather"
              label-placeholder="Mot de passe"
              v-model="password"
              class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Se souvenir de moi</vs-checkbox>
    </div>
    <vs-button style="width: 100%" class="float-right mb-6 mt-6" @click="loginJWT"
               :disabled="!validateForm">
      Se connecter
    </vs-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'papa@admin.fr',
      password: '123456',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {

    loginJWT() {

      // Loading
      this.$vs.loading()
      this.$store.dispatch('auth/loginUser', {
        email: this.email,
        password: this.password
      })
          .then(() => {
            this.$vs.loading.close()
            this.$router.push({name: 'home'})
          })
          .catch(error => {

            console.log(error.message)

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
    registerUser() {

      this.$router.push('/pages/register').catch(() => {
      })
    }
  }
}

</script>

