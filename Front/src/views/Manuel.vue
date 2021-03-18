<template>
  <div style="min-height: 70vh">

    <h1 class="v-100 text-center mb-10">Manuel d'utilisation</h1>

    <pdf :src="pdfView" v-for="i in 7"
         :key="i"
         :page="i"
    >
      <template slot="loading">
        Chargement...
      </template>
    </pdf>


  </div>
</template>

<script>
import pdf from 'pdfvuer';
import Snowf from 'vue-snowf';

// var loadingTask = pdf.createLoadingTask(require('@/assets/Projet_JEE-2.pdf'));

export default {
  name: "Manuel",
  components: {
    pdf,
  },
  data() {
    return {
      numPages: undefined,
      pdfView: require('@/assets/Projet_JEE-2.pdf'),
    };
  },
  mounted() {

    // this.src.promise.then(pdf => {
    //
    //     this.numPages = pdf.numPages;
    // });
  }

}
</script>

<style scoped>

</style>