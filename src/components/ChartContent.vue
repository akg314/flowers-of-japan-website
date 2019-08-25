<template>
  <div class="row contentRow">
    <!--chart container-->
    <div class='col-12 searchBar'>
      <div class="input-group input-group-sm mb-3">
        <input value='search by city...' type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
      </div>
    </div>
    <div class="col-12">
      <div class='col-12'>
        <MapInfoContainer style='position:absolute'></MapInfoContainer>
        <div id="mapContainer" style='position:absolute'></div>
      </div>
    </div>
  </div>
</template>

<script>

import MapInfoContainer from './ChartContent/MapInfoContainer.vue'
import * as d3 from 'd3'
 
export default {
  name: 'ChartContent',
  components: {
    MapInfoContainer
  },
  data() {
    return {
      japan: {},
      locations: [1,2]
    }
  },
  
  mounted() {
    let component = this
    var promises = [
    	//d3.json('../static/japan.json'),
    	d3.csv('../static/geocoded_locations.csv')
    ];
    Promise.all(promises).then(
      function(responses) {
        console.log(responses)
        // component.japan = responses[0];
        // component.locations = responses[1];
        // component.initalizeCanvas()
    }).catch(console.log('error'));
  },
  methods: {
    initalizeCanvas: function () {
      //console.log('initalizing canvas')
      var projection = d3.geoMercator()
        .center([142,41.5])
        .scale(2050)
      const path = d3.geoPath().projection(projection)// Japan svg map
      var margin = { top: 0, left: 0, right: 0, bottom: 0},
      height = 800 - margin.top - margin.bottom,
      width = 1000 - margin.left - margin.right;

      var svg = d3.select("#mapContainer")
      	.insert("svg")
      	.attr("height",height + margin.top + margin.bottom)
      	.attr("width", width + margin.left + margin.right)
      	.append("g")
    //Bind to DOM
    	svg.selectAll('.feat')
    		.data(this.japan.features)
    		.enter().append('path')
    		.attr('class','feat')
    		.attr('d',path)
        .attr('fill', 'black')
        
    // Initialize with capital cities
    
      var cities = svg.selectAll("locationsG")
        .data(this.locations)//locations.filter(function(d) {return d.lat & d.lon}))
        .enter().append("g")
      . attr('class','locationsG')
      cities
        .append('circle')
        .attr("r",10)
        .attr("cx",function(d) {
          return projection([d.lon,d.lat])[0]
        })
        .attr("cy",function(d) {
          return projection([d.lon,d.lat])[1]
        })
        .attr("fill","yellow")
        cities
          .append('text')
          .text(d => d.city)
          .attr("x",function(d) {
            return projection([d.lon,d.lat])[0]
              })
          .attr("y",function(d) {
            return projection([d.lon,d.lat])[1]
          })

      
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
