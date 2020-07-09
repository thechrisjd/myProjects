<template>
    <v-container fill-height fluid class="pl-0 py-1">
      <v-layout class="chart-height" align-start row wrap>
        <v-flex xs12 sm12 md6>
          <metrics-chart :metricsData="metrics" class="metrics-chart"></metrics-chart>

        </v-flex>
        <v-flex  xs12 class="mr-2 mt-4">
          <v-toolbar class="elevation-1">
            <v-toolbar-title>Vendor Statistics</v-toolbar-title>
          </v-toolbar>

          <v-data-table hide-default-footer :headers="headers" :items="coffeesRedeemed" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{   props.item.total }}</td>
              <td>{{ props.item.thisMonth}}</td>
              <td>{{ props.item.today }}</td>
              <td>{{ props.item.lastTicket }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import MetricsChart from "../components/Vendor/MetricsChart.vue";
export default {
  components: {
    MetricsChart
  },
  created() {
    const self = this;

    this.$http
      .get(`v1/vendors/`, {})
      .then(response => {
        self.metrics = response.data;
        console.log(response.data)
      })
      .catch(function (error) {
        //alert("Something went wrong!");
        console.log(error);
        self.metrics = {
            "total": 26,
            "redemThisMonth": 5,
            "month": [ 0, 0, 0, 0, 5, 9, 4, 3, 5, 0, 0, 0],
            "jan": 0,
            "feb": 0,
            "mar": 0,
            "apr": 0,
            "may": 5,
            "jun": 9,
            "jul": 4,
            "aug": 3,
            "sep": 5,
            "oct": 0,
            "nov": 0,
            "dec": 0
        }
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
        },
        {
          text: 'Last Ticket',
          value: 'lastTicket',
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
.chart-height {
  max-height: 100%;
  max-width: 100%;
}

.v-container {
  //max-width: 100%;
}

.capitalize {
  text-transform: capitalize;
}

</style>
