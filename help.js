

      var margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      };
      var h = innerHeight-margin.top-margin.bottom;
      var w = innerWidth - margin.left-margin.right;

      var svg = d3.select("main")
                  .append("svg")
                  .attr("height", h)
                  .attr("width", w);
      d3.json("data/geojson/world.json").then(function(world) {
      d3.csv("data/seven-modern-wonders.csv").then(function(modern) {
      d3.csv("data/seven-ancient-wonders.csv").then(function(ancient) {

        // var world_features = world.features;
        // data.forEach(function(d){
        //   var t_state = d.state;
        //   var t_value = +d.veteran_pct;
        //   world_features.forEach(function(u){
        //     var world_state = u.properties.name;
        //     if (world_state == t_state){
        //       u.properties.value = t_value;
        //     }
        //   })
        // });
        console.log(world);

        // var ancientNames =

        var projection = d3.geoMercator()
                           .translate([w/1.5,h/2])
                           .scale(400);
        var path = d3.geoPath()
                     .projection(projection);
        var map = svg.append("g")
                     .attr("id", "map")
        map.selectAll("path")
           .data(world.features)
           .enter()
           .append("path")
           //.attr("id", "conn")
           .attr("d", path)
           .attr("fill", "steelblue")
           .attr("stroke", "white")
           .attr("stroke-width", "2px");


        var plotsAncient = map.selectAll("circle")
                       .data(ancient)
                       .enter()
                       .append("circle")
                       .attr("class", "points")
                       .attr("cx", function(d) {
                         return projection([+d.longitude,+d.latitude])[0];
                       })
                       .attr("cy", function(d) {
                         return projection([+d.longitude,+d.latitude])[1];
                       })
                       .attr("fill", "red")
                       .attr("r", "5px")
                       .on("mouseover", function(d) {
                      //   d3.select(this).attr("fill", "black");
                          d3.select(".tooltip").classed("hidden",false)

                       })
                       .on("mousemove", function(d) {
                         var currentX = d3.event.pageX + 10;
                         var currentY = d3.event.pageY + 10;
                         d3.select(".tooltip")
                           .style("left",currentX + "px")
                           .style("top",currentY + "px")
                           .html("<p>Name: " + d.wonder + "<br/>" +
                                 "Years Constructed: " + d.constructed + "</p>");
                       })
                       .on("mouseout", function(d) {
                      //   d3.select(this).attr("fill", "red");
                          d3.select(".tooltip").classed("hidden",true);
                       });


        d3.select(".buttonAncient")
          .on("click", function() {
            map.selectAll(".points")
            .data(ancient)
            .transition()
            .duration(1500)
            .attr("cx", function(d) {
              return projection([+d.longitude,+d.latitude])[0];
            })
            .attr("cy", function(d) {
              return projection([+d.longitude,+d.latitude])[1];
            });
          })
          d3.select(".buttonModern")
            .on("click", function() {
              map.selectAll(".points")
              .data(modern)
              .transition()
              .duration(1500)
              .attr("cx", function(d) {
                return projection([+d.longitude,+d.latitude])[0];
              })
              .attr("cy", function(d) {
                return projection([+d.longitude,+d.latitude])[1];
              });
            })

        // var plotsModern = map.selectAll("circle")
        //                .data(modern)
        //                .enter()
        //                .append("circle")
        //                .attr("cx", function(d) {
        //                  return projection([+d.longitude,+d.latitude])[0];
        //                })
        //                .attr("cy", function(d) {
        //                  return projection([+d.longitude,+d.latitude])[1];
        //                })
        //                .attr("fill", "red")
        //                .attr("r", "3px");
      })
      })
      })
    
