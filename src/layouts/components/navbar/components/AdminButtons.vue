<template>
  <div class="flex items-center">

    <vs-button v-if="pwa() === false" color="dark" size="small" class="mr-2 pr-2 pl-2" type="gradient" icon-pack="fa"
               icon="fa-times-circle" style="background: rgb(30,30,30)!important; border: 1px solid #333">
      <font-awesome-icon size="lg" :icon="['fab','apple']"/>
      Btn
    </vs-button>
    <div v-if="pwa()">
      <h3> Santa Factory</h3>
    </div>
  </div>
</template>

<script>

export default {

  methods: {
    pwa() {
      return ["fullscreen", "standalone", "minimal-ui"].some(
          (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
      );
    }
  }
}
</script>
