const d3 = require("d3");

export const JapanMap = () => {
    var height = 400,width=400, // default width
    scale=1200,
    margin = {top: 20, right: 20, bottom: 20, left: 20},
    projection  = d3.geoMercator()
                .center([142,42])
                .scale(scale)
                .translate([width / 1.3 , height / 4]);

    function my(selection) {
      selection.call(function(selection) {
          // inside here, d is the current data item, i is its index.
          // "this" is the element that has been appended, in the case of
          // this example, a svg:g
  
          // convert element (svg:g) into something that D3 can use
          // element is a single-element selection
          
          const path = d3.geoPath().projection(projection)// Japan svg map
  
          let chartHeight = height - margin.top - margin.bottom,
          chartWidth = width - margin.left - margin.right;
        
          const canvas = selection.append("svg")
            .attr("height",chartHeight + margin.top + margin.bottom)
            .attr("width", chartWidth + margin.left + margin.right)
     
          //Bind to DOM
          canvas.selectAll('.feat')
            .data(d => d.features)
            .enter().append('path')
            .attr('class','feat')
            .attr('d',path)
            .attr('fill', 'black')
      })
      
    }
  
    my.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return my;
    };

    my.scale = function(value) {
        if (!arguments.length) return scale;
        scale = value;
        return my;
      };
  
    my.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return my;
    };
    // not setting, only getting
    my.projection = function() { 
        return projection
    }
  
    return my;
  }