<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <vs-input
        v-validate="'required|alpha_dash|min:3'"
        data-vv-validate-on="blur"
        label-placeholder="Name"
        name="displayName"
        placeholder="Pseudo"
        v-model="username"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('displayName') }}</span>

    <vs-input
        v-validate="'required|email'"
        data-vv-validate-on="blur"
        name="email"
        type="email"
        label-placeholder="Email"
        placeholder="Email"
        v-model="email"
        class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
        ref="password"
        type="password"
        data-vv-validate-on="blur"
        v-validate="'required|min:8|max:20'"
        name="password"
        label-placeholder="Mot de passe"
        placeholder="Mot de passe"
        v-model="password1"
        class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <vs-checkbox checked v-model="isTermsConditionAccepted" class="mt-6">J'accepte
      <a @click.stop href="google.fr">les conditions d'utilisation.
      </a>
    </vs-checkbox>
    <!--        <vs-button style="width: 49%" type="border" to="/pages/login" class="mt-6">Se connecter</vs-button>-->
    <vs-button style="width: 100%" class="float-right mb-6 mt-6" @click="registerUserJWt" :disabled="!validateForm">
      S'inscrire
    </vs-button>
    <p class="text-center">
      Tu as déjà un compte ?
      <router-link to="/pages/login">
        <a>Se connecter.</a>
      </router-link>

    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
      isTermsConditionAccepted: true
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username !== '' && this.email !== '' && this.password1 !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    pushRoute() {
      this.$router.push('cgu')
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Vous êtes connecté!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm) return
      this.$vs.loading()
      const payload = {
        username: this.username,
        email: this.email,
        password1: this.password1,
        password2: this.password1
      }
      this.$store.dispatch('auth/registerUser', payload).then(() => {
        this.$vs.loading.close()

        this.$router.push({name: 'home'})
      }).catch(error => {

        this.$vs.loading.close()
        console.log(error.response.data)
        let output = "";
        let key = "";
        for (key in error.response.data) {
          if (key === "password1") {
            output += "password" + " : " + error.response.data[key].join("\n") + " \n";
          } else {

            output += key + " : '" + error.response.data[key] + "' \n";
          }
        }
        console.log(output)

        this.$vs.notify({
          title: 'Error',
          text: output,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    }
  }
}
</script>
