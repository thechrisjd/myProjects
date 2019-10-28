<template>
  <v-app :dark="dark">
    <v-navigation-drawer v-model="primaryDrawer.model" absolute overflow app width="200">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Application
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in navItems" :key="item.title" @click="$router.push(item.link)" ripple :class="{'primary--text': $route.path === item.link}"
          :disabled="isVendor && item.title !=='Vendor'" :inactive="!isVendor && item.title ==='Vendor'">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon v-if="primaryDrawer.type !== 'permanent'" @click.stop="primaryDrawer.model = !primaryDrawer.model"></v-toolbar-side-icon>
      <v-toolbar-title href="/">COCUP Business</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn slot="activator" icon>
            <v-icon>account_circle</v-icon>
          </v-btn>

          <v-list>
            <v-list-tile>
              <v-list-tile-content class="pb-2">
                <v-list-tile-title v-html="'Signed in as'"></v-list-tile-title>
                <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile @click="$router.push('/settings')">
              <v-icon left> settings </v-icon>
              Settings
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile @click="logout">
              <v-icon left> exit_to_app </v-icon>
              Sign out
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>

    <v-snackbar v-model="notification.active" ref="layout">
      {{ notification.text }}
      <v-btn color="pink" flat @click="notification.active = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-footer app absolute inset>
      <v-spacer></v-spacer>
      <span class="px-3">COCUP &copy; {{ new Date().getFullYear() }} - v0.3.4</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    created() {
      this.isVendor = this.$store.state.user.type === 'vendor'
      this.isAdmin = this.$store.state.user.type === 'admin'
      this.user = this.$store.state.user
      this.setNavItems()
    },
    data: () => ({
      isVendor: 'false',
      isAdmin : 'false',
      dark: false,
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: true,
      },
      notification: {
        active: false,
        text: ''
      },
      user: {},
      navItems: [],
      title : 'false'
    }),
    methods: {
      setNavItems() {
        if (this.isVendor) {
          this.navItems = [{
            title: 'Vendor',
            icon: 'trending_up',
            link: '/vendor'
          }]
        } else if (this.isAdmin) {
          this.navItems = [{
            title: 'User Statistics',
            icon: 'trending_up',
            link: '/admin'
          }, {
            title: 'Company info',
            icon: 'view_list',
            link: '/admin'
          }, {
            title: 'Vendor info',
            icon: 'view_list',
            link: '/admin'
          }, {
            title: 'Job info',
            icon: 'view_list',
            link: '/admin'
          },  {
            title: 'Event info',
            icon: 'view_list',
            link: '/admin'
          }]
        } else {
          this.navItems = [{
              title: 'Dashboard',
              icon: 'dashboard',
              link: '/'
            },
            {
              title: 'Campaigns',
              icon: 'view_list',
              link: '/campaigns'
            },
            {
              title: 'Jobs',
              icon: 'view_list',
              link: '/job'
            },
            {
              title: 'Events',
              icon: 'view_list',
              link: '/events'
            },
            {
              title: 'Your profile',
              icon: 'view_list',
              link: '/companyProfile'
            },
            {
              title: 'Leads',
              icon: 'how_to_reg',
              link: '/leads'
            },
            {
              title: 'Settings',
              icon: 'settings',
              link: '/settings'
            },

          ]
        }

      },
      logout() {
        this.$store.commit('logout')
        this.$router.push('/login')
        window.location.reload(false) // reload page to clear vuex
      },
      notify(message) {
        console.log('notifying')
        this.notification.text = message
        this.notification.active = true
      }
    }
  }
</script>

<style lang="scss" scoped>

.v-navigation-drawer{
  width: 200px !important;
}

.v-content{
  padding-left: 500px;
}

</style>
