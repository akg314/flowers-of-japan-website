<template>
  <div class='row'>
    <div class='col-md-12 medianChartContainer'></div>
  </div>
</template>

<script>
const JapanMap = require('d3-components/JapanMap') // TO DO: fix
import * as d3 from 'd3';
export default {
  name: 'MedianChartCard',
  data() {
    return {
      japan: {},
      yearlydata: {},
      locations: {}
    }
  },
  mounted() {
    // TO DO: how to fetch local resources using d3@v5
    var promises = [
    	d3.json('../static/japan.json'),
      d3.csvParse('../static/yearlydata.csv') // add date parsing,
    	d3.csvParse('../static/locations.csv') // add col type parsing
    ];
    // TO DO await all at once execute code
    Promise.all(promises).then(
      try {
        res =>
        {
          this.japan = responses[0];
          this.yearlydata = responses[1];
          this.locations = responses[2];
          this.drawChart();
        }
      catch {

      }   
    );
  },
  methods: {
    drawChart: function () {
      // setup drawing canvas
      const margin = { top: 0, left: 0, right: 0, bottom: 0},
      height = 800 - margin.top - margin.bottom,
      width = 1000 - margin.left - margin.right;

      const svg = d3.select('#medianChartContainer')
      	.insert('svg')
      	.attr('height',height + margin.top + margin.bottom)
      	.attr('width', width + margin.left + margin.right)
        .append('g')
        
      // date scale
      const x = d3.scaleDate()
        .domain(d3.extent(this.yearlydata.map(d => d.b_date)));

      // year scale
      const y = d3.scaleLinear()
        .range(height, 0)
        .domain(d3.extent(this.yearlydata.map(d=>d.year)));

      // location color scale based on longititude
      // TO DO: choose correct scale, color palette for said scale
      const longColors = d3.scaleContinuous()
        .domain(d3.extent(this.yeardata.map(d=>d.lon))

      // append axes to chart
      // add the x axis
			svg.append('g')
				.attr('transform', `translate(0, ${this.chartHeight})`)
				.call(
          d3.axisBottom(x)
			    .tickFormat(d3.timeFormat('%b %d'))
					.ticks(7)
			  )
			// add the y Axis
			svg.append('g')
				.attr('transform', 'translate(0,0)')
				.call(d3.axisLeft(y))

      // create groups for each year
      const yearGroups = svg.selectAll('.yearGroups')
        .data(
          d3.nest()
            .key(d => d.year)
            // make sure this works without rollup functions
            .data(this.yearlydata)
        )
        .enter().append('g')
        .attr('y',y(d.key))
      
      // append circles within each year group for each location
      yearGroups.selectAll('.chartLocationCircles')
        .enter().append('circle')
        .data(d => d.values)
        .attr('class','chartLocationCircles')
				.style('font-size','12pt')
				.attr('x', x(d.f_date))
        .style('fill', d => longColors(d.lon))
      
      // import Map d3 component
      // following must be accessible within this component
      // jpMap.projection
      // jpMap.drawMap(width,height)
      let miniMap = JapanMap(width=100,height=height)
      const locationCircles = miniMap.selectAll('.mapLocationCircles')
        .data(this.locations)
        .enter().append('circle')
          .attr('class','.mapLocationCircles')
          .attr('r',10)
          .attr('cx',function(d) {
            return miniMap.projection([d.lon,d.lat])[0]
          })
          .attr('cy',function(d) {
            return miniMap.projection([d.lon,d.lat])[1]
          })
          .attr('fill',longColors(d.lon))
        
      // create minimap
  }
 }
</script>