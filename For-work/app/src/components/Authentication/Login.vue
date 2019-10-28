<template>
  <v-container class="text-xs-center">
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-sm-and-up login"></v-flex>
    <v-layout align-center justify-center class="mb-5 mt-5">
      <v-flex xs6 sm3 md2>
        <img src="../../assets/logo/POS_Logomark.svg" alt="logo"/>
      </v-flex>
    </v-layout>
    <v-layout justify-center fill-height row wrap>
      <v-flex xs12 sm8 md4>
        <v-form v-model="isFormValid" class="login">
          <v-text-field
            single-line
            solo
            placeholder="Email address"
            v-model="email"
            :rules="[rules.email]"
          ></v-text-field>

          <v-text-field
            single-line
            solo
            placeholder="Password"
            v-model="password"
            :rules="[rules.required, rules.min]"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <div class="text-xs-right reset-pass-label mb-4">
            Did you
            <router-link to="/reset-password/reset">
              forget your
              password?
            </router-link>
          </div>

          <v-layout justify-center>
            <v-flex xs10 sm8 md7>
              <v-btn
                color="success"
                round
                block
                class="mb-3"
                :loading="isLoading"
                @click="login"
                :disabled="!isFormValid"
              >Login</v-btn>

              <v-btn color="secondary" round block outline to="/welcome">
                <v-icon left small>fas fa-angle-left</v-icon>Back
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>

      <!-- <v-flex xs12>
        <i>– or –</i>
      </v-flex>-->

      <!-- <v-flex xs10 sm6 md3>
        <v-btn @click="facebookLogin" color="primary" block depressed round>
          <v-icon left dark>fab fa-facebook-square</v-icon>
          Log in with Facebook
        </v-btn>
      </v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
import FacebookLogin from "../../mixins/FacebookLogin";
import ValidationRules from "../../mixins/ValidationRules";
import AppToolbarDesktop from "../Core/AppToolbarDesktop"

export default {
  mixins: [FacebookLogin, ValidationRules],
  components: {
    AppToolbarDesktop
  },
  data() {
    return {
      isFormValid: false,
      isLoading: false,
      showPassword: false,
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.isLoading = true;

      this.$http
        .post("/v1/login", {
          email: this.email,
          password: this.password
        })
        .then(this.successfullLogin)
        .catch(this.failedLogin);
    },
    successfullLogin(resp) {
      this.isLoading = false;

      if (resp.data.success === true) {
        // successfull login at this point
        this.$store.commit("setToken", resp.data.token);
        this.$store.commit("setUser", resp.data.user);
        this.$router.push({ name: "Feed", params: { isLogin: true } });
      } else {
        this.failedLogin();
      }
    },
    failedLogin(err) {
      this.isLoading = false;
      // this.notify('Wrong username or password.')
      alert("Wrong username or password.");
    }
  }
};
</script>


<style lang="scss" scoped>
.reset-pass-label {
  margin-top: -15px;
  font-size: 12px;
  opacity: 0.8;
}

.container{
  margin-top: 40px;
  padding:0;
  max-width: unset;
}

.hidden-sm-and-up.login{
  margin-top: -25px;
}

.v-form.login{
  padding: 0 16px;
}
</style>
