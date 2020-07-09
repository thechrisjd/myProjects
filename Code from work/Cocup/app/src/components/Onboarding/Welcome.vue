<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="nav-header">
          <img src="/img/icons/COCUP_trademark_coloured.svg" alt="">
        </div>
        <!-- Slider main container -->
        <div class="swiper-container">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide" v-for="(slide, key) in slides" :key="key">
              <div class="swiper-content">
                <p class="header">{{ slide.title }}</p>
                <p>{{ slide.description }}</p>
                <img :src="slide.image" alt="">
              </div>
            </div>
          </div>
          <!-- If we need pagination -->
          <div class="swiper-pagination"></div>
        </div>

        <div class="onboarding-actions mt-1">
          <p>Log in or sign up for free</p>
          <v-btn color="info" block depressed @click="$router.push('/welcome/email')">Continue with email</v-btn>
          <v-divider class="my-3">OR</v-divider>
          <v-btn @click="facebookLogin" color="primary" block depressed>
            Log in with Facebook
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/css/swiper.min.css'

export default {
  mounted() {
    const self = this

    this.initializeSlides()

    window.checkLoginState = function (resp) {
      console.log("The user has been authenticated via the 'Login with Facebook' button", resp)
      const socialToken = resp.authResponse.accessToken
      if (socialToken) {
        return self.authenticate(socialToken)
      }
    }

    document.addEventListener('fb-sdk-loaded', function (e) {
      console.log('FB SDK has been loaded and initialized.')

      FB.getLoginStatus(function (response) {
        console.log('Facebook login status:', response.status)
        // authenticate the user with the server using the access token
        const socialToken = response.authResponse.accessToken
        if (socialToken) {
          // return self.authenticate(socialToken)
        }
        // return console.log('FB social token not found.', response)
      });
    }, false);

  },

  data() {
    return {
      slides: [{
          title: 'Get started',
          description: 'Access your personal feed of companies, jobs and internships tailored to your skills and interests.',
          image: '/img/illustrations/undraw_hire_te5y.svg'
        },
        {
          title: 'Get free coffee',
          description: ' If a company finds you a perfect match, you receive a cup of coffee to redeem at your local coffeeplace. Enjoy it while you explore the match.',
          image: '/img/illustrations/undraw_coffee_break_j3of.svg'
        },
        {
          title: 'Meet and connect',
          description: 'Well done! The company now has you on their radar and will reach out to you with relevant jobs, internships and special events.',
          image: '/img/illustrations/undraw_winners_ao2o.svg'
        },
      ]
    }
  },
  methods: {
    authenticate(socialToken, pictureUrl) {
      this.$http.post('/v1/auth/facebook', {
          socialToken,
          pictureUrl
        })
        .then(resp => {
          console.log('User authenticated on server via Facebook social token.', resp)
          if (resp.data.success === true) {
            this.$store.commit('setToken', resp.data.token)
            this.$store.commit('setUser', resp.data.user)

            // reroute user to the feed and indicate that it's a new user signup with email
            if (resp.data.newUser) {
              return this.$router.push({name: 'feed', params: { newUser: true, signupType: 'facebook' }})
            }
            return this.$router.push({name: 'feed', params: { isLogin: true }})
          }
        })
        .catch(err => {
          alert('An error happened and the user could not be authenticated. Please try again.')
        })
    },
    initializeSlides() {
      var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        }
      })
    },
    facebookLogin() {
      const self = this

      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information...')
        }
        const socialToken = response.authResponse.accessToken
        FB.api('/me?fields=picture.width(480).height(480),name', response => {
          // console.log('Response', response)
          // console.log('Good to see you, ', response.name)
          const picture = response.picture ? response.picture.data.url : null
          if (socialToken) {
            self.authenticate(socialToken, picture)
          }
        })
      }, {
        scope: 'email'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.swiper-container {
  width: 100%;
  height: 55vh;

  .swiper-content {
    text-align: center;
    width: 80%;
    padding: 5vh;
    padding-top: 10px;

    img {
      width: 80%;
    }

    p.header {
      font-weight: 500;
      font-size: 30px;
    }
  }
}

.nav-header {
  width: 100%;
  text-align: center;

  img {
    width: 15%;
    margin-top: 10px;
  }
}

.onboarding-actions {
  text-align: center;
}
</style>
