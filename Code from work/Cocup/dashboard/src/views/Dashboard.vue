<template>
  <v-layout row wrap>
    <!-- <div class="headline">Your campaigns' statistics</div> -->

    <v-container fill-height fluid class="pl-0 py-4">
      <v-layout class="chart-height" align-start row wrap>
        <v-flex xs12 sm12 md7>
          <metrics-chart :metricsData="metrics" class="metrics-chart"></metrics-chart>
        </v-flex>
        <v-flex>
          <overall-metrics :overallMetricsData="metrics"></overall-metrics>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout row wrap>

      <v-flex md6 xl6>
        <v-toolbar class="elevation-1">
          <v-toolbar-title>Active Campaigns</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-and-down">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on" fab dark small class="white--text-right"
                  @click="$router.push('/campaigns/edit/new')">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>Create a new campaign</span>
            </v-tooltip>

          </v-toolbar-items>
        </v-toolbar>

        <v-data-table :headers="campaignHeaders" :items="campaigns" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="capitalize">{{ props.item.type }}</td>
            <td>{{ props.item.slides.length}}</td>
            <td>{{ new Date(props.item.createdAt).toDateString() }}</td>

            <td>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="$router.push('/campaigns/edit/' + props.item._id)" v-on="on">
                    <v-icon small>edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit campaign</span>
              </v-tooltip>
              
              <!-- <v-icon small class="mr-3" @click="deleteItem(props.item)">delete</v-icon> -->
              <!-- <v-icon small @click="$router.push('/campaigns/edit/' + props.item._id)">file_copy</v-icon> -->
            </td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex md6 xl6 class="pl-2">
        <v-toolbar class="elevation-1">
          <v-toolbar-title>Leads</v-toolbar-title>
        </v-toolbar>
        <leads-table></leads-table>

      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import MetricsChart from "../components/Dashboard/MetricsChart.vue";
import OverallMetrics from "../components/Dashboard/OverallMetrics.vue";
import LeadsTable from "../components/Dashboard/LeadsTable.vue";

export default {
  components: {
    MetricsChart,
    OverallMetrics,
    LeadsTable
  },
  created() {
    const self = this;

    this.$http
      .get(`/v1/metrics/`, {})
      .then(response => {
        self.metrics = response.data.payload;
      })
      .catch(function (error) {
        alert("Something went wrong!");
        console.log(error);
      });

    this.loadCampaigns()
    this.loadLeads()
  },
  data() {
    return {
      metrics: {},
      on: '',
      campaignHeaders: [{
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Slides',
          value: 'slides.length'
        },
        {
          text: 'Created',
          value: 'createdAt',
          sortable: true
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      campaigns: [],
      leads: []
    };
  },
  methods: {
    loadCampaigns() {
      const self = this
      this.$http.get('/v1/campaigns')
        .then((response) => {
          if (response.data.success === true) {
            self.campaigns = response.data.payload.filter(campaign => campaign.enabled)
          } else {
            self.onFailedRequest(response.data)
          }
        })
        .catch(function (error) {
          self.onFailedRequest(error)
        });
    },

    onFailedRequest(error) {
      console.warn('Could not load API', error)
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-height {
  max-height: 100%;
  max-width: 100%;
}

.v-container {
  // max-width: 100%;
}

.capitalize {
  text-transform: capitalize;
}

</style>
