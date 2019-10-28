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
      function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      var labelsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      var ticketsGivenOut = this.metricsData ? this.metricsData.month : [ 0, 0, 0, 0, 5, 9, 4, 3, 5, 0, 0, 0]
      var ctx = document.getElementById("metricsChart");

      var data = {
        labels: labelsArray,
        datasets: [
          {
            data: ticketsGivenOut,
            borderColor: "#7DDEEC",
            fill: false,
            backgroundColor : "rgba(198, 28, 10, 0.8)"
          }
        ]
      };

      var options = {
        title: {
          display: true,
          text: "Tickets Redemed"
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        }
      };

      this.chart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options
      });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
