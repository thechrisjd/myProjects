<template>
    <v-card max-width="800">
      <canvas id="metricsChart" style="height:35vh;"></canvas>
    </v-card>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ["metricsData"],
  watch: {
    metricsData: function (newVal) {
      this.initChart()
    }
  },
  created() {
    this.initChart()
  },
  data() {
    return {
      chart: {}
    }
  },
  methods: {
    initChart() {
      var labelsArray = this.metricsData ? this.metricsData.labels : ['one', 'two']
      var clicksArray = this.metricsData ? this.metricsData.clickSeries : [1, 2]
      var viewsArray = this.metricsData ? this.metricsData.viewSeries : [1, 4]
      var leadsArray = this.metricsData ? this.metricsData.leadSeries : [1, 4]

      var ctx = document.getElementById("metricsChart");

      var data = {
        labels: labelsArray,
        datasets: [{
            data: clicksArray,
            label: "Clicks",
            borderColor: "#ffcc80",
            fill: false
          },
          {
            data: viewsArray,
            label: "Views",
            borderColor: "#c0ca33",
            fill: false
          },
          {
            data: leadsArray,
            label: "Leads",
            borderColor: "#7DDEEC",
            fill: false
          }
        ]
      };

      var options = {
        title: {
          display: true,
          text: "Overall campaign metrics"
        }
      };

      this.chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
      });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
