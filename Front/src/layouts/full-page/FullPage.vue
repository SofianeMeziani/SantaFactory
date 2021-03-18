<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="layout--full-page">
    <router-view></router-view>

    <the-footer v-if="false"/>
  </div>
</template>

<script>
import TheFooter from '@/layouts/components/TheFooter.vue'

export default {
  components: {
    TheFooter
  }
}
</script>
