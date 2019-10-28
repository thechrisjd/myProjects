<template>
  <div class="profile-section">
    <div class="profile-title">
      <!-- <v-icon class="pr-2">{{ content.icon }}</v-icon> -->
      <div>{{ content.title }}</div>
      <v-btn
        flat
        icon
        @click="$emit('editing', content.componentId)"
        class="edit-button"
        v-show="content.studentInfoKey !== 'tags.competences'"
      >
        <v-icon small>edit</v-icon>
      </v-btn>
    </div>

    <!-- list chips -->
    <div v-if="!content.items" :class="{'skills' : content.studentInfoKey === 'tags.competences'}">
      <div v-for="(item, index) in items" :key="index">
        <span v-if="item" small class="text-capitalize" >
          <span v-if="content.studentInfoKey === 'tags.industries' ">{{ getIndustryName(item) }}</span>
          <span v-else-if="content.studentInfoKey === 'tags.jobTypes'">{{ getJobTypeName(item) }}</span>
          <span v-else-if="content.studentInfoKey === 'tags.locations'">{{ getLocationNames(item) }}</span>
          <span v-else :class="{'skill' : content.studentInfoKey === 'tags.competences'}">{{ item }}</span>
        </span>
      </div>
      <a 
        v-if="content.studentInfoKey === 'tags.competences'"
        @click="$emit('editing', content.componentId)"
        class="add-button"
      >add+</a>
      <!-- <v-flex v-if="items.length === 0" class="fill-fields">Please fill out these fields</v-flex>
      <v-btn
        v-if="items.length === 0"
        small
        outline
        round
        color="primary"
        :to="content.editorPath"
        @click="$emit('editing', content.componentId)"
      >+ Add</v-btn>-->
    </div>

    <!-- show buttons and text if items exist -->
    <div v-else>
      <div
        v-for="(element, index) in content.items.filter(e => getValueFor(e.key))"
        :key=" 'element-' + index"
      >
        <span class="font-weight-medium">{{ element.label }}:</span>
        <span>{{ getValueFor(element.key) }}</span>
      </div>

      <!-- <div
        v-for="(element, index) in content.items.filter(e => !getValueFor(e.key))"
        :key=" 'missing-element-' + index"
      >
        <v-btn
          small
          outline
          round
          color="primary"
          @click="$emit('editing', content.componentId)"
        >+ Add {{element.label}}</v-btn>
      </div>-->
    </div>
  </div>
</template>

<script>
import get from "lodash/get";
import ResolveTagNames from "../../mixins/ResolveTagNames";
import {
  industries,
  jobTypes,
  locations
} from "../../components/Profile/config";
import find from "lodash/find";

export default {
  props: ["content"],
  // mixins: [ResolveTagNames],
  data() {
    return {
      items: [],
      get
    };
  },
  created() {
    this.updateData();
  },
  watch: {
    "$store.state.studentInfo": {
      deep: true,
      handler() {
        this.updateData();
      }
    }
  },
  methods: {
    updateData() {
      this.items =
        get(this.$store.state.studentInfo, this.content.studentInfoKey) || [];
    },
    getValueFor(key) {
      return get(this.$store.state.studentInfo, key);
    },

    getIndustryName(id) {
      const item = find(industries, { id });
      return item && item.name ? item.name : "";
    },
    getJobTypeName(id) {
      const item = find(jobTypes, { id });
      if (item && item.label) {
        return item.label;
      }
      return "";
    },
    getLocationNames(id) {
      return find(locations, { id }).label;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.fill-fields {
  color: rgb(133, 131, 131);
  font-size: 12px;
  margin-top: -16px;
}

.profile-section {
  min-height: 36px;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 10px;
  color: $profile-main-color;
  font-size: 12px;

  .profile-title {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
}

.text-capitalize {
  color: $profile-second-color;
}
.profile-header {
  .skills {
    display: flex;
    flex-flow: row wrap;

    .skill {
      border: 1px solid $profile-main-color;
      border-radius: 10px;
      padding: 4px 10px;
      margin: 0 10px 10px 0;
      font-size: 11px;
    }

    .add-button{
      font-size: 11px;
      line-height: 37px;
      color: $profile-second-color;  
    }
  }
}
</style>
