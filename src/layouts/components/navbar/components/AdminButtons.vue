<template>
  <div class="flex items-center">
    <!--    <router-link to="/users">-->
    <!--      <vs-button color="primary" type="gradient" icon-pack="feather" icon="icon-lock" style="margin: 1px">-->
    <!--        Utilisateurs-->
    <!--      </vs-button>-->
    <!--    </router-link>-->
    <!--    <router-link to="/pronostic">-->
    <!--      <vs-button color="primary" type="gradient" icon-pack="feather" icon="icon-lock" style="margin: 1px">Pronostic-->
    <!--      </vs-button>-->
    <!--    </router-link>-->
    <!--    <vs-button @click="sendTelegram" size="small" class="mr-2" color="primary" type="gradient" icon-pack="feather"-->
    <!--                   icon="icon-send"-->
    <!--                   style="margin: 1px">Envoyer sur Télégram-->
    <!--        </vs-button>-->

    <vs-button v-if="pwa() === false" color="dark" size="small" class="mr-2 pr-2 pl-2" type="gradient" icon-pack="fa"
               icon="fa-times-circle" style="background: rgb(30,30,30)!important; border: 1px solid #333">
      <font-awesome-icon size="lg" :icon="['fab','apple']"/>
      Apple store
    </vs-button>


    <vs-button v-if="pwa() === false" color="dark" size="small" class="mr-2 pr-2 pl-2" type="gradient"
               style="background: rgb(30,30,30)!important; border: 1px solid #333">
      <font-awesome-icon size="lg" :icon="['fab','google-play']"/>
      Play
      store
    </vs-button>
    <div v-if="pwa()">
      <h3> Fox Sportif</h3>
    </div>
  </div>
</template>

<script>

export default {

  methods: {
    sendTelegram() {
      alert('hi')
    },
    pwa() {
      return ["fullscreen", "standalone", "minimal-ui"].some(
          (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
      );
    }
  }
}
</script>
