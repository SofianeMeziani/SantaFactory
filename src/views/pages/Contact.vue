<template>
  <div>
    <h1 class="text-center" style="margin-bottom: 5rem">Nous contacter 📩</h1>

    <h2 class="text-center" style="margin-bottom: 3rem">Si tu veux nous envoyer un message, c'est ici que ça se
      passe
      👇🏼</h2>

    <vs-row
        vs-align="center"
        vs-type="flex" vs-justify="space-between" vs-w="12" class="mr-auto ml-auto">
      <vs-col :key="index" v-for="(col,index) in contact" vs-type="flex" vs-justify="center" vs-align="center"
              vs-lg="6" vs-sm="6" vs-xs="6" class="p-2">
        <vx-card @click="push(col.to)" class="text-center white" style="border-radius: 20px !important;">
          <vs-row vs-align="center"
                  vs-type="flex" vs-justify="center" vs-w="12">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
              <vs-button color="primary" type="filled" icon-pack="feather" :icon="col.icon"></vs-button>
            </vs-col>

          </vs-row>
          <vs-row vs-align="center"
                  vs-type="flex" vs-justify="center" vs-w="12">

            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
              <h2 class="mb-6 mt-8 text-center text-gray">{{ col.name }}</h2>
            </vs-col>

          </vs-row>
          <vs-row vs-align="center"
                  vs-type="flex" vs-justify="center" vs-w="12">

            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
              <p>
                Nous sommes là pour te répondre
              </p>
            </vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
    </vs-row>


  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      contact: [
        {icon: 'icon-mail', name: 'Email', to: 'mailto:hello@foxsportif.fr'}, {
          icon: 'icon-instagram',
          name: 'Instagram', to: 'https://www.instagram.com/foxsportif.fr/'
        }]
    }
  },
  methods: {
    push(link) {
      window.open(link);
    }
  }
}
</script>

<style scoped>

</style>