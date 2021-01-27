<template>
  <div style="min-height: 70vh">
    <Snowf
        :amount="70"
        :size="5"
        :speed="1.5"
        :wind="0"
        :opacity="0.8"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="true"
        color="#ccc"
    />

    <p>Manuel</p>
  </div>
</template>

<script>
import Snowf from 'vue-snowf';

export default {
  name: "Manuel",
  components: {
    Snowf
  }
}
</script>

<style scoped>

</style>