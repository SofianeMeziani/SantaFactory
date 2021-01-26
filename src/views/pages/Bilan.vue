<template>

  <div></div>
</template>

<script>

export default {
  name: "Bilan",

  components: {
    // VueApexCharts
  },
  data() {
    return {
      stats: [
        {name: 'BÉNÉFICE', amount: '537.45 €'},
        {name: 'RÉUSSITE', amount: '71.12 %'}],
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      lineAreaChartSpline: {

        series: [{
          name: 'series1',
          data: [100, 115, 130, 120, 130, 155, 160]
        }],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,

            },
          },


          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },

          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          yaxis: {

            labels: {
              formatter: function (value) {
                return value + " €";
              }
            },
          },
          xaxis: {
            show: false,
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false
            },
            labels: {
              show: false
            },
            type: 'date',
            categories: ["2020-12-19", "2020-12-20", "2020-12-21",
              "2020-12-22", "2020-12-23", "2020-12-24",
              "2020-12-25"
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy'
            },

          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>