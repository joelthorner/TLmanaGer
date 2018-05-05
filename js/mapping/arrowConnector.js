function arrowConnector() {

  var svg, arrows;

  function render() {

    if(d3.select(".tlg-arrow-connector-container").empty()) {
      svg = d3.select("body").append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .classed("tlg-arrow-connector-container", true)
        .style("position", "absolute")
        .style("top", "0")
        .style("left", "0")
        .style("width", "100%")
        .style("height", "100%")
        .style("pointer-events", "none");
    } else {
      svg = d3.select(".tlg-arrow-connector-container");
    }

    arrows = svg.selectAll("line")
      .data(getTargets());

    arrows.enter()
      .append("line")
      .classed("tlg-arrow-connector", true);

    arrows
      .attr("x1", function(d) { return d[0].x })
      .attr("y1", function(d) { return d[0].y })
      .attr("x2", function(d) { return d[1].x })
      .attr("y2", function(d) { return d[1].y });
  }

  // <line class="tlg-arrow-connector" x1="1179" y1="292" x2="1129" y2="292"></line>

  function getTargets() {
    var targets = [];
    d3.selectAll("[data-arrow-target]")
      .each(function(d,i) {
        fromCorners = edgesToCorners(this);
        d3.selectAll(this.dataset.arrowTarget).each(function(dd,ii) {
          var toCorners = edgesToCorners(this);

          // check all possible combinations of eligible endpoints for the shortest distance
          var fromClosest, toClosest, distance;
          fromCorners.forEach(function(from) {
            toCorners.forEach(function(to) {
              if(distance == null || hypotenuse( to.x-from.x, to.y-from.y ) < distance) {
                distance = hypotenuse( to.x-from.x, to.y-from.y );
                fromClosest = from;
                toClosest = to;
              }
            });
          });

          targets.push([fromClosest,toClosest]);

        });
      });

    return targets;
  }

  // gets from the sides of a bounding rect (left, right, top, bottom)
  // to its corners (topleft, topright, bottomleft, bottomright)
  function edgesToCorners(element) {
    // console.log(element);
    var corners = [];
    ["left","right"].forEach(function(i) { 
      ["top","bottom"].forEach(function(j) { 
        corners.push({"x":i,"y":j}); 
      }); 
    });
      
    return corners.map(function(corner) {
      console.log($(element).parents('.tlg-block-cont').find('.tlg-svg-mask'));
      // console.log(corner.x);
      // console.log(element.getBoundingClientRect());
      // console.log(element.getBoundingClientRect()[corner.x]);

      // aqui en comptes de agafar getboundinglcent hem dagafar els mides del block svg i ferne un objecte com eel getBoundingClientRect
      return {
        "x": element.getBoundingClientRect()[corner.x] + window.pageXOffset,
        "y": element.getBoundingClientRect()[corner.y] + window.pageYOffset
      };
    });
  }

  // this seems good to have
  function hypotenuse(a, b) {
    return Math.sqrt( Math.pow(a,2) + Math.pow(b,2) );
  }

  return render;

}