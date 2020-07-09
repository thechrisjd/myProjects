<template>
  <v-flex xs11>
    <v-toolbar color="elevation-1" class="mb-3">
      <v-toolbar-title>Account Settings</v-toolbar-title>
    </v-toolbar>

    <v-layout row wrap justify-space-between>
      <v-flex xs12 md6 class="pr-1">
        <v-card class="white" height="100%">
          <v-container>
            <v-layout justify-space-between class="mb-3">
              <div class="title">Company</div>
            </v-layout>

            <v-form ref="form" @submit.prevent="updateUser">
              <v-layout row wrap justify-space-between class="mb-5">
                <v-flex xs12 md6 class="pr-2">
                  <v-text-field v-model="form.name.legal" label="Legal name" required></v-text-field>
                </v-flex>
                <v-flex xs12 md6 class="pr-2">
                  <v-text-field v-model="form.CVR" :counter="8" maxlength="8" minlength="8" label="CVR number" required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout class="mb-4">
                <div class="title">Contact Person</div>
              </v-layout>

              <v-layout row wrap justify-space-between>
                <v-flex xs12 md6 class="pr-2">
                  <v-text-field v-model="form.contactPerson.fullName" label="Full name" required></v-text-field>
                </v-flex>
                <v-flex xs12 md6 class="pl-2">
                  <v-text-field v-model="form.contactPerson.email" type="email" validate="required:true"
                    patteren="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" label="E-mail" required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout justify-end class="mt-4">
                <v-btn color="info" type="submit">Save</v-btn>
              </v-layout>

            </v-form>
          </v-container>
        </v-card>
      </v-flex>


      <v-flex xs12 md6>
        <v-card class="white" height="100%">

          <v-container>
            <v-layout row wrap justify-space-between class="mb-3">
              <div class="title">Account</div>
            </v-layout>

            <v-form ref="form" @submit.prevent="updateAccountEmail">
              <v-layout row wrap justify-space-between class="mb-2">
                <v-flex xs12 md8>
                  <v-text-field v-model="account.email" type="email" validate="required:true"
                    patteren="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" label="E-mail" required>
                  </v-text-field>
                </v-flex>
                <v-btn class="white--text-right" color="info" 
                v-bind:disabled="(account.email) === ''" type="submit">Save</v-btn>
              </v-layout>
            </v-form>

            <v-layout class="mb-4 mt-5">
              <div class="title">Change Password</div>
            </v-layout>

            <v-form ref="form" @submit.prevent="updateAccountPassword">
              <v-layout>
                <v-flex md6>
                  <v-text-field v-model="account.oldpassword" label="Old password" type="password" required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 md6 class="pr-2">
                  <v-text-field v-model="account.password1" label="New password" type="password" required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md6 class="pl-2">
                  <v-text-field v-model="account.password2" label="Repeat new password" type="password" required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout justify-end class="mt-4">
                <v-btn class="white--text-right" color="info"
                  :disabled="!(account.password1 === account.password2 && account.password1)" type="submit">Save</v-btn>
              </v-layout>
            </v-form>

          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbarError" :timeout="4000" bottom color="error">
      <span>Ops! Your changes could not be saved.</span>
      <v-btn flat color="white" @click="snackbarError=false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbarSuccess" :timeout="4000" bottom color="success">
      <span>Changes saved successfully!</span>
      <v-btn flat color="white" @click="snackbarSuccess=false">Close</v-btn>
    </v-snackbar>

  </v-flex>
</template>

<script>
export default {
  created() {
    const user = this.$store.state.user
    this.account.email = user.email

    if (user && user.companyInfo.profile) {
      this.form = user.companyInfo.profile
    } else {
      throw new Error('User not found locally.')
    }
  },
  data() {
    return {
      form: {
        name: {
          common: "",
          legal: ""
        },
        contactPerson: {
          fullName: "",
          email: ""
        },
        CVR: "",
        location: ""
      },
      account: {
        email: "",
        oldpassword: "",
        password1: "",
        password2: ""
      },
      snackbarSuccess: false,
      snackbarError: false,
      validate: true
    };
  },
  watch: {
    form: {
      handler: function (newVal) {
        this.validate = true;
      },
      deep: true
    }
  },
  methods: {
    updateUser() {
      const self = this;
      const company_id = this.$store.state.user._id;

      this.$http
        .put(`/v1/users/company/${company_id}/profile`, this.form)
        .then(function (response) {
          self.validate = false
          self.$store.commit("setUser", response.data.payload)
          self.notify(true)
        })
        .catch(function (error) {
          console.log(error);
          self.notify(false)
        });
    },
    updateAccountEmail() {
      const self = this
      const company_id = this.$store.state.user._id;

      this.$http
        .put(`/v1/users/${company_id}/email`, { email: this.account.email })
        .then(function (response) {
          self.$store.commit("setUser", response.data.payload);   

          self.notify(true)
        })
        .catch(function (error) {
          console.log("Error:", error);
          self.notify(false)
        });
    },
    updateAccountPassword() {
      const self = this
      const company_id = this.$store.state.user._id;
      const postData = {
        oldPassword: this.account.oldpassword,
        newPassword: this.account.password1
      }

      this.$http
        .put(`/v1/users/${company_id}/password`, postData)
        .then(function (response) {

          self.account.oldpassword = ""
          self.account.password1 = ""
          self.account.password2 = ""

          self.notify(true)
        })
        .catch(function (error) {
          console.log("Error:", error);
          self.notify(false)
        });
    },
    notify(success = true) {
      success ? this.snackbarSuccess = true : this.snackbarError = true
    }
  }
};
</script>

<style lang="scss" scoped>

h1 {
  margin-bottom: 10px;
}
</style>
