<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-container>
                <v-layout>
                  <v-flex>
                    <div class="heading">Log in to the Dashboard to have an overview and manage your campaings.</div>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-form ref="form" @submit.prevent="login">
                <v-card-text>
                  <v-text-field v-model="email" prepend-icon="person" :rules="emailRules" label="E-mail" required>
                  </v-text-field>
                  <v-text-field v-model="password" prepend-icon="lock" label="Password" type="password" required>
                  </v-text-field>

                </v-card-text>
                <v-card-actions>
                  <router-link to="/register">
                    <v-btn flat small>Create new account</v-btn>
                  </router-link>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  created() {
    console.log('User token' , this.$store.state.auth.token)
  },
  data: () => ({
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: ""
  }),
  props: {
    source: String
  },
  methods: {
    trigger () {
    	this.$refs.sendReply.click()
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$http
          .post("/v1/login", {
            email: this.email,
            password: this.password
          })
          .then( (response) => {
            const token = response.data.token;
            const userJSON = response.data.user;
            this.$store.commit("setAccessToken", token);
            this.$store.commit("setUser", userJSON);

            if (userJSON.type === "vendor") {
              self.$router.push("/vendor")
            }

            self.$router.push("/");
          })
          .catch(function (error) {
            alert("Wrong log-in credentials");
            console.log(error);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      const self = this;

      this.$http
        .post("/v1/login", {
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          const token = response.data.token;
          const user = response.data.user

          if (!user || !token) {
            console.log('Missing user or token from login response.')
            return alert('Sorry, something went wrong and we could not log you in. Please try again.')
          }

          self.$store.commit('setUser', user)
          self.$store.commit('setToken', token)
          //console.log(user.type)
          if (user.type === "vendor") {
            self.$router.push("/vendor")
          } else if (user.type === "admin") {
            self.$router.push("/admin")
          } else {
            self.$router.push("/")
          }

        })
        .catch(function(error) {
          console.log(error);
          alert("Something went wrong!");
        });
    }
  }
};
</script>
