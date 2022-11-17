<template>
  <div id="app" style="width: 1400px">
      <nav class="navbar sticky-top navbar-dark bg-dark" style="padding-top: 1px; padding-bottom: 1px; margin-bottom: 5px;">
          <div style="margin-top:5px; margin-left: 5px;">
              <span style="color:white; font-size:1.25rem; font-weight:500; user-select: none">Urban Traffic Mobility Analysis</span>
          </div>
      </nav>
      <div class="container-fluid" style="padding-left: 5px; padding-right: 5px">
          <div class="row" style="margin-left: 10px; margin-right: 10px">
              <div class="col-3 content" style="padding-left: 3px; padding-right: 3px">
                  <RelationView></RelationView>
              </div>
              <div class="col-6 content" style="padding-left: 3px; padding-right: 3px">
                <MapView></MapView>
              </div>
              <div class="col-3 content" style="padding-left: 3px; padding-right: 3px">
                <SummaryView></SummaryView>
              </div>
          </div>
      </div>
      <div class="container-fluid" style="padding-left: 5px; padding-right: 5px">
          <div class="row" style="margin-left: 10px; margin-right: 10px">
              <div class="col-3 content" style="padding-left: 3px; padding-right: 3px">
                <FeatureView></FeatureView>
              </div>
              <div class="col-9 content" style="padding-left: 3px; padding-right: 3px">
                <MobilityView></MobilityView>
              </div>
          </div>
      </div>             
  </div>
</template>

<script>
// import dataService from './service/dataService.js'
/* global d3 */

import MapView from './components/MapView/MapView.vue'
import FeatureView from './components/FeatureView/FeatureView.vue'
import MobilityView from './components/MobilityView/MobilityView.vue'
import RelationView from './components/RelationView/RelationView.vue'
import SummaryView from "./components/SummaryView/SummaryView.vue";

export default {
  name: 'app',
  components: {
      MapView,
      FeatureView,
      MobilityView,
      RelationView,
      SummaryView
},
  data() {
    return {
        plateList: ['粤E-EN697', '粤Y-758J6', '粤Y-QF371', '粤Y-UN571', '粤Y-XR751'],
        dateList: d3.range(1, 31, 1).map((d) => `2020-11-${d.toString().padStart(2, '0')}`),
        // taxiGPSData: {}
    }
  },
  mounted: function () {
    console.log('d3: ', d3) /* eslint-disable-line */
    console.log('$: ', $) /* eslint-disable-line */
    console.log('_', _.partition([1, 2, 3, 4], n => n % 2)) /* eslint-disable-line */

    // this.$nextTick(() => {
     
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 100%;
  padding: 5px 5px 5px 5px;
}

.content {
  padding: 2px 2px 2px 2px;
}

footer {
  margin-left: 5px;
}
</style>
