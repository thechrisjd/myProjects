<template>
  <div>
    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/welcome");
      window.location.reload(false); // reload page to clear vuex
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  background-color: #b83a3a !important;
  color: white;
  padding: 0 20px;
  border-radius: 20px;
  font-weight: bold;
}
</style>