<template>
  <v-data-table :headers="leadHeaders" :items="leads" class="elevation-1" :loading="ui.isLoading" disable-initial-sort>
    <template slot="items" slot-scope="props ">
      <td>
        <v-avatar size="30px">
          <img v-if="props.item.profilePicture" :src="props.item.profilePicture">
          <v-icon v-else>person</v-icon>
        </v-avatar>
      </td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.type }}</td>
      <td>
        <span v-show="props.item.studyProgress">
          {{ props.item.studyProgress }} in
        </span>
        <span v-show="props.item.fieldOfStudy">
          {{ props.item.fieldOfStudy }}
        </span>
        <span v-show="props.item.university">
          at {{ props.item.university }}
        </span>
      </td>
      <td>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon :href="`mailto:${props.item.email}`" target="_blank" v-on="on">
              <v-icon small class="icon">mail</v-icon>
            </v-btn>
          </template>
          <span>Send email to lead</span>
        </v-tooltip>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  created() {
    this.loadLeads()
  },
  data() {
    return {
      leads: [],
      leadHeaders: [{
          text: "Picture",
          sortable: false,
          value: "profilePicture",
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Education",
          value: "university"
        },
        {
          text: "Actions",
          sortable: false,
        }
      ],
      ui: {
        isLoading: false
      }
    }
  },
  methods: {
    loadLeads() {
      const self = this
      this.ui.isLoading = true

      this.$http.get('/v1/metrics/leads')
        .then((response) => {
          if (response.data.success === true) {
            self.leads = response.data.payload
          } else {
            self.onFailedRequest(response.data)
          }
        })
        .catch(function (error) {
          self.onFailedRequest(error)
        })
        .finally( () => {
          self.ui.isLoading = false
        })
    },
    onFailedRequest(error) {
      console.warn('Could not load API', error)
    }
  }
}
</script>
