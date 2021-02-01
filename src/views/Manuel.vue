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

        <pdf :src="pdfView" v-for="i in 3"
             :key="i"

             :page="i"
  >
            <template slot="loading">
                loading content here...
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
            Snowf,
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