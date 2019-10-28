<template>
  <v-container class="text-xs-center">
    <v-layout>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-sm-and-up signup-form"></v-flex>
    <v-flex class="hidden-xs-only signup-form"></v-flex>
    <v-flex xs12 class="mb-1">
      <h1>Create your account</h1>
    </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs10 sm6 md4>
        <div
          class="referral --valid"
          v-show="isValidReference"
        >You signed up by {{nameOfReferenceUser}}</div>
        <div
          class="referral --invalid"
          v-show="isInvalidReference"
        >Warning. You are using invalid reference!</div>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center fill-height column>
      <v-flex xs12 md6>
        <v-form v-model="isFormValid">
          <p class="mb-1">Name*</p>
          <v-text-field
            class="test1"
            solo
            placeholder="First name"
            v-model="user.firstName"
            :rules="[ rules.required ]"
          ></v-text-field>
          <v-text-field
            class="test2"
            solo
            placeholder="Last name"
            v-model="user.lastName"
            :rules="[ rules.required ]"
          ></v-text-field>
          <p class="mb-1">Your Email*</p>
          <v-text-field
            single-line
            solo
            placeholder="Email address"
            v-model="user.email"
            :rules="[ rules.required, rules.email ]"
          ></v-text-field>
          <p class="mb-1">Create Password*</p>
          <v-text-field
            single-line
            solo
            placeholder="Password (8+ characters)"
            v-model="user.password"
            :rules="[rules.required, rules.min]"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <!-- v-model="readonly" -->
          <div class="d-flex">
            <v-checkbox
            v-model="acceptTerms"
            class="clean-space"
            :rules="[ rules.required ]"
            @click.stop="acceptedTerms()"
            >
            </v-checkbox>
            <p class="position-absolute terms">I accept the
              <a
                @click.stop="openTerms()"
                target="_blank"
                class="decoration-none">
                Terms of Service and Privacy policy
              </a>
            </p>
          </div>
        </v-form>
      </v-flex>

      <v-flex xs12 md3>
        <v-btn
          color="primary"
          round
          block
          class="mb-1 mt-1"
          :loading="isLoading"
          @click="signup"
          :disabled="!isFormValid"
        >
          <v-icon left small>fas fa-rocket</v-icon>Next Step
        </v-btn>
        <v-btn @click="facebookLogin" color="primary" block depressed round>
          <v-icon left dark>fab fa-facebook-square</v-icon>Log in with Facebook
        </v-btn>
        <p>
          Already have an account?
          <a href>Login here</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import ValidationRules from "../../mixins/ValidationRules";
import UserAuth from "../../mixins/UserAuth";
import AppToolbarDesktop from "../Core/AppToolbarDesktop";
import FacebookLogin from "../../mixins/FacebookLogin";

export default {
  mixins: [ValidationRules, UserAuth, FacebookLogin],
  components: {
    AppToolbarDesktop
  },
  data() {
    return {
      showPassword: false,
      isFormValid: false,
      isLoading: false,
      nameOfReferenceUser: "",
      isInvalidReference: false,
      isValidReference: false,
      acceptTerms: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        referralCodeAtRegistration: ""
      }
    };
  },
  mounted() {
    this.user.referralCodeAtRegistration = this.$route.query.ref || "";

    if (this.user.referralCodeAtRegistration) {
      const apiReferenceCode = `/v1/ref/${this.user.referralCodeAtRegistration}`;

      let self = this;
      this.$http.get(`/v1/ref/${self.user.referralCodeAtRegistration}`).then(
        response => {
          console.log(response);
          if (response.data.success) {
            self.isValidReference = true;
            self.nameOfReferenceUser = response.data.payload.firstName;
          }
        },
        error => (self.isInvalidReference = true)
      );
    }
  },
  methods: {
    openTerms() {
      this.$router.push({
        path: '/terms'
      })
    },
    acceptedTerms() {
      this.acceptTerms = !this.acceptTerms;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 80px;
  padding: 0;
  max-width: unset;

  .v-form {
    padding: 0 16px;
  }
}

.clean-space {
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.decoration-none {
  text-decoration: none;
}
.terms {
  margin-left: 25px;
  margin-top: 2px;
}

p {
  text-align: initial;
}
.test1 {
  width: 47%;
  float: left;
  margin-right: 5%;
}
.test2 {
  width: 48%;
}
.referral {
  border-radius: 3px;
  color: #fff;
  padding: 3px 10px;

  &.--valid {
    background: rgb(84, 190, 84);
  }
  &.--invalid {
    background: rgb(221, 92, 92);
  }
}
</style>

<style lang="scss">
.hidden-sm-and-up.signup-form {
  margin-top: -60px;
}
.hidden-xs-only.signup-form {
  margin-bottom: 30px;
}
</style>
