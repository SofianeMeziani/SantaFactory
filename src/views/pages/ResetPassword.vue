<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
            </div>
            <div id="div-with-loading"
                 class=" vs-con-loading__container vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Reset Password</h4>
                  <p>Please enter your new password.</p>
                </div>

                <template v-if="tokenCheck">
                  <vs-input
                      data-vv-validate-on="blur"
                      v-validate="'required|min:6'"
                      type="password"
                      name="new_password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="Nouveau mot de passe" v-model="new_password"
                      class="w-full mb-6"/>
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
                      class="w-full mb-8"/>
                  <span class="text-danger text-sm">{{ errors.first('confirm_new_password') }}</span>
                  <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                    <vs-button type="border" to="/pages/login"
                               class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Go Back To
                      Login
                    </vs-button>
                    <vs-button class="w-full sm:w-auto" @click="changePassword">Reset</vs-button>
                  </div>
                </template>
                <template v-else>
                  <h2 class="text-center mb-2">token invalide ou a expirer</h2>
                  <h4 class="text-center mb-10"> Merci de reesaye </h4>
                  <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                    <vs-button type="border" to="/pages/login"
                               class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Go Back To
                      Login
                    </vs-button>
                    <vs-button to="/pages/forgot-password" class="w-full  sm:w-auto">Reesaye
                    </vs-button>
                  </div>
                </template>


              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import {axiosBase} from "@/axios";

export default {
  data() {
    return {
      loading: false,
      tokenCheck: true,
      token: this.$route.query.token || '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && (this.new_password !== '' || this.confirm_new_password === this.new_password)
    },
  },
  methods: {

    checkTokenValid() {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 0.6
      })


      axiosBase.post('/api/v1/auth/password_reset/validate_token/', {
        token: this.token,
      }).then((response) => {

        this.$vs.loading.close('#div-with-loading > .con-vs-loading')

        this.tokenCheck = true


      })
          .catch(error => {

            this.$vs.loading.close('#div-with-loading > .con-vs-loading')
            this.tokenCheck = false
            this.$vs.notify({
              title: 'Error',
              text: error.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          })


    },
    changePassword() {

      if (!this.validateForm) return
      this.$vs.loading()
      axiosBase.post('/api/v1/auth/password_reset/confirm/', {
        token: this.token,
        password: this.new_password
      }).then((response) => {

        setTimeout(() => {

          this.$vs.notify({
            title: 'Success',
            text: 'Votre du mot de passe a été réinitialisé.',
            iconPack: 'feather',
            icon: 'icon-circle-check',
            color: 'success'
          })
          this.$vs.loading.close()
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
  },
  mounted() {

    this.checkTokenValid()
  }
}
</script>
