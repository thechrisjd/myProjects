import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

import Terms from './views/Terms.vue'

import Onboarding from './views/Onboarding.vue'
// import OnboardingWelcome from './components/Onboarding/Welcome.vue'
// import OnboardingLogin from './components/Onboarding/Login.vue'
// import OnboardingEmail from './components/Onboarding/Email.vue'
// import OnboardingSignUp from './components/Onboarding/SignUp.vue'
// import OnboardingEnterName from './components/Onboarding/EnterName.vue'
import OnboardingResetPassword from './components/Onboarding/ResetPassword.vue'
import OnboardingCreateNewPassword from './components/Onboarding/CreateNewPassword.vue'

//import ProfileIntro from './components/ProfileIntro/ProfileIntro.vue'

import CoffeeTokenInfo from './components/Coffee/TokenInfo.vue'
import CoffeeTokenRedeem from './components/Coffee/TokenRedeem.vue'
import CoffeeTokenRedeemSuccess from './components/Coffee/TokenRedeemSuccess.vue'


// import Profile from './views/Profile.vue'
import Coffee from './components/Coffee/CoffeeList.vue'
import Share from './components/Share/Share.vue'

import Home from './views/Home.vue'
import Feed from './components/Feed/Feed.vue'
import FeedCompanies from './components/Feed/Companies/FeedCompanies.vue'
import FeedEvents from './components/Feed/FeedEvents.vue'
import Favourites from './components/Favorites/Favourites.vue'

import Welcome from './components/Authentication/Welcome.vue'
import Login from './components/Authentication/Login.vue'
// import Signup from './components/Authentication/Signup.vue'
import SignupForm from './components/Authentication/SignupForm.vue'

import ProfileSetup from './views/ProfileSetup.vue'
import ProfileSetupIntro from './components/ProfileSetup/ProfileSetupIntro.vue'
import ProfileSetupLocation from './components/ProfileSetup/ProfileSetupLocation.vue'
import ProfileSetupJobType from './components/ProfileSetup/ProfileSetupJobType.vue'
//import ProfileSetupCompetences from './components/ProfileSetup/ProfileSetupCompetences.vue'
import ProfileSetupIndustries from './components/ProfileSetup/ProfileSetupIndustries.vue'
import ProfileSetupLanguages from './components/ProfileSetup/ProfileSetupLanguages.vue'

import Profile from './components/Profile/Profile.vue'

// import ProfileEditor from './components/Profile/Editor/Editor.vue'
// import ProfileEditorBio from './components/Profile/Editor/EditorBio.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Feed',
          component: Feed,
        },
        {
          path: '/companies',
          component: FeedCompanies,
        },
        {
          path: '/events',
          component: FeedEvents,
        },
        {
          path: '/favourites',
          component: Favourites,
        },
        {
          path: '/coffee',
          component: Coffee,
        },
        {
          path: '/share',
          component: Share,
        },
        {
          path: '/profile',
          component: Profile,
        },
      ]
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
      meta: {
        isPublic: true
      },
    },
    {
      path: '/welcome',
      component: Onboarding,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome,
          meta: {
            isPublic: true
          },
        },
        {
          path: '/login',
          component: Login,
          meta: {
            isPublic: true
          },
        },
        // {
        //   path: '/signup',
        //   component: Signup,
        //   meta: {
        //     isPublic: true
        //   },
        // },
        {
          path: '/form',
          component: SignupForm,
          meta: {
            isPublic: true
          },
        },
        {
          path: '/reset-password/reset',
          name: 'resetPassword',
          component: OnboardingResetPassword,
          meta: {
            isPublic: true
          },
        },
        {
          path: '/reset-password/create',
          name: 'createNewPassword',
          component: OnboardingCreateNewPassword,
          meta: {
            isPublic: true
          },
        }
      ]
    },
    {
      path: '/profile/setup',
      component: ProfileSetup,
      children: [
        {
          path: '',
          component: ProfileSetupIntro
        },
        {
          path: 'location',
          component: ProfileSetupLocation
        },
        {
          path: 'type',
          component: ProfileSetupJobType
        },
        // {
        //   path: 'competences',
        //   component: ProfileSetupCompetences
        // },
        {
          path: 'industries',
          component: ProfileSetupIndustries
        },
        {
          path: 'languages',
          component: ProfileSetupLanguages
        },
      ]
    },
    // {
    //   path: '/profile/edit',
    //   component: ProfileEditor,
    //   children: [
    //     // {
    //     //   path: 'bio',
    //     //   component: ProfileEditorBio
    //     // },
    //     // {
    //     //   path: 'languages',
    //     //   component: ProfileEditorBio
    //     // },
    //   ]
    // },
    {
      path: '/coffee-match/info',
      name: 'info',
      component: CoffeeTokenInfo
    },
    {
      path: '/coffee-match/redeem',
      name: 'redeem',
      component: CoffeeTokenRedeem
    },
    {
      path: '/coffee-match/success',
      name: 'success',
      component: CoffeeTokenRedeemSuccess
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.state.auth.token

  if (!token && !to.meta.isPublic) {
    return next({
      name: 'welcome'
    })
  }

  // attach token to axios header if not there
  if (!Vue.prototype.$http.defaults.headers.common['Authorization']) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  next()
})

router.beforeEach((to, from, next) => {
  const token = store.state.auth.token

  if (!to.meta.isPublic && !token) {
    return next({
      name: 'welcome'
    })
  }

  next()
})

export default router;
