<template>
  <v-flex xs11>

    <v-toolbar color="elevation-1" class="mb-3">
      <v-toolbar-title>My Campaigns</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="primary" flat dark class="white--text-right" @click="$router.push('/campaigns/edit/new')">
          <v-icon dark left>add</v-icon>
          Create Campaign
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table :headers="headers" :items="campaigns" class="elevation-1" :loading="ui.loadingCampaigns"
      :pagination.sync="ui.tableConfig">
      <template slot="items" scope="props">
        <td>{{ props.item.name }}</td>
        <td style="text-transform: capitalize;">{{ props.item.type }}</td>
        <td>{{ new Date(props.item.createdAt).toDateString() }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="toggleStatus(props.item._id, !props.item.enabled)" v-if="props.item.enabled === true">
                  pause
                </v-icon>
                <v-icon small @click="toggleStatus(props.item._id, !props.item.enabled)" v-else>
                  play_arrow
                </v-icon>
              </v-btn>
            </template>
            <span v-if="props.item.enabled === true">Disable</span>
            <span v-else>Enable</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="$router.push('/campaigns/edit/' + props.item._id)">
                  edit
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>

    <!-- CRAWLED CAMPAIGNS -->
    <div v-if="$store.state.user.type === 'admin'">
      <v-toolbar color="primary" dark class="mt-5 elevation-1">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">Crawled jobs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-flex xs3 class="pt-3">
              <v-select thin :items="jobCategories" label="Job Category" v-model="selectedJobCategory" dense dark></v-select>
            </v-flex>

          </template>
          <span>Unpublished crawled Job Campaigns. To publish: First click on Edit campaign, then review and submit
            it.</span>
        </v-tooltip>
      </v-toolbar>

      <v-data-table :headers="botCampaignHeaders" :items="botCampaigns" class="elevation-1"
        :loading="ui.loadingBotCampaigns" :pagination.sync="ui.tableConfig">
        <template slot="items" scope="props">
          <td style="text-transform: capitalize;">{{ props.item.csvData.type  }} {{ props.item.csvData.category }}</td>
          <td>{{ props.item.slides[0].params.companyName }}</td>
          <td>{{ props.item.slides[0].params.jobTitle }}</td>
          <td style="text-transform: capitalize;">{{ props.item.type }}</td>
          <td>{{ props.item.slides[0].params.postingDate }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon small
                    @click="$router.push({path: '/campaigns/edit/' + props.item._id, query: { botCampaign: true }})">
                    edit
                  </v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </div>

    <v-snackbar v-model="snackbar.active" :color="snackbar.color" :timeout="snackbar.timeout" multi-line top>
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.active = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-flex>
</template>

<script>
export default {
  created() {
    this.loadCampaigns()
    //this.loadBotCampaigns()

    if (this.$route.params.campaignSaved) {
      this.notify('Campaign saved successfully.', 'success', 3000)
    }
  },
  watch: {
    selectedJobCategory: function () {
      this.loadBotCampaigns()
    }
  },
  data() {
    return {
      campaigns: [],
      botCampaigns: [],
      dialog: false,
      snackbar: {
        active: false,
        text: '',
        color: 'info',
        timeout: 5000
      },
      selectedJobCategory: 'oevrige/student',
      jobCategories: [
        'it/database', 'it/itdrift', 'it/itledelse', 'it/internet', 'it/systemudvikling', 'it/telekom', 'it/virksomhedssystemer', 'oevrige/student', 'oevrige/studiepraktik',
        'ingenioer/byggeteknik', 'ingenioer/kemi', 'ingenioer/elektronik', 'ingenioer/teknikledelse', 'ingenioer/maskiningenioer', 'ingenioer/medicinal', 'ingenioer/produktionsteknik'
      ],
      headers: [{
          text: 'Name',
          align: 'left',
          // sortable: false,
          value: 'name'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Slides'
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
      botCampaignHeaders: [
        {
          text: 'Job Category',
          value: 'csvData.jobSubCategory'
        },
        {
          text: 'Company Name',
          value: 'name'
        },
        {
          text: 'Job Title',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'type'
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
      ui: {
        loadingCampaigns: false,
        loadingBotCampaigns: false,
        tableConfig: { rowsPerPage: 10, sortBy: 'createdAt', descending: true }
      }
    }
  },
  methods: {
    loadCampaigns() {
      const self = this

      this.ui.loadingCampaigns = true

      this.$http.get('/v1/campaigns')
        .then((response) => {
          if (response.data.success === true) {
            self.onSuccessfullRequest(response.data.payload)
            console.log(response.data.payload)
          } else {
            self.onFailedRequest(response.data)
          }
        })
        .catch(function (error) {
          self.onFailedRequest(error)
        });
    },
    loadBotCampaigns () {
      const self = this

      this.ui.loadingBotCampaigns = true

      this.$http.get('/v1/bot-campaigns/category/' + this.selectedJobCategory.split('/')[1] )
        .then((response) => {
          self.ui.loadingBotCampaigns = false
          if (response.data.success === true) {
            self.botCampaigns = response.data.payload
          } else {
            self.onFailedRequest(response.data)
          }
        })
        .catch(function (error) {
          self.ui.loadingBotCampaigns = false
          self.onFailedRequest(error)
        });
    },
    onSuccessfullRequest(campaigns) {
      this.ui.loadingCampaigns = false
      this.campaigns = campaigns
    },
    onFailedRequest(error) {
      this.ui.loadingCampaigns = false
      this.notify('Could not load your information. Please check your internet connection and try again.', 'red')
    },
    notify(text, color, timeout) {
      this.snackbar.text = text
      if (color) this.snackbar.color = color
      if (timeout) this.snackbar.timeout = timeout
      this.snackbar.active = true
    },
    toggleStatus(campaignId, targetStatus) {
      const self = this

      this.$http.patch('/v1/campaigns/' + campaignId, {
        enabled: targetStatus
      }).then(response => {
        self.loadCampaigns()
      })
      .catch(error => {
        this.notify("Ops! We couldn't update your campaign..", 'warning', 2000)
        console.log('Error', error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
