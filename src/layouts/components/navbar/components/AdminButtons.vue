<template>
  <div class="w-100">
    🎅🏻 <b>Noël arrive ! Il ne reste plus qu'à attendre</b>
    <vue-countdown-timer
        @start_callback="startCallBack('event started')"
        @end_callback="endCallBack('event ended')"
        :start-time="'2018-10-10 00:00:00'"
        :end-time="1640390400"
        :interval="1000"
        :start-label="'Until start:'"
        :end-label="''"
        label-position="begin"
        :end-text="'C est Noeeellll !'"
        :day-txt="'jours '"
        :hour-txt="'heures '"
        :minutes-txt="'minutes'"
        :seconds-txt="'secondes'">
    </vue-countdown-timer>
  </div>
</template>

<script>

export default {
  name: 'Timer',
  methods: {
    pwa() {
      return ["fullscreen", "standalone", "minimal-ui"].some(
          (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
      );
    },
    startCallBack: function (x) {
      // console.log(x);
    },
    endCallBack: function (x) {
      // console.log(x);
    },
  }
}


</script>
