<template>
  <div class="w-100">
    🎅🏻
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
