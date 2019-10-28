<template>
  <div class="filter-content" v-bind:class="{show : value}" >

    <div class="section-header">Show me</div>

    <filter-post-types></filter-post-types>

    <div class="section-header">Prioritizing</div>

    <v-container>
      <v-layout>
        <v-flex xs12>
          <skill-chips v-for="(skill, index) in getPrioritizedItems" :label="skill" :key="index"></skill-chips>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn to="/profile/setup">Profile Setup</v-btn>
    <log-out></log-out>
    <!-- <v-btn @click="logout">Logout</v-btn> -->
    <!-- <v-btn to=""></v-btn> -->

  </div>
</template>

<script>

import SkillChips from './FeedElementChips'
import FilterMixin from '../../mixins/FeedFilter'
import EventBus from '../../eventBus'
import FilterPostTypes from "./FilterPostTypes";
import LogOut from "../Profile/LogOut";

export default {
  props: ['value'],
  mixins: [FilterMixin],
  components: {
    SkillChips,
    FilterPostTypes,
    LogOut
  },
  data() {
    return {
      // postTypes: []
    }
  },
  watch: {
    postTypes: function (newVal) {
      EventBus.$emit('FILTER_CHANGED', this.postTypes)
    }
  },
  computed: {
    // list here all prioritization points of the algorithm - most values from student's tags
    getPrioritizedItems() {
      const user = this.$store.state.user.studentInfo

      if (user && user.tags && user.tags.skills) {
        return Object.values(user.tags.skills)
      }

      return ['Pro tip:', 'Update your profile', 'and', 'get better matches!']
    }
  },
  methods: {
    hideContent: function(event) {
      if(!event.target){

      }
    },
    // logout() {
    //   this.$store.commit('logout')
    //   this.$router.push('/welcome')
    //   window.location.reload(false) // reload page to clear vuex
    // }
  }
}

</script>

<style lang="scss" scoped>

.filter-content{
  transform: translateY(-120%);
  transition: transform 0.2s linear;
  &.show{
    transform: translateY(0);    
  }
}

.section-header {
  color: #830000;
  width: 40%;
  margin: 20px 0 0 10%;
  font-size: 18px;
  font-weight: 500;
}

.section-header::after {
  content: "";
  position: absolute;
  right: 0;
  background-color: #455A64;
  width: 51%;
  height: 1px;
  margin: 10px;
  margin-top: 13px;
}

</style>
