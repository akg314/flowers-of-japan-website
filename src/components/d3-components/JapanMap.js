// reusuable component that takes the given length and width
// and color to draw borders and draws a Japan map

// also exposes projection for use outside component

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
        
module.exports = {
    JapanMap
    getProjection
}