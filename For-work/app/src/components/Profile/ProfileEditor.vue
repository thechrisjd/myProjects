<template>
  <div>
    <div class="title text-xs-center mt-3 mb-4">{{ componentTitle }}</div>    
    <component :is="componentId" @setTitle="setTitle"></component>
  </div>
</template>

<script>

import EditBio from './Editor/EditBio'
import EditAboutMe from './Editor/EditAboutMe'
import EditCompetences from './Editor/EditCompetences'
import EditLocation from './Editor/EditLocation'
import EditEducation from './Editor/EditEducation'
import EditAccount from './Editor/EditAccount'
import EditContacts from './Editor/EditContacts'
import EditPortfolio from './Editor/EditPortfolio'
import EditLanguages from './Editor/EditLanguages'
import EditJobTypes from './Editor/EditJobTypes'
import EditIndustries from './Editor/EditIndustries'

export default {
  props: ['componentId'],
  components: {
    EditAboutMe,
    EditBio,
    EditCompetences,
    EditLocation,
    EditEducation,
    EditAccount,
    EditContacts,
    EditPortfolio,
    EditLanguages,
    EditJobTypes,
    EditIndustries,
  },
  data() {
    return {
      componentTitle: ''
    }
  },
  methods: {
    setTitle(componentTitle) {
      this.componentTitle = componentTitle
    }
  }
}
</script>
