<template>
<v-container>


  <v-layout justify-start>
    <v-flex xs12>
      <div class="headline">Select a campaign type</div>
      <v-radio-group v-model="selectedType" @change="onTypeChange">
        <v-radio label="Company Profile" value="company"></v-radio>
        <v-radio label="Job Post" value="job"></v-radio>
        <v-radio label="Event" value="event"></v-radio>
        <!-- Disable guide for now -->
        <!-- <v-radio label="Guide" value="guide">Guide</v-radio> -->
      </v-radio-group>
    </v-flex>
  </v-layout>
  <v-layout class="mt-2">
     <v-flex xs12 sm6 md6 lg6 v-if="['job', 'event'].includes(selectedType)">
      <div class="headline mb-2">Specify the region</div>
      <v-select :items="regions" label="Regions" solo v-model="campaign.location" dense></v-select>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['campaign', ],
  created() {
    if (this.campaign.type) {
      this.selectedType = this.campaign.type
    }
  },
  data() {
    return {
      selectedType: '',
      regions: [{
        text: 'Copenhagen',
        value: 'storkoebenhavn'
      },
      {
        text: 'North Zealand',
        value: 'nordsjaelland',
      },
      {
        text: 'Zealand',
        value: 'region-sjaelland'
      },
      {
        text: 'Fyn',
        value: 'fyn'
      },
      {
        text: 'North Jutland',
        value: 'region-nordjylland'
      },
      {
        text: 'Mid Jutland',
        value: 'region-midtjylland'
      },
      {
        text: 'South Jutland',
        value: 'sydjylland'
      },
      {
        text: 'Bornholm',
        value: 'bornholm'
      },
      {
        text: 'Lolland-Falster',
        value: 'lolland-falster'
      },
      ],
      // const jobAreas = ['storkoebenhavn', 'nordsjaelland', 'region-sjaelland', 'fyn', 'region-nordjylland', 'region-midtjylland', 'sydjylland', 'bornholm']
      // const jobAreas = ['', '', '', '', '', '', '', '']
      // regions: ['', '', '', 'South Jutland', 'Zealand', 'Funen', 'Lolland-Falster']
    }
  },
  methods: {
    onTypeChange() {
      this.$emit("typeSelected", this.selectedType);
    }
  }
};
</script>
