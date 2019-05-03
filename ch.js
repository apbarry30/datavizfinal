

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
      d3.json("data/geojson/us-states.json").then(function(us) {
        d3.csv("data/united-states-veterans.csv").then(function(data) {
        var us_features = us.features;
        data.forEach(function(d){
          var t_state = d.state;
          var t_value = +d.veteran_pct;
          us_features.forEach(function(u){
            var us_state = u.properties.name;
            if (us_state == t_state){
              u.properties.value = t_value;
            }
          })
        });
        console.log(us);
        var col_arr = d3.schemeAccent;
        var color = d3.scaleQuantize()
                      .domain(d3.extent(data, function(d) {
                        return +d.veteran_pct;
                      }))
                      .range(col_arr);
        var projection = d3.geoAlbersUsa()
                           .translate([w/2,h/2])
                           .scale(1400);
        var path = d3.geoPath()
                     .projection(projection);
        var map = svg.append("g")
                     .attr("id", "map")
        map.selectAll("path")
           .data(us.features)
           .enter()
           .append("path")
           //.attr("id", "conn")
           .attr("d", path)
           .attr("fill", function(d) {
             var value = d.properties.value;
             console.log(value,color(value));
             if (value) {
               return color(value);
             } else {
               return "#ccc";
             }
           })
           .attr("stroke", "white")
           .attr("stroke-width", "2px")

       var legend = svg.append("g");
       legend.selectAll("rect")
             .data(col_arr)
             .enter()
             .append("rect")
             .attr("x",function(d,i){
               return i*60+w/2;
             })
             .attr("y",20)
             .attr("width",60)
             .attr("height",45)
             .attr("fill",function(d){
               return d;
             })
       var max_val = d3.max(data,function(d){
         return +d.veteran_pct;
        })
       var min_val = d3.min(data,function(d){
         return +d.veteran_pct;
        })
       var interval = (max_val-min_val)/5;
       legend.selectAll("text")
             .data(col_arr)
             .enter()
             .append("text")
             .attr("class","leg_text")
             .attr("x",function(d,i){
               return i*60+w/2;
             })
             .attr("y",45)
             .attr("dx","0.3em")
             .text(function(d,i){
               var current_value = min_val+(i*interval);
               return current_value.toFixed(1) + "%";
             })
      })
      })

    
