<template>
  <v-flex xs11>
    <v-toolbar color="elevation-1" class="mb-3">
      <v-toolbar-title>Leads</v-toolbar-title>
    </v-toolbar>
    <leads-table></leads-table>
  </v-flex>
</template>

<script>
import LeadsTable from '../components/Dashboard/LeadsTable'

export default {
  components: {
    LeadsTable
  }
};
</script>
