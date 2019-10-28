import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Dashboard from './views/Dashboard.vue'
import Campaigns from './views/Campaigns.vue'
import CampaignBuilder from './views/CampaignBuilder.vue'
import Settings from './views/Settings.vue'
import CompanyProfile from './views/CompanyProfile.vue'
import Events from './views/Events.vue'
import Jobs from './views/Jobs.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import store from './store'
import ValidateToken from './views/ValidateToken.vue'
import Vendor from './views/Vendor.vue'
import Leads from './views/Leads.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

//REMEMBER when you add a new route here. Create and import the routes view and add it the layout view.


const router = new Router({
  routes: [{
      path: '/login',
      name: "login",
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/register',
      name: "register",
      component: Register,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/validate',
      name: "validate",
      component: ValidateToken,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/',
      component: Layout,
      children: [{
          path: '/',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/campaigns',
          name: 'campaigns',
          component: Campaigns
        },
        {
          path: '/companyProfile',
          name: 'companyProfile',
          component: CompanyProfile
        },
        {
          path: '/events',
          name: 'events',
          component: Events
        },
        {
          path: '/job',
          name: 'Job posts',
          component: Jobs
        },
        {
          path: '/campaigns/edit/:id',
          name: 'edit',
          component: CampaignBuilder
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: '/vendor',
          name: 'vendor',
          component: Vendor
        },
        {
          path: '/leads',
          name: 'leads',
          component: Leads
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin
        }

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.state.auth.token

  if (!token && !to.meta.isPublic) {
    return next({
      name: 'login'
    })
  }

  // attach token to axios header if not there
  if (!Vue.prototype.$http.defaults.headers.common['Authorization']) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  next()
})

// EDIT: DISABLE warning because campaign is saved in store now.
//
// Warn the user if they want to abandon the campaign builder with unsaved changes
// router.beforeEach((to, from, next) => {
//   if (from.name === 'edit') {
//     const answer = window.confirm('It looks like you have unsaved changes! Are you sure you want to leave?')
//     answer ? next() : next(false)
//   } else {
//     next()
//   }
// })

export default router
