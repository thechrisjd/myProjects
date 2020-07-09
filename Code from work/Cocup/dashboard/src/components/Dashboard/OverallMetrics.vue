<template>
  <v-container>
    <h3 class="header">Overall Metrics</h3>
    <v-layout row wrap justify-start>
      <v-flex xs6>
        <v-layout column>
          <v-card class="rounded-card ma-2">
            <div class="blankSpace"></div>
            <i id="leads" class="material-icons">account_box</i>
            <div class="name">Leads</div>
            <div class="title">
              <!-- <small style="font-size: 12px;top: -15px;position: relative;">Coming soon</small> -->
              {{kFormatter(overallMetricsData.leads)}}
            </div>
          </v-card>
          <v-card class="rounded-card ma-2  disabled">
            <div class="blankSpace"></div>
            <i id="favorites" class="material-icons">favorite_border</i>
            <div class="name">Favorites</div>
            <div class="title">
              <small style="font-size: 12px;top: -15px;position: relative;">Coming soon</small>
              <!-- {{kFormatter(overallMetricsData.favorites)}} -->
              </div>
          </v-card>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-layout column>
          <v-card class="rounded-card ma-2">
            <div class="blankSpace"></div>
            <i id="views" class="material-icons">visibility</i>
            <div class="name">Views</div>
            <div class="title" id="value">
              {{kFormatter(overallMetricsData.views)}}
            </div>
          </v-card>
          <v-card class="rounded-card ma-2">
            <div class="blankSpace"></div>
            <i id="clicks" class="material-icons">touch_app</i>
            <div class="name">Clicks</div>
            <div class="title">
              <!-- <small style="font-size: 12px;top: -15px;position: relative;">Coming soon</small> -->
              {{kFormatter(overallMetricsData.clicks)}}
              </div>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    overallMetricsData: {
      type: Object,
      default: {
        views: 0,
        clicks: 0,
        favourites: 0,
        leads: 0,
      }
    }
  },
  watch: {
    overallMetricsData: function (newVal) {
      // this.animateValue('value')
    }
  },
  methods: {
    kFormatter(num) {
      if (!num) {
        return 0
      }
      return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    },
    // animateValue(id) {
    //   const self = this
    //   const duration = 10
    //   const start = 0
    //   var obj = document.getElementById(id);
    //   let end = obj.innerHTML
    //   var range = end - start;
    //   console.log('range, ', end)
    //   var current = start;
    //   var increment = end > start ? 1 : -1;
    //   var stepTime = Math.abs(Math.floor(duration / range));
      
    //   var timer = setInterval(function () {
    //     current += increment;
    //     obj.innerHTML = self.kFormatter(current);
    //     if (current == end) {
    //       clearInterval(timer);
    //     }
    //   }, stepTime);
    // }
  }
};
</script>

<style scoped>
#leads {
  color: #26c6da;
  font-size: 2em
}
#favorites {
  color: #e91e63;
  font-size: 2em
}
#views {
  color: #c0ca33;
  font-size: 2em
}
#clicks {
  color: #ffcc80;
  font-size: 2em
}
.header { 
  text-align: center;
  font-size: 1.7em
}
.rounded-card {
  text-align: center;
  font-size: 1.5em;
  
}
.blankSpace {
  height: 0.55em;
  /* margin-bottom: 2em */
}
.container{
  margin: 0;
}

.name{
  padding-bottom: 0.23em;
  font-size: 1em;
}
.title{
  font-size: 1.1em !important;
  margin-bottom: 3%;
}

.disabled {
  opacity: 0.5;
}

</style>
