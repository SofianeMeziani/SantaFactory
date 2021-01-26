<template>

  <vs-row vs-align="center" class="pt-5"
          vs-type="flex" vs-justify="center" vs-w="12">
    <vs-col vs-type="flex" v-for="(item,index) in navMenuItems" :key="index" vs-justify="center" vs-align="center"
            vs-w="3">

      <router-link
          tabindex="-1"
          exact
          :to="item.url"
          target="_self">
        <feather-icon :style="activeLink!==item.url ? '':'color: #ea560b'" :icon="item.icon"/>

        <slot/>
      </router-link>


    </vs-col>

  </vs-row>
</template>

<script>

import navMenuItems from "@/layouts/components/bottom-bar/bottomNavMenuItems";

export default {

  name: "BottomNavBarItems",
  data() {
    return {
      navMenuItems,

    }
  },
  components: {},
  computed: {
    activeLink() {
      return this.$route.path
    }
  }
}
</script>

<style>

</style>