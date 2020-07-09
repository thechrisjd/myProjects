<template>
    <v-container fill-height fluid class="pl-0 py-1">
      <v-layout class="chart-height" align-start row wrap>
        <v-flex xs12 sm12 md6>
          <metrics-chart :metricsData="metrics" class="metrics-chart"></metrics-chart>
        </v-flex>

        <v-flex  xs12 class="mr-2 mt-4">
          <v-toolbar class="elevation-1">
            <v-toolbar-title>User Statistics</v-toolbar-title>
          </v-toolbar>

          <v-data-table hide-default-footer :headers="headers" :items="coffeesRedeemed" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ metrics.total }}</td>
              <td>{{ metrics.currentMonth }}</td>
              <td>{{ metrics.lastMonth }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import MetricsChart from "../components/Admin/MetricsChart.vue";
export default {
  components: {
    MetricsChart
  },
  created() {
    const self = this;
    this.$http
      .get(`/v1/admin/students`, {})
      .then(response => {
        self.metrics = response.data;
        console.log(self.metrics)
      })
      .catch(function (error) {
        alert("Something went wrong!");
        console.log(error);
      });
  },
  data() {
    return {
      metrics: {},
      headers: [

        {
          text: 'Total',
          value: 'total',
          width: "0%"

        },
        {
          text: 'This Month',
          value: 'thisMonth',
          width: '0%'
        },
        {
          text: 'Last Month',
          value: 'today',
          width: '0%'
        }
      ],
      coffeesRedeemed: [{

        'total': 26,
        'thisMonth': 0,
        'today': 5,
        'lastTicket': "Fri Sep 27 2019 09:38:42 GMT+0100"
      }],
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
