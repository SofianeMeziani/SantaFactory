<template>
  <div>
    <h1 class="text-center" style="margin-bottom: 3rem">Modifier le profile 👇🏼</h1>

    <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs"
             :key="isSmallerScreen">

      <!-- GENERAL -->
      <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Géneral' : 'Géneral'">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-general/>
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Mot de passe' : 'Mot de passe'">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-password/>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>

</template>

<script>
import UserSettingsGeneral from './UserSettingsGeneral.vue'
import UserSettingsChangePassword from './UserSettingsChangePassword.vue'

export default {
  components: {
    UserSettingsGeneral,
    UserSettingsChangePassword,
  },
  data() {
    return {}
  },
  computed: {
    isSmallerScreen() {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
