<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Create a New Account</v-toolbar-title>
              </v-toolbar>
              <v-container>
                <v-layout>
                  <v-flex>
                    <div class="heading">Create a new account to launch campaings on the COCUP platform.</div>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="email" prepend-icon="person" :rules="emailRules" label="Email address" required>
                  </v-text-field>
                  <v-text-field v-model="password" prepend-icon="lock" :rules="passwordRules" label="Password (8+ characters)"
                    type="password" required></v-text-field>
                  <!-- <v-text-field v-model="passwordRepeat" prepend-icon="lock" :rules="repeatPasswordRule" label="Repeat password" type="password" required></v-text-field> -->
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/login">
                  <v-btn flat small>Log in</v-btn>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register" type="submit">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        (v && v.length >= 8) ||
        "Password must be more or equal than 8 characters"
    ]
  }),
  props: {
    source: String
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    register() {
      const self = this;

      this.$http
        .post("/v1/register", {
          email: this.email,
          password: this.password,
          type: "company"
        })
        .then(function(response) {
          self.$router.push("/login");
          alert("You have now signed up!")
        })
        .catch(function(error) {
          alert("Registration not successful!");
          console.log(error);
        });
    }
  }
};
</script>