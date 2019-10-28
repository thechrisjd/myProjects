<template>
  <v-layout >
    <!-- v-if="$store.state.studentInfo && $store.state.studentInfo.profile" -->
    <!-- <v-flex xs12>
      <div class="title mt-4 mb-2 pl-5" >
          {{ $store.state.studentInfo.profile.firstName + ' ' +  $store.state.studentInfo.profile.lastName }}

          <v-btn flat icon @click="$emit('editing', 'EditAccount')" class="pb-1">
            <v-icon left small>edit</v-icon>
          </v-btn>
        </div>
    </v-flex> -->

    <v-flex>
      <!-- <div class="subheading pl-5">
        Education
        <v-btn flat icon @click="$emit('editing', 'EditEducation')" class="pb-1">
          <v-icon left small>edit</v-icon>
        </v-btn>
      </div> -->
      <v-flex v-if="!userHasEducationFilled" class="fill-fields">Please fill out these fields</v-flex>
      <v-btn v-if="!userHasEducationFilled" small outline round color="primary" @click="$emit('editing', 'EditEducation')">+ Add</v-btn>
      <div v-else>
        <div>
          <div class="profile-title">
            <div>Education</div>
            <v-btn
              flat
              icon
              @click="$emit('editing', 'EditEducation')"
              class="edit-button"
            >
              <v-icon small>edit</v-icon>
            </v-btn>
          </div>
          <div class="education">{{ $store.state.studentInfo.education.university }}</div>
          <div class="education">{{ $store.state.studentInfo.education.fieldOfStudy }}</div>
          <div class="education">{{ $store.state.studentInfo.education.studyProgress }}</div>
        </div>
        <div>
          <div class="profile-title">Specialisation</div>
        </div>
      </div>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  computed: {
    userHasEducationFilled() {
      const { university, fieldOfStudy, studyProgress } = this.$store.state.studentInfo.education
      return (university && fieldOfStudy && studyProgress)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/cocup-ui.scss';

.profile-title {
    font-size: 22px;
    font-weight: bold;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 0;
  }

.education{
  font-size: 13px;
  color: $profile-second-color;
}
</style>


