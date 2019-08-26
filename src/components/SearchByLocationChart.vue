<template>
  <div class="row">
    <div class='col-9 map'>
      <div class='col-12 searchBar'>
        <div class="input-group input-group-sm mb-3">
          <input value='search by city...' type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
      </div>
      <div class='mapContainer'></div>
    </div>
    <div class='col-3 locationInfo'>
      <!--location info box here-->
    </div>
  </div>
</template>

<script>
import JapanMap from 'd3-components/JapanMap'
import * as d3 from 'd3'
const locationTravelInfo = '../static/locationTravelInfo.json'
 
export default {
  name: 'SearchByLocationChart',
  data() {
    return {
      locations: {},
      selectedLocation: 'Osaka',
      selectedLocationInfo: {}
    }
  },
  
  mounted() {
    let component = this
    //load locations data; TO DO: FIX SYNTAX
    this.locations = await d3.csv('../static/geocoded_locations.csv');
    component.initializeChart()
  },
  methods: {
    updateSelectedLocation: function () {
      d3.select('JapanMap')
        

      // select jp map by class, change this.selectedLocation
      // change info in location info container
      this.selectedLocationInfo = locationTravelInfo.filter(
        d => d.romaji == this.selectedLocation
      )
    },
    initializeChart: function () {
      // draw Japan Map
      // highlight this.selectedLocation
      JapanMap() // TO DO: call with appropriate width and height
      updateSelectedLocation()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
