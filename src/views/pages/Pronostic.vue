<template>
  <div>
    <h1 class="text-center mb-6">Le pronostic du jour</h1>

    <div class="vx-row">
      <div class="vx-col w-2/5 text-center" id="team1">
        <h4 class="text-center">Team 1</h4>


        <div class="centerx">
          <vs-upload action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload"/>
        </div>
      </div>
      <div class="vx-col w-1/5 text-center" id="vs1">VS</div>
      <div class="vx-col w-2/5 text-center" id="team2">
        <h4 class="text-center">Team 2</h4>
        <div class="centerx">
          <vs-upload action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload"/>
        </div>
      </div>
      <div class="vx-col" id="date_et_heure1"></div>

      <div class="vx-col" id="team3"></div>
      <div class="vx-col" id="vs2"></div>
      <div class="vx-col" id="team4"></div>
      <div class="vx-col" id="date_et_heure2"></div>

      <div class="vx-col" id="titre_prono"></div>
      <div class="vx-col" id="cote"></div>
      <div class="vx-col" id="pourcentage_mise"></div>

      <div class="vx-col" id="commentaire"></div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Pronostic"
}
</script>

<style scoped>

</style>