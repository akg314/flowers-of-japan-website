<template>
  <div class='row'>
    <div class='col-9' id='medianChartContainer'></div>
    <div class='col-3' id='mapContainer'></div>
    <div class="col-12">
       Flowers are blooming earlier and earlier every year....
    </div>
  </div>
</template>

<script>
import { JapanMap } from './d3-components/MapOfJapan';

const d3 = require("d3");
export default {
  name: 'MedianChartCard',
  data() {
    return {
      rawjp: {},
      japan: {},
      yearlydata: {},
      locations: {}
    }
  },
  mounted() {
    (async() => {
      this.japan  = await d3.json('/japan.geojson')
      this.yearlydata = await d3.json('/yearlydata.json')
      this.locations = await d3.json('/locations.json')
      this.drawChart();
    })();
  },
  methods: {
    drawChart: function () {
      // setup drawing canvas
      const margin = { top: 20, left: 50, right: 50, bottom: 60},
      height = 600 - margin.top - margin.bottom,
      width = 700 - margin.left - margin.right;

      const svg = d3.select('#medianChartContainer')
      	.insert('svg')
          .attr('height',height + margin.top + margin.bottom)
          .attr('width', width + margin.left + margin.right)
            .append('g')
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
      // date scale
      const parseDate = d3.timeParse('%Y-%m-%d')
      const x = d3.scaleTime()
      // TO DO: fix, this doesn't work as intended with dates
        .domain(d3.extent(this.yearlydata.map(d => parseDate(d.b_daymonth))))
        .range([0,width])
      console.log(x)
      // year scale
      
      const y = d3.scalePoint()
        .domain(this.yearlydata.map(d=>d.year.toString()).reverse())
        .range([height, 0]);

      console.log(y)
      // location color scale based on longititude
      // ENHANCE: better palette
      const longColors = d3.scaleSequential(d3.interpolateRainbow)
        .domain(d3.extent(this.yearlydata.map(d=> d.lon).filter(d => d > -80)))
      
      console.log(longColors)

      // append axes to chart
      // add the x axis
      svg.append('g')
        .attr('class','xAxis')
				.attr('transform', `translate(0,${height})`)
				.call(
          d3.axisBottom(x)
			    .tickFormat(d3.timeFormat('%b %d'))
					.ticks(8)
			  )
      // add the y Axis
      const filteredYearTicks = y.domain().filter((d,i) => !(i%5) );

      svg.append('g')
        .attr('class','yAxis')
				.attr('transform', 'translate(0,0)')
        .call(
          d3.axisLeft(y)
          .tickValues(filteredYearTicks)
        )

      console.log(          
        d3.nest()
          .key(d=> d.year.toString())
          .entries(this.yearlydata)
      )
      // create groups for each year
      const yearGroups = svg.selectAll('.yearGroups')
        .data(
          d3.nest()
            .key(d => d.year)
            .entries(this.yearlydata)
        )
        .enter().append('g')
          .attr('class','yearGroups')
          .attr('transform',d => `translate(0, ${y(d.key.toString())})`)
     

      // append circles within each year group for each location
      // TO DO: change to color gradient
      yearGroups.each((d,i,nodes) => {
          d3.select(nodes[i]).selectAll('.chartLocationCircles')
            .data(d=>d.values)
            .enter()
              .append('circle')
                .attr('class','chartLocationCircles')
                .attr('cx', d => x(parseDate(d.b_daymonth)))
                .attr('cy',0)
                .attr('r',2)
                .style('fill', d => !isNaN(d.lon) ? longColors(d.lon) : "white")  
      })
      console.log(this.japan)
        
      const mapContainer = d3.select('#mapContainer')
      
      mapContainer
        .datum(this.japan)
          .call(JapanMap())
          
      const jpProjection = JapanMap().projection()
      mapContainer.select('svg').selectAll('.mapLocationCircles')
        .data(this.locations)
          .enter().append('circle')
            .attr('class','.mapLocationCircles')
            .attr('r',3)
            .attr('cx', d => jpProjection([d.lon,d.lat])[0])
            .attr('cy', d => jpProjection([d.lon,d.lat])[1])
            .attr('fill', d => longColors(d.lon))

  }
 }
}
</script>
