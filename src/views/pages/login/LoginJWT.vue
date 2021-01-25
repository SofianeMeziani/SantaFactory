<template>
  <div>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6'"
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
      <router-link to="/pages/forgot-password">Mot de passe oublié ?</router-link>
    </div>
    <vs-button style="width: 100%" class="float-right mb-6 mt-6" @click="loginJWT"
               :disabled="!validateForm">
      Se connecter
    </vs-button>
    <p class="text-center">
      Nouveau sur la plateforme ?
      <router-link to="/pages/register">
        <a>crée un compte.</a>
      </router-link>

    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
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

