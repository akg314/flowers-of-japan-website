<template>
  <div class="row">
    <div class='col-8 map'>
      <div class='col-12 searchBar'>
        <autocomplete 
        v-if='locations!=null'
        @input="updateSelectedLocation"
        :items="locations.map(d=>d.romaji)"></autocomplete>
      </div>
      <div id='locationMapContainer'></div>
    </div>
    <div class='col-4'>
      <!--should take selected location as prop-->
      <location-info-box :location='selectedLocation'></location-info-box>
    </div>
  </div>
</template>

<script>
import { JapanMap } from './d3-components/MapOfJapan';
import Autocomplete from './helper-components/Autocomplete'
import LocationInfoBox from './LocationDetails/LocationInfoBox'

import * as d3 from 'd3'
 
export default {
  name: 'SearchByLocationChart',
  data() {
    return {
      locations: null,
      japan: {},
      selectedLocation: 'Osaka',
      selectedLocationInfo: {},
      locationInfoStats: {},
      projection: null
    }
  },
  components: {
    LocationInfoBox, Autocomplete
  },
  mounted() {
    (async() => {
      this.locationInfoStats  = await d3.json('/locationTravelInfo.json')
      this.locations = await d3.json('/locations.json')
      this.japan = await d3.json('/japan.geojson')
      this.initializeChart();
    })();
  },
  methods: {
    // TODO: non selected locations should exit
    updateSelectedLocation (results) {
        console.log(results)

        const isSelected = (romaji,results) => results.indexOf(romaji) > -1
        const mapContainer = d3.select('#locationMapContainer')
        mapContainer.select('svg').selectAll('.mapLocationCircles')
            .attr('fill', d => 
              isSelected(d.romaji,results) ? "orange" : 'grey'
            )
            .attr('r',
              d => isSelected(d.romaji,results) ? 10 : 1)
        this.selectedLocation = results[0]
    },
    initializeChart: function () {
      // draw Japan Map
      // highlight this.selectedLocation
      const mapContainer = d3.select('#locationMapContainer')
      mapContainer
        .datum(this.japan)
          .call(JapanMap())
      this.projection = JapanMap().projection()
      mapContainer.select('svg').selectAll('.mapLocationCircles')
          .data(this.locations)
            .enter().append('circle')
            .attr('class','mapLocationCircles')
            .attr('r',2)
            .attr('cx', d => this.projection([d.lon,d.lat])[0])
            .attr('cy', d => this.projection([d.lon,d.lat])[1])
            .attr('fill','grey')
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
